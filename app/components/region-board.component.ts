import {Component} from 'angular2/core';
import {PlotComponent} from './plot.component';
import {Region} from '../pieces/world/Region';

@Component({
    selector: 'region-board',
    template: `
    <div class="board-background">
        <div class="region">
            <div class="row" *ngFor="#row of region.plots; #i=index" id="{{i}}">
                <plot *ngFor="#plot of row" [plot]='plot'></plot>
            </div>
        </div>
    </div>
    `,
    directives: [PlotComponent],
    inputs: ['region']
})
export class RegionBoardComponent {
    public region:Region;
}