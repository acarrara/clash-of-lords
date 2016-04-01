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
        switch (this.availableAction) {
            case 'Conquer':
            {
                this._gameService.conquer(this.plot);
                break;
            }
        }
        this._gameService.colonize(this.plot);
    }

}
