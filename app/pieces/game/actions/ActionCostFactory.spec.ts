import {ActionCostFactory} from './ActionCostFactory';
import {ActionCost} from './ActionCost';

describe('ActionCostFactory', () => {

    let actionCostFactory:ActionCostFactory;

    beforeEach(() => {
        actionCostFactory = new ActionCostFactory();
    });

    it('should return empty action cost if action is undefined', () => {
        expect(actionCostFactory.createActionCost(undefined)).toEqual(new ActionCost(0));
    });

});