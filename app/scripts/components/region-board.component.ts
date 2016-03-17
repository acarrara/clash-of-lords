import {Component} from 'angular2/core';
import {Region} from "../world/Region";
import {PlotComponent} from "./plot.component";

@Component({
    selector: 'region-board',
    template: `
    <div class="container">
        <div class="row" *ngFor="#row of region.plots; #i=index" id="{{i}}">
            <plot *ngFor="#plot of row" [plot]='plot'></plot>
        </div>
    </div>
    `,
    directives: [PlotComponent],
    inputs: ['region']
})
export class RegionBoardComponent {

}