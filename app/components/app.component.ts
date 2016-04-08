import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {Component} from 'angular2/core';
import {ClashOfLordsComponent} from './clash-of-lords.component';
import {MessageHerald} from '../services/message.herald';
import {GameService} from '../services/game.service';
import {FakeBackend} from '../services/fake.backend';
import {GameDirector} from '../services/game-director';
import {HelpComponent} from './help.component';

@Component({
    selector: 'app',
    template: `
        <router-outlet></router-outlet>
    `,
    directives: [
        ROUTER_DIRECTIVES,
        ClashOfLordsComponent
    ],
    providers: [
        ROUTER_PROVIDERS,
        FakeBackend,
        GameService,
        MessageHerald,
        GameDirector
    ]
})
@RouteConfig([
    {path: '/clashoflords', name: 'ClashOfLords', component: ClashOfLordsComponent, useAsDefault: true},
    {path: '/help', name: 'Help', component: HelpComponent}
])
export class AppComponent {
}