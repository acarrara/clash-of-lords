import {Action} from './Action';
import {ActionPoints} from '../ActionPoints';
import {Plot} from '../../world/Plot';

export class FarmAction implements Action<ActionPoints> {

    public costCoefficient:number;
    private _domain:Plot[];

    constructor(domain:Plot[]) {
        this._domain = domain;
        this.costCoefficient = 0.1;
    }

    public run(actionPoints:ActionPoints):ActionPoints {
        var turnAmount:number = 0;
        for (let i:number = 0; i < this._domain.length; i++) {
            turnAmount += this._domain[i].kind.worth * this.costCoefficient;
        }
        return actionPoints.add(new ActionPoints(Math.floor(Math.round(turnAmount * 100) / 100)));
    }

}