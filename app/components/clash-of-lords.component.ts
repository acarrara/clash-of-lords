import {Component, OnInit} from 'angular2/core';
import {RegionBoardComponent} from './region-board.component';
import {Region} from '../pieces/world/Region';
import {Lord} from '../pieces/game/Lord';
import {GameService} from '../services/game.service';
import {DashboardComponent} from './dashboard.component';
import {MessageHerald} from '../services/message.herald';
import {GameDirector} from '../services/game-director';
import {HeaderComponent} from './header.component';

@Component({
    selector: 'clash-of-lords',
    template: `
    <div class="clash-container">
        <header [lord]="activeLord()" class="clash-header lord{{activeLordIndex()}}"></header>
        <region-board class="clash-game" [region]="region"></region-board>
        <dashboard [hidden]="false" [lord]="activeLord()" [lords]="lords" class="clash-console"></dashboard>
    </div>
    `,
    directives: [RegionBoardComponent, DashboardComponent, HeaderComponent],
    providers: [GameService, MessageHerald, GameDirector]
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

    public activeLord():Lord {
        return this._gameService.activeLord;
    }

    public activeLordIndex():number {
        return this.lords.indexOf(this.activeLord());
    }

    private loadRegion():void {
        this._gameService.loadSavedGame().subscribe((region:Region):void => {
            this.region = region;
            this.lords = this._gameService.lords;
            this._gameService.startGame();
        });
    }
}