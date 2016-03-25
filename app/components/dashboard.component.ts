import {Component} from 'angular2/core';
import {NextTurnComponent} from './next-turn.component';
import {ConsoleComponent} from './console-component';

@Component({
    selector: 'dashboard',
    template: `
        <div class="dashboard" >
            <div class="domain"></div>
            <div class="console">
                <next-turn></next-turn>
                <console class="messages"></console>
             </div>
            <div class="overview"></div>
        </div>
    `,
    directives: [NextTurnComponent, ConsoleComponent]
})
export class DashboardComponent {

}