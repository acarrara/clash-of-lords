import {TestComponentBuilder, inject, beforeEachProviders, beforeEach} from 'angular2/testing';
import {DashboardComponent} from './dashboard.component';
import {Plot} from '../pieces/world/Plot';
import {Component} from 'angular2/core';
import {RankingComponent} from './ranking.component';
import {DomainComponent} from './domain.component';
import {ConsoleComponent} from './console.component';
import {NextTurnComponent} from './next-turn.component';
import {Game} from '../pieces/game/Game';
import {createGame} from '../mock-game';

@Component({
    template: ''
})
class EmptyComponent {
}

@Component({
    selector: 'ranking',
    template: '',
    inputs: ['game']
})
class RankingEmptyComponent {
    public game:Game;
}

@Component({
    selector: 'domain',
    template: '',
    inputs: ['domain']
})
class DomainEmptyComponent {
    public domain:Plot[];
}

describe('DashboardComponent: component', () => {
    let tcb:TestComponentBuilder;
    let game:Game = createGame();

    beforeEachProviders(() => [
        TestComponentBuilder,
        DashboardComponent
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should display game based domain', done => {
        tcb
            .overrideDirective(DashboardComponent, NextTurnComponent, EmptyComponent)
            .overrideDirective(DashboardComponent, ConsoleComponent, EmptyComponent)
            .overrideDirective(DashboardComponent, DomainComponent, DomainEmptyComponent)
            .overrideDirective(DashboardComponent, RankingComponent, RankingEmptyComponent)
            .createAsync(DashboardComponent).then(fixture => {
                let dashboardComponent:DashboardComponent = fixture.componentInstance;
                dashboardComponent.game = game;
                fixture.detectChanges();
                expect(dashboardComponent.game).toBeDefined();
                done();
            })
            .catch(e => done.fail(e));
    });

});