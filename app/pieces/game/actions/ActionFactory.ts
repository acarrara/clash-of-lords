import {AvailableAction} from './AvailableAction';
import {Lord} from '../Lord';
import {Plot} from '../../world/Plot';
import {Politics} from '../Politics';
import {ColonizeAction} from './ColonizeAction';
import {ConquerAction} from './ConquerAction';
import {FortifyAction} from './FortifyAction';
import {ActiveAction} from './ActiveAction';
import {BuildAction} from './BuildAction';
import {Region} from '../../world/Region';

export class ActionFactory {

    public createAction(availableAction:AvailableAction, plot:Plot, lord:Lord, politics:Politics, region:Region):ActiveAction {
        switch (availableAction) {
            case AvailableAction.CONQUER:
            {
                return new ConquerAction(lord, plot, politics);
            }
            case AvailableAction.COLONIZE:
            {
                return new ColonizeAction(lord, plot, politics);
            }
            case AvailableAction.FORTIFY:
            {
                return new FortifyAction(lord, plot);
            }
            case AvailableAction.BUILD:
            {
                return new BuildAction(lord, plot, region);
            }
            default:
                throw new Error('Unrecognized action: ' + availableAction.name);
        }
    }
}