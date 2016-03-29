import {Component} from 'angular2/core';
import {NextTurnComponent} from './next-turn.component';
import {ConsoleComponent} from './console.component';
import {DomainComponent} from './domain.component';
import {Lord} from '../pieces/game/Lord';
import {RankingComponent} from './ranking.component';

@Component({
    selector: 'dashboard',
    template: `
        <div class="dashboard" >
            <domain [domain]="lord.domain"></domain>
            <div class="console">
                <next-turn></next-turn>
                <console class="messages"></console>
             </div>
            <ranking [lords]="lords"></ranking>
        </div>
    `,
    directives: [NextTurnComponent, ConsoleComponent, DomainComponent, RankingComponent],
    inputs: ['lord', 'lords']
})
export class DashboardComponent {
    public lord:Lord;
    public lords:Lord[];
}