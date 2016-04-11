import {TestComponentBuilder, inject, beforeEachProviders, beforeEach} from 'angular2/testing';
import {DashboardComponent} from './dashboard.component';
import {Plot} from '../pieces/world/Plot';
import {GameService} from '../services/game.service';
import {provide, Component} from 'angular2/core';
import {RankingComponent} from './ranking.component';
import {DomainComponent} from './domain.component';
import {ConsoleComponent} from './console.component';
import {NextTurnComponent} from './next-turn.component';
import {Lord} from '../pieces/game/Lord';

class MockGameService {
    public displayed:Plot[] = [undefined, undefined];
}

@Component({
    template: ''
})
class EmptyComponent {
}

@Component({
    selector:'ranking',
    template: '',
    inputs: ['lords']
})
class RankingEmptyComponent {
    public lords:Lord[];
}

@Component({
    selector:'domain',
    template: '',
    inputs: ['domain']
})
class DomainEmptyComponent {
    public domain:Plot[];
}

describe('DashboardComponent: component', () => {
    let tcb:TestComponentBuilder;

    let mockGameService:MockGameService = new MockGameService();

    beforeEachProviders(() => [
        TestComponentBuilder,
        DashboardComponent,
        provide(GameService, {useValue: mockGameService})
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

                let lord:Lord = new Lord();
                lord.domain = [];
                dashboardComponent.lord = lord;
                dashboardComponent.lords = [lord];
                fixture.detectChanges();
                expect(dashboardComponent.domain()).toEqual(mockGameService.displayed);
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should display selected domain', done => {
        tcb
            .overrideDirective(DashboardComponent, NextTurnComponent, EmptyComponent)
            .overrideDirective(DashboardComponent, ConsoleComponent, EmptyComponent)
            .overrideDirective(DashboardComponent, DomainComponent, DomainEmptyComponent)
            .overrideDirective(DashboardComponent, RankingComponent, RankingEmptyComponent)
            .createAsync(DashboardComponent).then(fixture => {
                let dashboardComponent:DashboardComponent = fixture.componentInstance;

                let lord:Lord = new Lord();
                lord.domain = [];
                dashboardComponent.lord = lord;
                dashboardComponent.lords = [lord];
                mockGameService.displayed = undefined;
                fixture.detectChanges();
                expect(dashboardComponent.domain()).toEqual(lord.domain);
                done();
            })
            .catch(e => done.fail(e));
    });

});