import {Component, DoCheck} from 'angular2/core';
import {Lord} from '../pieces/game/Lord';
import {GameService} from '../services/game.service';

@Component({
    selector: 'header',
    template: `
        <div class="header">
            <div class="header-lord">
                <div class="lord-name">{{lord.name}}</div>
                <div class="lord-ap">{{lord.actionPoints.amount}}</div>
                <div class="lord-treasure">{{lord.treasure}} $</div>
            </div>
            <div class="header-action">{{availableAction}}</div>
        </div>
    `,
    inputs: ['lord']
})
export class HeaderComponent implements DoCheck {

    public lord:Lord;
    public availableAction:string;

    constructor(private _gameService:GameService) {
    }

    public ngDoCheck():any {
        return this.availableAction = this._gameService.availableAction;

    }
}