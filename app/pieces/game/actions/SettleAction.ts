import {Action} from './Action';
import {ActionPoints} from '../ActionPoints';
import {Politics} from '../Politics';
import {Lord} from '../Lord';
import {Plot} from '../../world/Plot';

export abstract class SettleAction implements Action {

    public costCoefficient:number;
    public politics:Politics;
    public settler:Lord;
    public settling:Plot;

    constructor(costCoefficient:number, settler:Lord, settling:Plot, politics:Politics) {
        this.costCoefficient = costCoefficient;
        this.politics = politics;
        this.settler = settler;
        this.settling = settling;
    }

    public abstract run(cost:ActionPoints):ActionPoints;

    public calculateCost(actionPoints:ActionPoints):ActionPoints {
        var cost:number = this.settling.kind.worth * this.costCoefficient;
        cost = Math.round(cost);
        var remnant:ActionPoints = actionPoints.subtract(new ActionPoints(cost));
        return remnant;
    };

    public updateSettlerDomain():void {
        this.settler.domain.push(this.settling);
    };

    public updatePolitics():void {
        this.politics.settle(this.settler, this.settling.coordinates);
    };

    public checkDebt(remnant:ActionPoints, actionPoints:ActionPoints):void {
        if (remnant.isDebt()) {
            throw new Error('Unsufficient Action Points: ' + actionPoints.amount);
        }
    };
}