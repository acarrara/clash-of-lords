import {Plot} from '../world/Plot';
import {ActionPoints} from './ActionPoints';
import {TreasureAction} from './actions/TreasureAction';
import {Action} from './actions/Action';
import {FarmAction} from './actions/FarmAction';
import {Coordinates} from '../world/Coordinates';
import {Arrays} from '../commons/Arrays';

export class Lord {

    private static STARTING_AP:number = 5;
    private static STARTING_POINTS:ActionPoints = new ActionPoints(Lord.STARTING_AP);

    public name:string;
    public domain:Plot[];
    public actionPoints:ActionPoints;
    public potential:ActionPoints;
    public treasure:number;

    constructor() {
        this.treasure = 0;
        this.potential = Lord.STARTING_POINTS;
    }

    public save():void {
        let save:Action<number> = new TreasureAction();
        this.treasure += save.run(this.actionPoints);
        this.actionPoints = new ActionPoints(0);
    }

    public gain(plot:Plot):void {
        this.domain.push(plot);
        this.updatePotential();
    }

    public lose(plot:Plot):void {
        Arrays.remove(this.domain, plot);
        this.updatePotential();
    }

    public updatePotential():void {
        this.potential = new FarmAction(this.domain).run(Lord.STARTING_POINTS);
    }

    public farm():void {
        this.actionPoints = new FarmAction(this.domain).run(Lord.STARTING_POINTS);
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