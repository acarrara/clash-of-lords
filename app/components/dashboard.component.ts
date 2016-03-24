import {Component} from 'angular2/core';
import {NextTurnComponent} from './next-turn.component';

@Component({
    selector: 'dashboard',
    template: `
        <div class="dashboard" >
            <div class="domain"></div>
            <div class="console">
                <next-turn></next-turn>
                <div class="messages"></div>
             </div>
            <div class="overview"></div>
        </div>
    `,
    directives: [NextTurnComponent]
})
export class DashboardComponent {

}