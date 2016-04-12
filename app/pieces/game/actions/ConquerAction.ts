import {Politics} from '../Politics';
import {ActionPoints} from '../ActionPoints';
import {Plot} from '../../world/Plot';
import {Lord} from '../Lord';
import {SettleAction} from './SettleAction';
import {ActionCost} from './ActionCost';
import {AvailableAction} from './AvailableAction';

export class ConquerAction extends SettleAction {

    constructor(settler:Lord, settling:Plot, politics:Politics) {
        super(new ActionCost(AvailableAction.CONQUER.costCoefficient), settler, settling, politics);
    }

    public run(actionPoints:ActionPoints):ActionPoints {
        var remnant:ActionPoints = this.evaluateCost(actionPoints);
        this.checkDebt(remnant, actionPoints);
        this.updateConqueredDomain();
        this.updateSettlerDomain();
        this.updatePolitics();
        return remnant;
    }

    public getActionResult():string {
        return 'Conquered plot';
    }

    private updateConqueredDomain():void {
        var conquered:Lord = this.politics.lordAt(this.settling.coordinates);
        conquered.lose(this.settling);
    };

}