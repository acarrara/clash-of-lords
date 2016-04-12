import {Action} from './Action';
import {ActionPoints} from '../ActionPoints';
import {ActionCost} from './ActionCost';

export class TreasureAction implements Action<number> {
    public actionCost:ActionCost;

    constructor() {
        this.actionCost = new ActionCost(10);
    }

    public run(cost:ActionPoints):number {
        return cost.amount * this.actionCost.coefficient;
    }

}