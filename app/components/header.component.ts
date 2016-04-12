import {Component} from 'angular2/core';
import {Lord} from '../pieces/game/Lord';
import {ScoutComponent} from './scout.component';
import {TreasuryComponent} from './treasury.component';

@Component({
    selector: 'header',
    template: `
        <div class='header'>
            <treasury [lord]='lord'></treasury>
            <scout></scout>
        </div>
    `,
    inputs: ['lord'],
    directives: [ScoutComponent, TreasuryComponent]
})
export class HeaderComponent {
    public lord:Lord;
}