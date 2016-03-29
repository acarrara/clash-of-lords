import {Component} from 'angular2/core';
import {Lord} from '../pieces/game/Lord';

@Component({
    selector: 'header',
    template: `
        <div class="header">
            <div class="header-lord">
                <div class="lord-name">{{lord.name}}</div>
                <div class="lord-ap">{{lord.actionPoints.amount}}</div>
                <div class="lord-treasure">{{lord.treasure}} $</div>
            </div>
            <div class="header-action">Colonize</div>
        </div>
    `,
    inputs: ['lord']
})
export class HeaderComponent {
    public lord:Lord;
}