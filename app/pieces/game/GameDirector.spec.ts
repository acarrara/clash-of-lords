import {GameDirector} from './GameDirector';
import {Lord} from './Lord';
import {ActionPoints} from './ActionPoints';

describe('GameDirector', () => {

    var gameDirector:GameDirector;

    var lord0:Lord = {
        name: 'Bonnie',
        domain: [],
        actionPoints: null
    };
    var lord1:Lord = {
        name: 'Clyde',
        domain: [],
        actionPoints: null
    };

    beforeEach(() => {
        gameDirector = new GameDirector();
        gameDirector.register([lord0, lord1]);
    });

    describe('nextTurn()', () => {

        it('should return next lord', () => {
            expect(gameDirector.nextTurn()).toEqual(lord0);
            expect(gameDirector.nextTurn()).toEqual(lord1);
        });

        it('should farm for next lord', () => {
            expect(gameDirector.nextTurn().actionPoints).toEqual(new ActionPoints(5));
        });

        it('should restart from beginning when every lord have had a turn', () => {
            gameDirector.nextTurn();
            gameDirector.nextTurn();
            expect(gameDirector.nextTurn()).toEqual(lord0);
        });

    });

});