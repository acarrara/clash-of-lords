import {Plot} from '../world/Plot';
import {ActionPoints} from './ActionPoints';
import {TreasureAction} from './actions/TreasureAction';
import {Action} from './actions/Action';

export class Lord {
    public name:string;
    public domain:Plot[];
    public actionPoints:ActionPoints;
    public treasure:number;

    constructor() {
        this.treasure = 0;
    }

    public save():void {
        let save:Action<number> = new TreasureAction();
        this.treasure += save.run(this.actionPoints);
        this.actionPoints = new ActionPoints(0);
    }
}