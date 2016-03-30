import {Plot} from '../world/Plot';
import {ActionPoints} from './ActionPoints';
import {TreasureAction} from './actions/TreasureAction';
import {Action} from './actions/Action';
import {FarmAction} from './actions/FarmAction';
import {Coordinates} from '../world/Coordinates';

export class Lord {

    private static STARTING_AP:number = 5;

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

    public farm():void {
        let startingPoints:ActionPoints = new ActionPoints(Lord.STARTING_AP);
        this.actionPoints = new FarmAction(this.domain).run(startingPoints);
    }

    public plotAt(coordinates:Coordinates):Plot {
        for (let i:number = 0; i < this.domain.length; i++) {
            let current:Plot = this.domain[i];
            if (current.coordinates.x === coordinates.x &&
            current.coordinates.y === coordinates.y) {
                return current;
            }
        }
        return undefined;
    }
}