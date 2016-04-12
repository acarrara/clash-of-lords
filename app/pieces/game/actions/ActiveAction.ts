import {Action} from './Action';
import {ActionPoints} from '../ActionPoints';
import {Lord} from '../Lord';
import {Plot} from '../../world/Plot';
import {ActionCost} from './ActionCost';
import {MessageLevel} from '../message/MessageLevel';
import {Message} from '../message/Message';

export abstract class ActiveAction implements Action<ActionPoints> {

    public actionCost:ActionCost;
    public settler:Lord;
    public settling:Plot;

    constructor(actionCost:ActionCost, settler:Lord, settling:Plot) {
        this.actionCost = actionCost;
        this.settler = settler;
        this.settling = settling;
    }

    public abstract run(cost:ActionPoints):ActionPoints;

    public getMessage():Message {
        return new Message(this.getActionResult() + ' at (' + this.settling.coordinates.x + ',' + this.settling.coordinates.y + ')', MessageLevel.INFO);
    }

    public abstract getActionResult():string;

    public dryRun():ActionPoints {
        return this.actionCost.evaluate(this.settling);
    }

    public evaluateCost(actionPoints:ActionPoints):ActionPoints {
        let cost:ActionPoints = this.actionCost.evaluate(this.settling);
        return actionPoints.subtract(cost);
    }

    public checkDebt(remnant:ActionPoints, actionPoints:ActionPoints):void {
        if (remnant.isDebt()) {
            throw new Error('Unsufficient Action Points: ' + actionPoints.amount);
        }
    }
}