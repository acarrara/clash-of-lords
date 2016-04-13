import {Component} from 'angular2/core';
import {NextTurnComponent} from './next-turn.component';
import {ConsoleComponent} from './console.component';
import {DomainComponent} from './domain.component';
import {RankingComponent} from './ranking.component';
import {Game} from '../pieces/game/Game';

@Component({
    selector: 'dashboard',
    template: `
        <div class="dashboard" >
            <domain [domain]="game.displayed"></domain>
            <div class="console">
                <next-turn></next-turn>
                <console class="messages"></console>
             </div>
            <ranking [game]="game"></ranking>
        </div>
    `,
    directives: [NextTurnComponent, ConsoleComponent, DomainComponent, RankingComponent],
    inputs: ['game']
})
export class DashboardComponent {
    public game:Game;
}