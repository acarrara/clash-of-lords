import {ActionFactory} from './ActionFactory';
import {AvailableAction} from './AvailableAction';

describe('ActionFactory', () => {

    let actionFactory:ActionFactory;

    beforeEach(() => {
        actionFactory = new ActionFactory();
    });

    it('should throw error if action is unrecognized', () => {
        expect(() => actionFactory.createAction(
            AvailableAction.NOTHING,
            null,
            null,
            null,
            null
        )).toThrowError('Unrecognized action: Nothing');
    });

});