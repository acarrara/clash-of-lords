import {Component, OnInit} from 'angular2/core';
import {RegionBoardComponent} from './region-board.component';
import {Region} from '../pieces/world/Region';
import {Lord} from '../pieces/game/Lord';
import {GameService} from '../services/game.service';
import {NextTurnComponent} from './next-turn.component';
import {DashboardComponent} from './dashboard.component';

@Component({
    selector: 'clash-of-lords',
    template: `
    <div>
        <region-board [region]="region"></region-board>
        <dashboard></dashboard>
    </div>
    `,
    directives: [RegionBoardComponent, NextTurnComponent, DashboardComponent],
    providers: [GameService]
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
        });
    }
}