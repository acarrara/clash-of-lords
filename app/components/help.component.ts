import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {Lord} from '../pieces/game/Lord';
import {ActionPoints} from '../pieces/game/ActionPoints';
import {TreasuryComponent} from './treasury.component';
import {ScoutComponent} from './scout.component';
import {Game} from '../pieces/game/Game';
import {Region} from '../pieces/world/Region';
import {Plot} from '../pieces/world/Plot';
import {PlotKind} from '../pieces/world/PlotKind';
import {Politics} from '../pieces/game/Politics';
import {PoliticsFactory} from '../pieces/game/PoliticsFactory';
import {AvailableAction} from '../pieces/game/actions/AvailableAction';
import {Coordinates} from '../pieces/world/Coordinates';

@Component({
    selector: `help`,
    template: `
        <div class="help-container">
            <div class="help-text">
                <section>
                    <h2>Clash of Lords - Help</h2>
                    <div>Clash of Lords is a turn-based game simulating a clash of civilizations.<br/><br/>
                        There can be n players, called <b>Lords</b>.<br/>
                        Every Lord starts with 1 castle on a region.<br/>
                        The <b>region</b> is a m x m matrix, where every cell (<b>plot</b>) represents a different type of terrain.<br/>
                        Available terrains are <b>plain</b>, <b>water</b>, <b>forest</b>, <b>mountain</b>.<br/>
                        <b>Castles</b> could be built only on a plain.<br/><br/>
        
                        Every Lord is given a certain amount of <b>Action Points</b> (AP) on every turn to expand its domains.<br/>
                        A domain is a set of adjacent plots containing at least one castle.<br/>
                        Every Lord has x action points per turn, but they grow through farming during the game.<br/>
                        Action points are spent to run <b>actions</b>.<br/><br/>
        
                        Available actions are <b>colonize</b>, <b>conquer</b>, <b>build</b>, and <b>fortify</b>.<br/>
                        Actions can be run only on the plots (or adiacent ones) of a Lord's domain.<br/>
                        Action points are given at the beginning of a turn.</div>
                </section>
                <div class="help-example-container">
                    <treasury [lord]="game.lord"></treasury>
                </div>
                <div class="help-example-container">
                    <scout [game]="game"></scout>
                </div>
            </div>
            <div class="nav navcol" [routerLink]="['ClashOfLords']">Back to game</div>
        </div>
    `,
    directives: [
        TreasuryComponent,
        RouterLink,
        ScoutComponent
    ]
})
export class HelpComponent {

    public game:Game;

    constructor() {
        this.game = new Game();
        this.game.region = this.buildRegion();
        this.game.lords = [this.createLord()];
        this.game.lord = this.game.lords[0];
        this.game.politics = this.createPolitics();
        this.game.plot = this.game.region.plotAt(new Coordinates(1, 1));
        this.game.availableAction = AvailableAction.FORTIFY;
    }

    private buildRegion():Region {
        return new Region([
            [new Plot(PlotKind.MOUNTAIN, new Coordinates(0, 0)), new Plot(PlotKind.FOREST, new Coordinates(0, 1)), new Plot(PlotKind.FOREST, new Coordinates(0, 2))],
            [new Plot(PlotKind.MOUNTAIN, new Coordinates(1, 0)), new Plot(PlotKind.CASTLE, new Coordinates(1, 1)), new Plot(PlotKind.PLAIN, new Coordinates(1, 2))],
            [new Plot(PlotKind.PLAIN, new Coordinates(2, 0)), new Plot(PlotKind.PLAIN, new Coordinates(2, 1)), new Plot(PlotKind.WATER, new Coordinates(2, 2))]
        ]);
    }

    private createPolitics():Politics {
        return new PoliticsFactory().fromLords(3, this.game.lords);
    }

    private createLord():Lord {
        let lord:Lord = new Lord();
        lord.name = 'Lord Help';
        lord.actionPoints = new ActionPoints(99);
        lord.treasure = 666;
        lord.domain = [
            this.game.region.plotAt(new Coordinates(1, 1)),
            this.game.region.plotAt(new Coordinates(1, 2))
        ];
        return lord;
    }
}