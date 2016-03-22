import {Action} from './Action';
import {Politics} from '../Politics';
import {ActionPoints} from '../ActionPoints';
import {Plot} from '../../world/Plot';
import {Lord} from '../Lord';

export class ColonizeAction implements Action {

    public costCoefficient:number;
    private _politics:Politics;
    private _colonizing:Plot;
    private _colonizer:Lord;

    constructor(colonizer:Lord, colonizing:Plot, politics:Politics) {
        this._politics = politics;
        this._colonizer = colonizer;
        this._colonizing = colonizing;
        this.costCoefficient = 1;
    }

    public run(actionPoints:ActionPoints):ActionPoints {
        if (!this._colonizing.kind.colonizable) {
            throw new Error('Cannot colonize a plot with kind ' + this._colonizing.kind.name);
        }
        var cost:number = this._colonizing.kind.worth * this.costCoefficient;
        cost = Math.round(cost);
        var remnant:ActionPoints = actionPoints.subtract(new ActionPoints(cost));
        if (remnant.isDebt()) {
            throw new Error('Unsufficient Action Points: ' + actionPoints.amount);
        }
        this.updatePolitics();
        this.updateColonizerDomain();
        return remnant;
    }

    private updateColonizerDomain():void {
        this._colonizer.domain.push(this._colonizing);
    };

    private updatePolitics():void {
        this._politics.settle(this._colonizer, this._colonizing.coordinates);
    };

}