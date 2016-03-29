import {Injectable} from 'angular2/core';
import {Lord} from './../pieces/game/Lord';
import {FarmAction} from './../pieces/game/actions/FarmAction';
import {ActionPoints} from './../pieces/game/ActionPoints';
import {Objects} from '../pieces/commons/Objects';

@Injectable()
export class GameDirector {

    private static STARTING_AP:number = 5;

    private _lords:Lord[];
    private _current:number;
    private _activeLord:Lord;

    constructor() {
        this._current = 0;
    }

    public register(lords:Lord[]):void {
        this._lords = lords;
    }

    public nextTurn():Lord {
        if (Objects.isDefined(this._activeLord)) {
            this.endTurnActions();
        }
        this._activeLord = this._lords[this._current];
        this._current = (this._current + 1) % this._lords.length;
        this.startTurnActions();
        return this._activeLord;
    }

    private endTurnActions():void {
        this._activeLord.save();
    }

    private startTurnActions():void {
        var startingPoints:ActionPoints = new ActionPoints(GameDirector.STARTING_AP);
        this._activeLord.actionPoints = new FarmAction(this._activeLord.domain).run(startingPoints);
    };

}