import {beforeEachProviders, beforeEach, describe, expect, it, inject} from 'angular2/testing';
import {GameDirector} from './game-director';
import {Lord} from './../pieces/game/Lord';
import {ActionPoints} from './../pieces/game/ActionPoints';

describe('GameDirector', () => {

    var lord0:Lord;
    var lord1:Lord;

    beforeEachProviders(() => [GameDirector]);

    beforeEach(inject([GameDirector], (director:GameDirector) => {
        lord0 = new Lord();
        lord0.name = 'Bonnie';
        lord0.domain = [];
        lord1 = new Lord();
        lord1.name = 'Clyde';
        lord1.domain = [];
        director.register([lord0, lord1]);
    }));

    describe('nextTurn()', () => {

        it('should return next lord', inject([GameDirector], (director:GameDirector) => {
            expect(director.nextTurn()).toEqual(lord0);
            expect(director.nextTurn()).toEqual(lord1);
        }));

        it('should farm for next lord', inject([GameDirector], (director:GameDirector) => {
            expect(director.nextTurn().actionPoints).toEqual(new ActionPoints(5));
        }));

        it('should convert remaining harvest in treasure', inject([GameDirector], (director:GameDirector) => {
            lord0.actionPoints = new ActionPoints(5);
            director.nextTurn();
            director.nextTurn();
            expect(lord0.treasure).toEqual(500);
        }));

        it('should restart from beginning when every lord have had a turn', inject([GameDirector], (director:GameDirector) => {
            director.nextTurn();
            director.nextTurn();
            expect(director.nextTurn()).toEqual(lord0);
        }));

    });

});