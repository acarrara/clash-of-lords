import {AvailableAction} from './AvailableAction';
import {ActionCost} from './ActionCost';
import {Objects} from '../../commons/Objects';

export class ActionCostFactory {

    public createActionCost(availableAction:AvailableAction):ActionCost {
        if (Objects.isNotDefined(availableAction)) {
            return new ActionCost(0);
        }
        return new ActionCost(availableAction.costCoefficient);
    }
}