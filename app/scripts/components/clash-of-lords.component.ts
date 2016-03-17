import {Component, OnInit} from 'angular2/core';
import {RegionBoardComponent} from './region-board.component';
import {RegionFactory} from "../world/RegionFactory";
import {Region} from "../world/Region";
import {GameService} from "../services/game.service";

@Component({
    selector: 'clash-of-lords',
    template: `
    <div class="back">
        <region-board [region]="region"></region-board>
    </div>
    `,
    directives: [RegionBoardComponent],
    providers: [GameService]
})
export class ClashOfLordsComponent implements OnInit {

    private _regionFactory:RegionFactory;
    public region:Region;

    constructor(private _gameService:GameService) {
        this.region = new Region([[]]);
    }

    public ngOnInit():void {
        this.loadRegion();
    }

    private loadRegion():void {
        this._gameService.loadRegion().then((source:string) => {
            this._regionFactory = new RegionFactory();
            this.region = this._regionFactory.fromJson(source);
        });
    }
}