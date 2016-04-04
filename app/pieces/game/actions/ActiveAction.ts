import {Action} from './Action';
import {ActionPoints} from '../ActionPoints';
import {Lord} from '../Lord';
import {Plot} from '../../world/Plot';
import {Objects} from '../../commons/Objects';

export abstract class ActiveAction implements Action<ActionPoints> {

    public costCoefficient:number;
    public settler:Lord;
    public settling:Plot;

    constructor(costCoefficient:number, settler:Lord, settling:Plot) {
        this.costCoefficient = costCoefficient;
        this.settler = settler;
        this.settling = settling;
    }

    public abstract run(cost:ActionPoints):ActionPoints;

    public dryRun():ActionPoints {
        return this.calculateCost();
    }

    public evaluateCost(actionPoints:ActionPoints):ActionPoints {
        let cost:ActionPoints = this.calculateCost();
        return actionPoints.subtract(cost);
    }

    public calculateCost():ActionPoints {
        var fortificationCoefficient:number = Objects.toNumber(this.settling.fortified);
        var cost:number = this.settling.kind.worth * this.costCoefficient * ++fortificationCoefficient;
        cost = Math.round(cost);
        return new ActionPoints(cost);
    }

    public checkDebt(remnant:ActionPoints, actionPoints:ActionPoints):void {
        if (remnant.isDebt()) {
            throw new Error('Unsufficient Action Points: ' + actionPoints.amount);
        }
    }
}