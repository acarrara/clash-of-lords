import {ActionPoints} from '../ActionPoints';
import {Plot} from '../../world/Plot';
import {Lord} from '../Lord';
import {ActiveAction} from './ActiveAction';

export class FortifyAction extends ActiveAction {

    constructor(settler:Lord, settling:Plot) {
        super(1, settler, settling);

    }

    public run(actionPoints:ActionPoints):ActionPoints {
        this.checkFortified();
        let remnant:ActionPoints = this.evaluateCost(actionPoints);
        this.checkDebt(remnant, actionPoints);
        this.fortify();
        return remnant;
    }

    private checkFortified():void {
        if (this.settling.fortified) {
            throw new Error('Cannot fortify an already fortified plot');
        }
    }

    private fortify():void {
        this.settling.fortified = true;
    }
}