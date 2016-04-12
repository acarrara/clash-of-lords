import {ActionPoints} from '../ActionPoints';
import {Objects} from '../../commons/Objects';
import {Plot} from '../../world/Plot';

export class ActionCost {

    private _coefficient:number;

    constructor(coefficient:number) {
        this._coefficient = coefficient;
    }

    public evaluate(settling:Plot):ActionPoints {
        if (Objects.isNotDefined(settling)) {
            return new ActionPoints(0);
        }
        var fortificationCoefficient:number = Objects.toNumber(settling.fortified);
        var cost:number = settling.kind.worth * this._coefficient * ++fortificationCoefficient;
        cost = Math.round(cost);
        return new ActionPoints(cost);
    }

    public get coefficient():number {
        return this._coefficient;
    }
}