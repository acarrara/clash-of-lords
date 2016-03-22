import {Component} from 'angular2/core';

@Component({
    selector: 'lord-dashboard',
    template: `<div class="lord-dashboard">
        <div class="lord-dashboard-element lord{{i}}" *ngFor="#lord of lords; #i=index">
        <span class="lord-dashboard-name">{{lord.name}}</span>
        <div class="lord-dashboard-actionpoints">10</div>
        </div>
    </div>
    `,
    inputs: ['lords']
})
export class LordDashboardComponent {
}