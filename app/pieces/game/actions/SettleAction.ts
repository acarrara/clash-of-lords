import {Politics} from '../Politics';
import {Lord} from '../Lord';
import {Plot} from '../../world/Plot';
import {ActiveAction} from './ActiveAction';
import {ActionCost} from './ActionCost';

export abstract class SettleAction extends ActiveAction {

    public politics:Politics;

    constructor(actionCost:ActionCost, settler:Lord, settling:Plot, politics:Politics) {
        super(actionCost, settler, settling);
        this.politics = politics;
    }

    public updateSettlerDomain():void {
        this.settler.gain(this.settling);
    }

    public updatePolitics():void {
        this.politics.settle(this.settler, this.settling.coordinates);
        this.settling.fortified = false;
    }

}