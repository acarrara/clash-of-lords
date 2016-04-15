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
import {RegionBoardComponent} from './region-board.component';
import {RankingComponent} from './ranking.component';
import {DomainComponent} from './domain.component';
import {ConsoleComponent} from './console.component';
import {Message} from '../pieces/game/message/Message';
import {MessageLevel} from '../pieces/game/message/MessageLevel';
import {NextTurnComponent} from './next-turn.component';

@Component({
    selector: `help`,
    template: `
        <div class="help-container">
            <div class="help-text">
                <div class="help-section">
                    <section>
                        <h1>Clash of Lords - Colonize and Conquer!</h1>
                            <div>Hail to you, oh Highborn Lord!</div>
                            <div>The power of your House has slowly declined through the years...</div>
                            <div>It is time to restore the ancient glory!</div>
                            <div>Expand your boundaries and build a Kingdom!</div>
                    </section>
                </div>
                <div class="help-separator"></div>
                <div class="help-section">
                    <section>
                        <h1>The World</h1>
                            <div>This is our world. It is beautiful. It is rich.</div>
                            <div>You wants it... All for you! But you're not the only one...</div>
                            <div>The borders of your domains have the colours of your House.</div>
                            <div>At the beginning of every turn your peasants farm resources from your domain...
                            The greater the domain, the richer the harvest!</div>
                            <div><strong>Plains</strong> are easy to settle and cross, but they produce no iron or wood.</div>
                            <div>But we can build <strong>castles</strong> on them!</div>
                            <div><strong>Forests</strong> are a little peskier, but you can chop wood!</div>
                            <div><strong>Mountains</strong> are for real men. Iron for the warriors!</div>
                            <div><strong>Water</strong> is good only for fishes. Are you a fish or a man?</div>
                    </section>
                </div>
                <div class="help-section example">
                    <region-board class="clash-game" [game]="game"></region-board>
                </div>
                <div class="help-separator"></div>
                    <div class="help-section">
                        <section>
                            <h1>Your Castle</h1>
                            <div>Open your <strong>treasury room</strong> in your castle and swim in your gold!</div>
                            <div>There is a sign with your name next to your gold. Praise your feats!</div>
                            <div>This room also contains the remaining <strong>Action Points</strong> you can use to expand your domains.
                            If you don't want to spend them, at the end of your turn your wizards will turn them into gold!</div>
                        </section>      
                    </div>
                <div class="help-section example">
                    <treasury [lord]="game.lord"></treasury>
                </div>
                    <div class="help-section">
                        <section>
                            <div>Hover on a plot and send your most trustworthy <strong>scout</strong> to explore it!</div>
                            <div>He will report the plot position on the map, its terrain and its settler!</div>
                            <div>You can trust him. He will suggest you what is your best bet to get it or to hold it.</div>
                            <div>This action will come with a cost. Your scout isn't a fool and will tell it to you. 
                            Click on the plot to do what the scout suggests! (Right-click to build a castle)
                            But if you can't afford it, the predicted cost will become red!</div>
                        </section>
                    </div>
                <div class="help-section example">
                    <scout [game]="game"></scout>
                </div>
                <div class="help-separator"></div>
                    <div class="help-section">
                        <section>
                            <h1>The Great Hall</h1>
                        <div>The Great Hall of your castle doesn't only host great celebrations...
                            On the left wall it also displays a splendid tapestry with a detailed <strong>description of your domains</strong>. 
                            Let everyone know the power of your House!</div>
                            <div>Remember... As long as there is a castle listed, you have a place
                            where to append it, and peasants to keep it updated! Lose all your castles, and
                            the tapestry will fall into oblivion... as your House.</div>
                        </section>
                    </div>
                <div class="help-section example">
                    <domain [domain]="game.lord.domain"></domain>
                </div>
                    <div class="help-section">
                        <section>
                            <div>So the left wall of your Great Hall is richly adorned. What about the right?</div>
                            <div>The right wall displays another magnificent tapestry embroidered with the
                            wealth of the Houses... not only yours! So you can linger in your pride if you
                            are at the top, or strive to reach the top if you aren't there!</div>
                            <div>If you want an overall report on the domains of an enemy, hover on his name
                            and your peasants will temporary append a homely tapestry on your left wall.</div>
                        </section>
                    </div>
                <div class="help-section example">
                    <ranking [game]="game"></ranking>
                </div>
                <div class="help-section">
                    <section>
                        <div>Bards need a place to sing your feats, and heralds need a place to assert
                        what's happening outside. The Great Hall is a perfect place for both!</div>
                        <div>Everytime something important happens, heralds will shout the news in the middle
                        of the Great Hall! But you cannot kill them if they mock you with red messages in front
                        of your peasants!</div>
                    </section>
                </div>
                <div class="help-section example">
                    <console [messages]="messages" class="messages"></console>
                </div>
                <div class="help-separator"></div>
                <div class="help-section">
                    <section>
                        <h1>Let it sink</h1>
                        <div>There is a time for action and a time for thinking... When you need to think 
                        about your next moves, or you are curious about how your enemies will reply to 
                        your actions... Click on <strong>next turn</strong>, sit on your throne and watch your enemies
                        struggle to defend themselves!</div>
                    </section>
                </div>
                <div class="help-section example">
                    <next-turn [lordIndex]="game.lordIndex"></next-turn>
                </div>
                <div class="help-separator"></div>
                <div class="help-section">
                    <section>
                        <h1>Onward to battle</h1>
                        <div>Time to fight now! Go back to the melee and meet your enemies on the battlefield!</div>
                    </section>
                </div>
            </div>
            <div class="nav navcol" [routerLink]="['ClashOfLords']">&lt;- Back to game</div>
        </div>
    `,
    directives: [
        TreasuryComponent,
        RegionBoardComponent,
        ScoutComponent,
        RankingComponent,
        DomainComponent,
        ConsoleComponent,
        NextTurnComponent,
        RouterLink
    ]
})
export class HelpComponent {

    public game:Game;
    public messages:Message[];

    constructor() {
        this.game = new Game();
        this.game.region = this.buildRegion();
        this.game.lords = [this.createLord(), this.createEnemy()];
        this.game.lord = this.game.lords[0];
        this.game.politics = this.createPolitics();
        this.game.plot = this.game.region.plotAt(new Coordinates(1, 1));
        this.game.availableAction = AvailableAction.FORTIFY;
        this.messages = [
            new Message('An enemy has been defeated!', MessageLevel.INFO),
            new Message('Another enemy surrenders!', MessageLevel.INFO),
            new Message('But you\'re still uglier than them!', MessageLevel.WARN)
        ];
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
        lord.name = 'High Lord';
        lord.actionPoints = new ActionPoints(99);
        lord.potential = new ActionPoints(99);
        lord.treasure = 999;
        lord.domain = [
            this.game.region.plotAt(new Coordinates(1, 1)),
            this.game.region.plotAt(new Coordinates(1, 2))
        ];
        return lord;
    }

    private createEnemy():Lord {
        let lord:Lord = new Lord();
        lord.name = 'Evil Enemy';
        lord.actionPoints = new ActionPoints(66);
        lord.potential = new ActionPoints(66);
        lord.treasure = 666;
        lord.domain = [];
        return lord;
    }
}