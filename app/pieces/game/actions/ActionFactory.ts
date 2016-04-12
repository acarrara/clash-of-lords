import {AvailableAction} from './AvailableAction';
import {ColonizeAction} from './ColonizeAction';
import {ConquerAction} from './ConquerAction';
import {FortifyAction} from './FortifyAction';
import {ActiveAction} from './ActiveAction';
import {BuildAction} from './BuildAction';
import {Game} from '../Game';

export class ActionFactory {

    public createAction(game:Game):ActiveAction {
        switch (game.availableAction) {
            case AvailableAction.CONQUER:
            {
                return new ConquerAction(game.lord, game.plot, game.politics);
            }
            case AvailableAction.COLONIZE:
            {
                return new ColonizeAction(game.lord, game.plot, game.politics);
            }
            case AvailableAction.FORTIFY:
            {
                return new FortifyAction(game.lord, game.plot);
            }
            case AvailableAction.BUILD:
            {
                return new BuildAction(game.lord, game.plot, game.region);
            }
            default:
                throw new Error('Unrecognized action: ' + game.availableAction.name);
        }
    }
}