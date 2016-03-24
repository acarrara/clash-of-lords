import {Component} from 'angular2/core';
import {Plot} from '../pieces/world/Plot';
import {LimesDirective} from '../attribute-directives/limes.directive';
import {GameService} from '../services/game.service';

@Component({
    selector: 'plot',
    template: `
    <div
    id="{{plot.coordinates.x}}_{{plot.coordinates.y}}"
    (click)="action()"
    [limes]="plot"></div>
    `,
    inputs: ['plot'],
    directives: [LimesDirective]
})
export class PlotComponent {
    public plot:Plot;

    constructor(private _gameService:GameService) {

    }

    public action():void {
        this._gameService.colonize(this.plot);
    }

}
