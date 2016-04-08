import {Component} from 'angular2/core';
import {PlotComponent} from './plot.component';
import {Region} from '../pieces/world/Region';
import {RouterLink} from 'angular2/router';

@Component({
    selector: 'region-board',
    template: `
    <div class="board-background">
    <div class="nav circle navhelp" [routerLink]="['Help']">?</div>
        <div class="region">
            <div class="row" *ngFor="#row of region.plots; #i=index" id="{{i}}">
                <plot *ngFor="#plot of row" [plot]='plot'></plot>
            </div>
        </div>
    </div>
    `,
    directives: [PlotComponent, RouterLink],
    inputs: ['region']
})
export class RegionBoardComponent {
    public region:Region;
}