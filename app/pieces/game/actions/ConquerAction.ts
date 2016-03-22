import {Action} from './Action';
import {Politics} from '../Politics';
import {ActionPoints} from '../ActionPoints';
import {Plot} from '../../world/Plot';
import {Lord} from '../Lord';
import {Arrays} from '../../commons/Arrays';

export class ConquerAction implements Action {

    public costCoefficient:number;
    private _politics:Politics;
    private _conquering:Plot;
    private _conqueror:Lord;

    constructor(conqueror:Lord, conquering:Plot, politics:Politics) {
        this._politics = politics;
        this._conqueror = conqueror;
        this._conquering = conquering;
        this.costCoefficient = 3;
    }

    public run(actionPoints:ActionPoints):ActionPoints {
        var cost:number = this._conquering.kind.worth * this.costCoefficient;
        cost = Math.round(cost);
        var remnant:ActionPoints = actionPoints.subtract(new ActionPoints(cost));
        if (remnant.isDebt()) {
            throw new Error('Unsufficient Action Points: ' + actionPoints.amount);
        }
        this.updateConqueredDomain();
        this.updateConquerorDomain();
        this.updatePolitics();
        return remnant;
    }

    private updateConquerorDomain():void {
        this._conqueror.domain.push(this._conquering);
    };

    private updateConqueredDomain():void {
        var conquered:Lord = this._politics.lordAt(this._conquering.coordinates);
        Arrays.remove(conquered.domain, this._conquering);
    };

    private updatePolitics():void {
        this._politics.settle(this._conqueror, this._conquering.coordinates);
    };

}