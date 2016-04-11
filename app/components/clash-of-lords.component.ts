import {Component, OnInit} from 'angular2/core';
import {RegionBoardComponent} from './region-board.component';
import {Region} from '../pieces/world/Region';
import {Lord} from '../pieces/game/Lord';
import {GameService} from '../services/game.service';
import {DashboardComponent} from './dashboard.component';
import {HeaderComponent} from './header.component';
import {MockBackend} from '../services/mock.backend';

@Component({
    selector: 'clash-of-lords',
    template: `
    <div class="clash-container">
        <header [lord]="activeLord()" class="clash-header lord{{activeLordIndex()}}"></header>
        <region-board class="clash-game" [region]="region"></region-board>
        <dashboard [lord]="activeLord()" [lords]="lords" class="clash-console"></dashboard>
    </div>
    `,
    directives: [
        RegionBoardComponent,
        DashboardComponent,
        HeaderComponent]
})
export class ClashOfLordsComponent implements OnInit {

    public region:Region;
    public lords:Lord[];

    constructor(private _gameService:GameService, private _backend:MockBackend) {
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
        if (!this._gameService.started) {
            this._backend.loadSavedGame().subscribe((region:Region):void => {
                this.region = region;
                this.lords = this._gameService.lords;
                this._gameService.startGame();
            });
        } else {
            this.region = this._gameService.region;
            this.lords = this._gameService.lords;
        }
    }
}