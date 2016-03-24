import {Lord} from './Lord';
import {FarmAction} from './actions/FarmAction';
import {ActionPoints} from './ActionPoints';

export class GameDirector {

    private static STARTING_AP:number = 5;

    private _lords:Lord[];
    private _current:number;

    constructor() {
        this._current = 0;
    }

    public register(lords:Lord[]):void {
        this._lords = lords;
    }

    public nextTurn():Lord {
        var turnerLord:Lord = this._lords[this._current];
        var startingPoints:ActionPoints = new ActionPoints(GameDirector.STARTING_AP);
        turnerLord.actionPoints = new FarmAction(turnerLord.domain).run(startingPoints);
        this._current = (this._current + 1) % this._lords.length;
        return turnerLord;
    }

}