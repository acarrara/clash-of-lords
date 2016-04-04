import {beforeEachProviders, beforeEach, describe, expect, it, inject} from 'angular2/testing';
import {provide} from 'angular2/core';
import {GameService} from './game.service';
import {RegionFactory} from '../pieces/world/RegionFactory';
import {Coordinates} from '../pieces/world/Coordinates';
import {PoliticsFactory} from '../pieces/game/PoliticsFactory';
import {Politics} from '../pieces/game/Politics';
import {Lord} from '../pieces/game/Lord';
import {Save} from '../pieces/game/Save';
import {ActionPoints} from '../pieces/game/ActionPoints';
import {MessageHerald} from './message.herald';
import {Message} from '../pieces/game/message/Message';
import {GameDirector} from './game-director';
import {Plot} from '../pieces/world/Plot';
import {PlotKind} from '../pieces/world/PlotKind';
import {MessageLevel} from '../pieces/game/message/MessageLevel';

describe('GameService', () => {

    beforeEachProviders(() => [
        GameService,
        GameDirector,
        provide(MessageHerald, {useValue: new MockMessageHerald()})
    ]);

    it('should have region factory set', inject([GameService], (gameService:GameService) => {
        expect(gameService.regionFactory).toEqual(new RegionFactory());
    }));

    it('should have politics factory set', inject([GameService], (gameService:GameService) => {
        expect(gameService.politicsFactory).toEqual(new PoliticsFactory());
    }));

    it('should have politics set', inject([GameService], (gameService:GameService) => {
        expect(gameService.politics).toEqual(new Politics());
    }));

    describe('isDirections()', () => {

        beforeEach(inject([GameService], (gameService:GameService) => {
            var mockPolitics:Politics = new Politics();
            mockPolitics.setDimension(2);
            mockPolitics.domainMap[0][0] = new Lord();

            gameService.politics = mockPolitics;
        }));

        it('should return false when is not right', inject([GameService], (gameService:GameService) => {
            expect(gameService.isRight(new Coordinates(1, 0))).toEqual(false);
        }));

        it('should return true when is right', inject([GameService], (gameService:GameService) => {
            expect(gameService.isRight(new Coordinates(0, 0))).toEqual(true);
        }));

        it('should return true when is right with another lord', inject([GameService], (gameService:GameService) => {
            gameService.politics.domainMap[0][1] = new Lord();
            expect(gameService.isRight(new Coordinates(0, 0))).toEqual(true);
        }));

        it('should return false when is not left', inject([GameService], (gameService:GameService) => {
            expect(gameService.isLeft(new Coordinates(1, 0))).toEqual(false);
        }));

        it('should return true when is left', inject([GameService], (gameService:GameService) => {
            expect(gameService.isLeft(new Coordinates(0, 0))).toEqual(true);
        }));

        it('should return false when is not top', inject([GameService], (gameService:GameService) => {
            expect(gameService.isTop(new Coordinates(1, 0))).toEqual(false);
        }));

        it('should return true when is top', inject([GameService], (gameService:GameService) => {
            expect(gameService.isTop(new Coordinates(0, 0))).toEqual(true);
        }));

        it('should return false when is not bottom', inject([GameService], (gameService:GameService) => {
            expect(gameService.isBottom(new Coordinates(1, 0))).toEqual(false);
        }));

        it('should return true when is bottom', inject([GameService], (gameService:GameService) => {
            expect(gameService.isBottom(new Coordinates(0, 0))).toEqual(true);
        }));
    });

    describe('createLords', () => {

        it('should set lords from source', inject([GameService], (gameService:GameService) => {
            var save:Save = new Save();
            save.lords = [];
            gameService.createLords(save);
            expect(gameService.lords).toEqual([]);
        }));

    });

    describe('nextTurn', () => {

        var lord0:Lord;

        beforeEach(inject([GameService], (gameService:GameService) => {
            lord0 = new Lord();
            lord0.domain = [];
            gameService.lords = [lord0];
            gameService.startGame();
        }));

        it('should set as active lord the first in list', inject([GameService], (gameService:GameService) => {
            gameService.nextTurn();
            expect(gameService.activeLord).toEqual(lord0);
        }));

        it('should set action points in active lord', inject([GameService], (gameService:GameService) => {
            gameService.nextTurn();
            expect(gameService.activeLord.actionPoints).toEqual(new ActionPoints(5));
        }));

    });

    describe('changePlot', () => {

        it('should set current plot to argument', inject([GameService], (gameService:GameService) => {
            let next:Plot = new Plot(null, null);
            gameService.changePlot(next);
            expect(gameService.currentPlot).toBe(next);
        }));

    });

    describe('changeAvailableAction', () => {

        var coordinates:Coordinates;

        beforeEach(inject([GameService], (gameService:GameService) => {
            coordinates = new Coordinates(1, 1);
            spyOn(gameService.politics, 'availableAction').and.returnValue('pippo');
        }));

        it('should return "pippo"', inject([GameService], (gameService:GameService) => {
            expect(gameService.changeAvailableAction(coordinates)).toEqual('pippo');
        }));

        it('should use activeLord', inject([GameService], (gameService:GameService) => {
            gameService.changeAvailableAction(coordinates);
            expect(gameService.politics.availableAction).toHaveBeenCalledWith(gameService.activeLord, coordinates);
        }));

        it('should set field availableAction', inject([GameService], (gameService:GameService) => {
            gameService.changeAvailableAction(coordinates);
            expect(gameService.availableAction).toEqual('pippo');
        }));

    });

    describe('run', () => {

        let lord:Lord;
        let plot01:Plot;
        let plot10:Plot;
        let plot12:Plot;

        beforeEach(inject([GameService, MessageHerald], (gameService:GameService, messageHerald:MessageHerald) => {
            let castlePlot:Plot = new Plot(PlotKind.CASTLE, new Coordinates(1, 1));
            plot01 = new Plot(PlotKind.PLAIN, new Coordinates(0, 1));
            plot10 = new Plot(PlotKind.PLAIN, new Coordinates(1, 0));
            plot12 = new Plot(PlotKind.PLAIN, new Coordinates(1, 2));

            lord = new Lord();
            lord.actionPoints = new ActionPoints(5);
            lord.domain = [castlePlot, plot12];

            let enemy:Lord = new Lord();
            enemy.domain = [plot01];

            gameService.politics = new Politics();
            gameService.politics.setDimension(3);
            gameService.politics.domainMap[1][1] = lord;
            gameService.politics.domainMap[0][1] = enemy;
            gameService.politics.domainMap[1][2] = lord;
            gameService.lords = [lord];
            gameService.activeLord = lord;

            spyOn(messageHerald, 'assert');
        }));

        describe('colonize', () => {

            beforeEach(inject([GameService], (gameService:GameService) => {
                gameService.availableAction = 'Colonize';
                gameService.currentPlot = plot10;
            }));

            it('should pay with colonizer money', inject(
                [GameService],
                (gameService:GameService) => {
                    gameService.run();
                    expect(lord.actionPoints).toEqual(new ActionPoints(4));
                }));

            it('should print message', inject(
                [GameService, MessageHerald],
                (gameService:GameService, messageHerald:MessageHerald) => {
                    gameService.run();
                    expect(messageHerald.assert).toHaveBeenCalledWith(new Message('Colonized plot at (1,0)', MessageLevel.INFO));
                }));

            it('should print error message', inject(
                [GameService, MessageHerald],
                (gameService:GameService, messageHerald:MessageHerald) => {
                    lord.domain = [];
                    gameService.run();
                    expect(messageHerald.assert).toHaveBeenCalledWith(new Message('Plot must be reachable from a castle!', MessageLevel.WARN));
                }));

        });

        describe('conquer', () => {

            beforeEach(inject([GameService], (gameService:GameService) => {
                gameService.availableAction = 'Conquer';
                gameService.currentPlot = plot01;
            }));

            it('should pay with conqueror money', inject(
                [GameService],
                (gameService:GameService) => {
                    gameService.run();
                    expect(lord.actionPoints).toEqual(new ActionPoints(2));
                }));

            it('should print message', inject(
                [GameService, MessageHerald],
                (gameService:GameService, messageHerald:MessageHerald) => {
                    gameService.run();
                    expect(messageHerald.assert).toHaveBeenCalledWith(new Message('Conquered plot at (0,1)', MessageLevel.INFO));
                }));

            it('should print error message', inject(
                [GameService, MessageHerald],
                (gameService:GameService, messageHerald:MessageHerald) => {
                    lord.domain = [];
                    gameService.run();
                    expect(messageHerald.assert).toHaveBeenCalledWith(new Message('Plot must be reachable from a castle!', MessageLevel.WARN));
                }));

        });

        describe('fortify', () => {

            beforeEach(inject([GameService], (gameService:GameService) => {
                gameService.availableAction = 'Fortify';
                gameService.currentPlot = plot12;
            }));

            it('should pay with fortifier money', inject(
                [GameService],
                (gameService:GameService) => {
                    gameService.run();
                    expect(lord.actionPoints).toEqual(new ActionPoints(4));
                }));

            it('should print message', inject(
                [GameService, MessageHerald],
                (gameService:GameService, messageHerald:MessageHerald) => {
                    gameService.run();
                    expect(messageHerald.assert).toHaveBeenCalledWith(new Message('Fortified plot at (1,2)', MessageLevel.INFO));
                }));

            it('should print error message', inject(
                [GameService, MessageHerald],
                (gameService:GameService, messageHerald:MessageHerald) => {
                    plot12.fortified = true;
                    gameService.run();
                    expect(messageHerald.assert).toHaveBeenCalledWith(new Message('Cannot fortify an already fortified plot', MessageLevel.WARN));
                }));

        });

    });

    describe('dryRun', () => {

        let lord:Lord;
        let plot01:Plot;
        let plot10:Plot;
        let plot12:Plot;

        beforeEach(inject([GameService], (gameService:GameService) => {
            let castlePlot:Plot = new Plot(PlotKind.CASTLE, new Coordinates(1, 1));
            plot01 = new Plot(PlotKind.PLAIN, new Coordinates(0, 1));
            plot10 = new Plot(PlotKind.PLAIN, new Coordinates(1, 0));
            plot12 = new Plot(PlotKind.PLAIN, new Coordinates(1, 2));

            lord = new Lord();
            lord.actionPoints = new ActionPoints(5);
            lord.domain = [castlePlot, plot12];

            let enemy:Lord = new Lord();
            enemy.domain = [plot01];

            gameService.politics = new Politics();
            gameService.politics.setDimension(3);
            gameService.politics.domainMap[1][1] = lord;
            gameService.politics.domainMap[0][1] = enemy;
            gameService.politics.domainMap[1][2] = lord;
            gameService.lords = [lord];
            gameService.activeLord = lord;
        }));

        it('should return 0 when no action is selected', inject([GameService], (gameService:GameService) => {
            gameService.availableAction = '';
            expect(gameService.dryRun()).toEqual(new ActionPoints(0));
        }));

        describe('colonize', () => {

            beforeEach(inject([GameService], (gameService:GameService) => {
                gameService.availableAction = 'Colonize';
                gameService.currentPlot = plot10;
            }));

            it('should return 4', inject([GameService], (gameService:GameService) => {
                expect(gameService.dryRun()).toEqual(new ActionPoints(1));
            }));

        });

        describe('conquer', () => {

            beforeEach(inject([GameService], (gameService:GameService) => {
                gameService.availableAction = 'Conquer';
                gameService.currentPlot = plot01;
            }));

            it('should return 2', inject([GameService], (gameService:GameService) => {
                expect(gameService.dryRun()).toEqual(new ActionPoints(3));
            }));

        });

        describe('fortify', () => {

            beforeEach(inject([GameService], (gameService:GameService) => {
                gameService.availableAction = 'Fortify';
                gameService.currentPlot = plot12;
            }));

            it('return 4', inject([GameService], (gameService:GameService) => {
                expect(gameService.dryRun()).toEqual(new ActionPoints(1));
            }));

        });

    });

});

class MockMessageHerald {
    public assert(message:Message):void {
        // do nothing
    }
}