import {Component} from 'angular2/core';
import {Plot} from '../pieces/world/Plot';

@Component({
    selector: 'plot',
    template: `
    <div class="plot {{plot.kind.name}}"
    id="{{plot.coordinates.x}}_{{plot.coordinates.y}}"></div>
    `,
    inputs: ['plot']
})
export class PlotComponent {
    public plot:Plot;
}