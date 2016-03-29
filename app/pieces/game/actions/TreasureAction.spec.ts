import {TreasureAction} from './TreasureAction';
import {ActionPoints} from '../ActionPoints';

describe('TreasureAction', () => {

    var treasureAction:TreasureAction;
    var actionPoints:ActionPoints;

    beforeEach(() => {
        treasureAction = new TreasureAction();
        actionPoints = new ActionPoints(5);
    });

    describe('run', () => {

        it('should return 500 bessy when aps are 5', () => {
            expect(treasureAction.run(actionPoints)).toEqual(500);
        });

    });

});