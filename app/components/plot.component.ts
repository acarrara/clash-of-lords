import {Component, EventEmitter} from 'angular2/core';
import {Plot} from '../pieces/world/Plot';
import {LimesDirective} from '../attribute-directives/limes.directive';
import {Game} from '../pieces/game/Game';
import {AvailableAction} from '../pieces/game/actions/AvailableAction';

@Component({
    selector: 'plot',
    template: `
    <div
    id="{{plot.coordinates.x}}_{{plot.coordinates.y}}"
    (click)="action(availableAction)"
    (contextmenu)="build($event)"
    [limes]="plot" [game]="game"></div>
    `,
    host: {
        '(mouseenter)': 'changeAvailableAction(); changePlot()'
    },
    inputs: ['plot', 'game'],
    outputs: ['runaction'],
    directives: [LimesDirective]
})
export class PlotComponent {
    public plot:Plot;
    public game:Game;

    public runaction:EventEmitter<AvailableAction> = new EventEmitter();

    private availableAction:AvailableAction;

    public changePlot():void {
        this.game.plot = this.plot;
    }

    public changeAvailableAction():void {
        this.game.availableAction = this.game.politics.availableAction(this.game.lord, this.plot.coordinates);
        this.availableAction = this.game.availableAction;
    }

    public action(availableAction:AvailableAction):void {
        this.runaction.emit(availableAction);
    }

    public build($event:Event):void {
        $event.preventDefault();
        this.action(AvailableAction.BUILD);
    }

}
