import {Game} from './Game';
import {Coordinates} from '../world/Coordinates';
import {Lord} from './Lord';
import {Politics} from './Politics';

describe('Game', () => {

    let game:Game = new Game();
    let lord0:Lord;
    let lord1:Lord;

    describe('direction methods', () => {

        beforeEach(() => {
            lord0 = new Lord();
            lord1 = new Lord();

            var mockPolitics:Politics = new Politics();
            mockPolitics.setDimension(2);
            mockPolitics.domainMap[0][0] = lord0;

            game.lord = lord0;
            game.lords = [lord0, lord1];
            game.politics = mockPolitics;
        });

        it('should return false when is not right', () => {
            expect(game.isRight(new Coordinates(1, 0))).toEqual(false);
        });

        it('should return true when is right', () => {
            expect(game.isRight(new Coordinates(0, 0))).toEqual(true);
        });

        it('should return true when is right with another lord', () => {
            game.politics.domainMap[0][1] = lord1;
            expect(game.isRight(new Coordinates(0, 0))).toEqual(true);
        });

        it('should return false when is not left', () => {
            expect(game.isLeft(new Coordinates(1, 0))).toEqual(false);
        });

        it('should return true when is left', () => {
            expect(game.isLeft(new Coordinates(0, 0))).toEqual(true);
        });

        it('should return false when is not top', () => {
            expect(game.isTop(new Coordinates(1, 0))).toEqual(false);
        });

        it('should return true when is top', () => {
            expect(game.isTop(new Coordinates(0, 0))).toEqual(true);
        });

        it('should return false when is not bottom', () => {
            expect(game.isBottom(new Coordinates(1, 0))).toEqual(false);
        });

        it('should return true when is bottom', () => {
            expect(game.isBottom(new Coordinates(0, 0))).toEqual(true);
        });

    });

});