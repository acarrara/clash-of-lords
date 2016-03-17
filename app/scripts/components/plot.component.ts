import {Component} from 'angular2/core';
import {Plot} from '../world/Plot';

@Component({
    selector: 'plot',
    template: `
    <div class="cell {{plot.kind.name}}"
    id="{{plot.coordinates.x}}_{{plot.coordinates.y}}"></div>
    `,
    inputs: ['plot']
})
export class PlotComponent {
    public plot:Plot;
}