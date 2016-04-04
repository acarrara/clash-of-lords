import {Politics} from '../Politics';
import {Lord} from '../Lord';
import {Plot} from '../../world/Plot';
import {ActiveAction} from './ActiveAction';

export abstract class SettleAction extends ActiveAction {

    public politics:Politics;

    constructor(costCoefficient:number, settler:Lord, settling:Plot, politics:Politics) {
        super(costCoefficient, settler, settling);
        this.politics = politics;
    }

    public updateSettlerDomain():void {
        this.settler.gain(this.settling);
    }

    public updatePolitics():void {
        if (this.settling.kind.colonizable) {
            this.politics.settle(this.settler, this.settling.coordinates);
        }
        this.settling.fortified = false;
    }

}