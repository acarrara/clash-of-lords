import {Component, DoCheck} from 'angular2/core';
import {GameService} from '../services/game.service';
import {Plot} from '../pieces/world/Plot';
import {Objects} from '../pieces/commons/Objects';
import {Lord} from '../pieces/game/Lord';
import {ActionPoints} from '../pieces/game/ActionPoints';

@Component({
    selector: 'scout',
    template: `
    <div class="scout">
        <div class="scout-position">({{currentPlot.coordinates.x}}, {{currentPlot.coordinates.y}})</div>
        <div class="scout-report">{{currentPlot.kind.fullName}}</div>
        <div class="scout-spy">{{settler}}</div>
        <div class="scout-advice">{{availableAction}}</div>
        <div class="scout-guess">{{guess.amount}} AP</div>
    </div>
    `
})
export class ScoutComponent implements DoCheck {

    public currentPlot:Plot;
    public availableAction:string;
    public settler:string;
    public guess:ActionPoints;

    constructor(private _gameService:GameService) {
    }

    public ngDoCheck():void {
        this.currentPlot = this._gameService.currentPlot;
        this.availableAction = this._gameService.availableAction;
        var settler:Lord = this._gameService.politics.lordAt(this.currentPlot.coordinates);
        this.settler = Objects.isDefined(settler) ? settler.name : 'Uncolonized';
        this.guess = this._gameService.dryRun();
    }

}