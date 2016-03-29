import {Politics} from '../Politics';
import {ActionPoints} from '../ActionPoints';
import {Plot} from '../../world/Plot';
import {Lord} from '../Lord';
import {SettleAction} from './SettleAction';
import {Objects} from '../../commons/Objects';

export class ColonizeAction extends SettleAction {

    constructor(settler:Lord, settling:Plot, politics:Politics) {
        super(1, settler, settling, politics);
    }

    public run(actionPoints:ActionPoints):ActionPoints {
        this.checkColonizable();
        var remnant:ActionPoints = this.calculateCost(actionPoints);
        this.checkDebt(remnant, actionPoints);
        this.updateSettlerDomain();
        this.updatePolitics();
        return remnant;
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