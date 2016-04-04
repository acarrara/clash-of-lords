import {Component} from 'angular2/core';
import {Lord} from '../pieces/game/Lord';
import {ScoutComponent} from './scout.component';

@Component({
    selector: 'header',
    template: `
        <div class="header">
            <div class="header-lord">
                <div class="lord-name">{{lord.name}}</div>
                <div class="lord-ap">{{lord.actionPoints.amount}} AP</div>
                <div class="lord-treasure">{{lord.treasure}} $</div>
            </div>
            <scout></scout>
        </div>
    `,
    inputs: ['lord'],
    directives: [ScoutComponent]
})
export class HeaderComponent {

    public lord:Lord;

}