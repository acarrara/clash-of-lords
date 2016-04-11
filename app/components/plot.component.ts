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
    (contextmenu)="build($event)"
    [limes]="plot"></div>
    `,
    host: {
        '(mouseenter)': 'changeAvailableAction(); changePlot()'
    },
    inputs: ['plot'],
    directives: [LimesDirective]
})
export class PlotComponent {
    public plot:Plot;
    public availableAction:string;

    constructor(private _gameService:GameService) {
    }

    public changePlot():void {
        this._gameService.changePlot(this.plot);
    }

    public changeAvailableAction():void {
        this.availableAction = this._gameService.changeAvailableAction(this.plot.coordinates);
    }

    public action():void {
        this._gameService.run();
    }

    public build($event:Event):void {
        $event.preventDefault();
        this._gameService.build();
    }

}
