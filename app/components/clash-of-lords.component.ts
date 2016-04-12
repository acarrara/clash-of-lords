import {Component, OnInit} from 'angular2/core';
import {RegionBoardComponent} from './region-board.component';
import {Region} from '../pieces/world/Region';
import {GameService} from '../services/game.service';
import {DashboardComponent} from './dashboard.component';
import {HeaderComponent} from './header.component';
import {MockBackend} from '../services/mock.backend';
import {Game} from '../pieces/game/Game';

@Component({
    selector: 'clash-of-lords',
    template: `
    <div class="clash-container">
        <header [game]="game" class="clash-header lord{{game.lordIndex}}"></header>
        <region-board class="clash-game" [region]="game.region"></region-board>
        <dashboard [lord]="game.lord" [lords]="game.lords" class="clash-console"></dashboard>
    </div>
    `,
    directives: [
        RegionBoardComponent,
        DashboardComponent,
        HeaderComponent]
})
export class ClashOfLordsComponent implements OnInit {

    public game:Game;

    constructor(private _gameService:GameService, private _backend:MockBackend) {
        this.game = new Game();
        this.game.region = new Region([[]]);
    }

    public ngOnInit():void {
        this.loadRegion();
    }

    private loadRegion():void {
        if (!this._gameService.started) {
            this._backend.loadSavedGame().subscribe((region:Region):void => {
                this._gameService.startGame();
                this.game = this._gameService.game;
            });
        } else {
            this.game = this._gameService.game;
        }
    }
}