import {Component} from 'angular2/core';
import {Plot} from '../pieces/world/Plot';
import {LimesDirective} from '../attribute-directives/limes.directive';

@Component({
    selector: 'plot',
    template: `
    <div
    id="{{plot.coordinates.x}}_{{plot.coordinates.y}}"
    [limes]="plot"></div>
    `,
    inputs: ['plot'],
    directives: [LimesDirective]
})
export class PlotComponent {
    public plot:Plot;
}
