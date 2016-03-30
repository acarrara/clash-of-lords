import {Injectable} from 'angular2/core';
import {Lord} from './../pieces/game/Lord';
import {Objects} from '../pieces/commons/Objects';

@Injectable()
export class GameDirector {

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
        this._activeLord.farm();
    };

}