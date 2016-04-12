import {Action} from './Action';
import {ActionPoints} from '../ActionPoints';
import {Plot} from '../../world/Plot';
import {ActionCost} from './ActionCost';
import {AvailableAction} from './AvailableAction';

export class FarmAction implements Action<ActionPoints> {

    public actionCost:ActionCost;
    private _domain:Plot[];

    constructor(domain:Plot[]) {
        this._domain = domain;
        this.actionCost = new ActionCost(AvailableAction.FARM.costCoefficient);
    }

    public run(actionPoints:ActionPoints):ActionPoints {
        var turnAmount:number = 0;
        for (let i:number = 0; i < this._domain.length; i++) {
            turnAmount += this._domain[i].kind.worth * this.actionCost.coefficient;
        }
        return actionPoints.add(new ActionPoints(Math.floor(Math.round(turnAmount * 100) / 100)));
    }

}