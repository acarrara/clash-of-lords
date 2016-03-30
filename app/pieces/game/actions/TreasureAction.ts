import {Action} from './Action';
import {ActionPoints} from '../ActionPoints';

export class TreasureAction implements Action<number> {
    public costCoefficient:number;

    constructor() {
        this.costCoefficient = 10;
    }

    public run(cost:ActionPoints):number {
        return cost.amount * this.costCoefficient;
    }

}