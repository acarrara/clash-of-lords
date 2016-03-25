import {Component} from 'angular2/core';
import {GameService} from '../services/game.service';

@Component({
    selector: 'next-turn',
    template: `
    <div
    class="nextturn"
    id="nextturn"
    (click)="nextTurn()">Next Turn</div>
    `
})
export class NextTurnComponent {

    constructor(private _gameService:GameService) {
    }

    public nextTurn():void {
        this._gameService.nextTurn();
    }

}
