import {Component} from 'angular2/core';
import {NextTurnComponent} from './next-turn.component';
import {ConsoleComponent} from './console.component';
import {DomainComponent} from './domain.component';
import {Lord} from '../pieces/game/Lord';
import {RankingComponent} from './ranking.component';
import {Plot} from '../pieces/world/Plot';
import {GameService} from '../services/game.service';
import {Objects} from '../pieces/commons/Objects';

@Component({
    selector: 'dashboard',
    template: `
        <div class="dashboard" >
            <domain [domain]="domain()"></domain>
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

    constructor(private _gameService:GameService) {
    }

    public domain():Plot[] {
        return Objects.isDefined(this._gameService.displayed) ? this._gameService.displayed : this.lord.domain;
    }
}