import {Component, EventEmitter} from 'angular2/core';
import {PlotComponent} from './plot.component';
import {RouterLink} from 'angular2/router';
import {Game} from '../pieces/game/Game';
import {AvailableAction} from '../pieces/game/actions/AvailableAction';

@Component({
    selector: 'region-board',
    template: `
    <div class="board-background">
    <div class="nav circle navhelp" [routerLink]="['Help']">?</div>
        <div class="region">
            <div class="row" *ngFor="#row of game.region.plots; #i=index" id="{{i}}">
                <plot *ngFor="#plot of row" [game]="game" [plot]='plot'
                    (runaction)="action($event)"
                ></plot>
            </div>
        </div>
    </div>
    `,
    directives: [PlotComponent, RouterLink],
    inputs: ['game'],
    outputs: ['runaction']
})
export class RegionBoardComponent {
    public game:Game;

    public runaction:EventEmitter<AvailableAction> = new EventEmitter();

    public action($event:CustomEvent):void {
        this.runaction.emit($event.detail);
    }
}