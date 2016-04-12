import {Politics} from '../Politics';
import {ActionPoints} from '../ActionPoints';
import {Plot} from '../../world/Plot';
import {Lord} from '../Lord';
import {SettleAction} from './SettleAction';
import {Objects} from '../../commons/Objects';
import {ActionCost} from './ActionCost';
import {AvailableAction} from './AvailableAction';

export class ColonizeAction extends SettleAction {

    constructor(settler:Lord, settling:Plot, politics:Politics) {
        super(new ActionCost(AvailableAction.COLONIZE.costCoefficient), settler, settling, politics);
    }

    public run(actionPoints:ActionPoints):ActionPoints {
        this.checkColonizable();
        var remnant:ActionPoints = this.evaluateCost(actionPoints);
        this.checkDebt(remnant, actionPoints);
        this.updateSettlerDomain();
        this.updatePolitics();
        return remnant;
    }

    public getActionResult():string {
        return 'Colonized plot';
    }

    private checkColonizable():void {
        if (!this.settling.kind.colonizable) {
            throw new Error('Cannot colonize a plot with kind ' + this.settling.kind.name);
        }
        if (Objects.isDefined(this.politics.lordAt(this.settling.coordinates))) {
            throw new Error('Cannot colonize a plot already settled!');
        }
    };
}