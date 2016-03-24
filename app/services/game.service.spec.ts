import {beforeEachProviders, beforeEach, describe, expect, it, inject} from 'angular2/testing';
import {GameService} from './game.service';
import {RegionFactory} from '../pieces/world/RegionFactory';
import {Coordinates} from '../pieces/world/Coordinates';
import {PoliticsFactory} from '../pieces/game/PoliticsFactory';
import {Politics} from '../pieces/game/Politics';
import {Lord} from '../pieces/game/Lord';
import {Save} from '../pieces/game/Save';
import {ActionPoints} from '../pieces/game/ActionPoints';

describe('GameService', () => {

    beforeEachProviders(() => [GameService]);

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

});
