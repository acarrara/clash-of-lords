import {Component} from 'angular2/core';
import {ScoutComponent} from './scout.component';
import {TreasuryComponent} from './treasury.component';
import {Game} from '../pieces/game/Game';

@Component({
    selector: 'header',
    template: `
        <div class='header'>
            <treasury [lord]='game.lord'></treasury>
            <scout [game]="game"></scout>
        </div>
    `,
    inputs: ['game'],
    directives: [ScoutComponent, TreasuryComponent]
})
export class HeaderComponent {
    public game:Game;
}