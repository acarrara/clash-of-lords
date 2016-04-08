import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

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
            </div>
            <div class="nav navcol" [routerLink]="['ClashOfLords']">Back to game</div>
        </div>
    `,
    directives: [RouterLink]
})
export class HelpComponent {
}