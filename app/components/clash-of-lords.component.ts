import {Component, OnInit} from 'angular2/core';
import {RegionBoardComponent} from './region-board.component';
import {Region} from '../pieces/world/Region';
import {Lord} from '../pieces/game/Lord';
import {GameService} from '../services/game.service';
import {DashboardComponent} from './dashboard.component';
import {MessageHerald} from '../services/message.herald';

@Component({
    selector: 'clash-of-lords',
    template: `
    <div class="clash-container">
        <region-board class="clash-game" [region]="region"></region-board>
        <dashboard [hidden]="true" class="clash-console"></dashboard>
    </div>
    `,
    directives: [RegionBoardComponent, DashboardComponent],
    providers: [GameService, MessageHerald]
})
export class ClashOfLordsComponent implements OnInit {

    public region:Region;
    public lords:Lord[];

    constructor(private _gameService:GameService) {
        this.region = new Region([[]]);
    }

    public ngOnInit():void {
        this.loadRegion();
    }

    private loadRegion():void {
        this._gameService.loadSavedGame().subscribe((region:Region):void => {
            this.region = region;
            this.lords = this._gameService.lords;
            this._gameService.startGame();
        });
    }
}