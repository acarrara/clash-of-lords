import {Component} from 'angular2/core';
import {Lord} from '../pieces/game/Lord';

@Component({
    selector: 'treasury',
    template: `
        <div class='header-lord'>
            <div class='lord-name'>{{lord.name}}</div>
            <div class='lord-ap'>{{lord.actionPoints.amount}} AP</div>
            <div class='lord-treasure'>{{lord.treasure}} $</div>
        </div>
    `,
    inputs: ['lord']
})
export class TreasuryComponent {
    public lord:Lord;
}