import {Component, DoCheck} from 'angular2/core';
import {GameService} from '../services/game.service';
import {Plot} from '../pieces/world/Plot';
import {Objects} from '../pieces/commons/Objects';
import {Lord} from '../pieces/game/Lord';
import {ActionPoints} from '../pieces/game/ActionPoints';
import {AvailableAction} from '../pieces/game/actions/AvailableAction';
import {ActionCostFactory} from '../pieces/game/actions/ActionCostFactory';

@Component({
    selector: 'scout',
    template: `
    <div class="scout">
        <div class="scout-position">({{currentPlot.coordinates.x}}, {{currentPlot.coordinates.y}})
            <span class="tooltip tooltip-bottom">Coordinates</span>
        </div>
        <div class="scout-report">{{currentPlot.kind.fullName}}
            <span class="tooltip tooltip-bottom">Terrain</span>
        </div>
        <div class="scout-spy">{{settler}}
            <span class="tooltip tooltip-bottom">Settler</span>
        </div>
        <div class="scout-advice">{{availableAction.name}}
            <span class="tooltip tooltip-bottom">Action</span>
        </div>
        <div class="scout-guess" [ngClass]="{unsufficient: unsufficient}">{{guess.amount}} AP
            <span class="tooltip tooltip-bottom">Predicted cost</span>
        </div>
    </div>
    `
})
export class ScoutComponent implements DoCheck {

    public currentPlot:Plot;
    public availableAction:AvailableAction;
    public settler:string;
    public guess:ActionPoints;
    public unsufficient:boolean;

    private actionCostFactory:ActionCostFactory;

    constructor(private _gameService:GameService) {
        this.actionCostFactory = new ActionCostFactory();
    }

    public ngDoCheck():void {
        this.currentPlot = this._gameService.currentPlot;
        this.availableAction = this._gameService.availableAction;
        var settler:Lord = this._gameService.politics.lordAt(this.currentPlot.coordinates);
        this.settler = Objects.isDefined(settler) ? settler.name : 'Uncolonized';
        this.guess = this.actionCostFactory.createActionCost(this.availableAction).evaluate(this.currentPlot);
        this.unsufficient = this._gameService.activeLord.actionPoints.amount < this.guess.amount;
    }

}