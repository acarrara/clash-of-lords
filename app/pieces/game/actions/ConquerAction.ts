import {Politics} from '../Politics';
import {ActionPoints} from '../ActionPoints';
import {Plot} from '../../world/Plot';
import {Lord} from '../Lord';
import {SettleAction} from './SettleAction';

export class ConquerAction extends SettleAction {

    constructor(settler:Lord, settling:Plot, politics:Politics) {
        super(3, settler, settling, politics);
    }

    public run(actionPoints:ActionPoints):ActionPoints {
        var remnant:ActionPoints = this.calculateCost(actionPoints);
        this.checkDebt(remnant, actionPoints);
        this.updateConqueredDomain();
        this.updateSettlerDomain();
        this.updatePolitics();
        return remnant;
    }

    private updateConqueredDomain():void {
        var conquered:Lord = this.politics.lordAt(this.settling.coordinates);
        conquered.lose(this.settling);
    };

}