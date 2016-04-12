import {ActionFactory} from './ActionFactory';
import {Game} from '../Game';
import {AvailableAction} from './AvailableAction';

describe('ActionFactory', () => {

    let actionFactory:ActionFactory;
    let game:Game;

    beforeEach(() => {
        actionFactory = new ActionFactory();
        game = new Game();
        game.availableAction = AvailableAction.NOTHING;
    });

    it('should throw error if action is unrecognized', () => {
        expect(() => actionFactory.createAction(game)).toThrowError('Unrecognized action: Nothing');
    });

});