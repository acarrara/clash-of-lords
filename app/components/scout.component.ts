import {Component, DoCheck} from 'angular2/core';
import {Objects} from '../pieces/commons/Objects';
import {Lord} from '../pieces/game/Lord';
import {ActionPoints} from '../pieces/game/ActionPoints';
import {ActionCostFactory} from '../pieces/game/actions/ActionCostFactory';
import {Game} from '../pieces/game/Game';

@Component({
    selector: 'scout',
    template: `
    <div class="scout">
        <div class="scout-position">({{game.plot.coordinates.x}}, {{game.plot.coordinates.y}})
            <span class="tooltip tooltip-bottom">Coordinates</span>
        </div>
        <div class="scout-report">{{game.plot.kind.fullName}}
            <span class="tooltip tooltip-bottom">Terrain</span>
        </div>
        <div class="scout-spy">{{settler}}
            <span class="tooltip tooltip-bottom">Settler</span>
        </div>
        <div class="scout-advice">{{game.availableAction.name}}
            <span class="tooltip tooltip-bottom">Action</span>
        </div>
        <div class="scout-guess" [ngClass]="{unsufficient: unsufficient}">{{guess.amount}} AP
            <span class="tooltip tooltip-bottom">Predicted cost</span>
        </div>
    </div>
    `,
    inputs: ['game']
})
export class ScoutComponent implements DoCheck {

    public game:Game;
    public settler:string;
    public guess:ActionPoints;
    public unsufficient:boolean;

    private actionCostFactory:ActionCostFactory;

    constructor() {
        this.actionCostFactory = new ActionCostFactory();
    }

    public ngDoCheck():void {
        var settler:Lord = this.game.politics.lordAt(this.game.plot.coordinates);
        this.settler = Objects.isDefined(settler) ? settler.name : 'Uncolonized';
        this.guess = this.actionCostFactory.createActionCost(this.game.availableAction).evaluate(this.game.plot);
        this.unsufficient = this.game.lord.actionPoints.amount < this.guess.amount;
    }

}