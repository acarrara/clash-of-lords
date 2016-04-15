import {TestComponentBuilder, inject, beforeEachProviders, beforeEach} from 'angular2/testing';
import {DashboardComponent} from './dashboard.component';
import {Plot} from '../pieces/world/Plot';
import {Component, provide} from 'angular2/core';
import {RankingComponent} from './ranking.component';
import {DomainComponent} from './domain.component';
import {ConsoleComponent} from './console.component';
import {NextTurnComponent} from './next-turn.component';
import {Game} from '../pieces/game/Game';
import {createGame} from '../mock-game';
import {MessageHerald} from '../services/message.herald';
import {MessageLevel} from '../pieces/game/message/MessageLevel';
import {Message} from '../pieces/game/message/Message';
import {Subscription} from 'rxjs/Subscription';

class MockMessageHerald extends MessageHerald {

    public listen(callback:(message:Message) => void):Subscription {
        callback(new Message('init', MessageLevel.INFO));
        return null;
    }
}

@Component({
    selector: 'next-turn',
    template: '<div class="test-picker"></div>',
    inputs: ['lordIndex']
})
class NextTurnEmptyComponent {
    public lordIndex:number;
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

@Component({
    selector: 'console',
    template: '',
    inputs: ['messages']
})
class ConsoleEmptyComponent {
    public messages:Message[];
}

describe('DashboardComponent: component', () => {
    let tcb:TestComponentBuilder;
    let game:Game = createGame();

    beforeEachProviders(() => [
        TestComponentBuilder,
        DashboardComponent,
        [provide(MessageHerald, {useClass: MockMessageHerald})]
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should display game based domain', done => {
        tcb
            .overrideDirective(DashboardComponent, NextTurnComponent, NextTurnEmptyComponent)
            .overrideDirective(DashboardComponent, ConsoleComponent, ConsoleEmptyComponent)
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

    it('should add message when herald asserts', done => {
        tcb
            .overrideDirective(DashboardComponent, NextTurnComponent, NextTurnEmptyComponent)
            .overrideDirective(DashboardComponent, ConsoleComponent, ConsoleEmptyComponent)
            .overrideDirective(DashboardComponent, DomainComponent, DomainEmptyComponent)
            .overrideDirective(DashboardComponent, RankingComponent, RankingEmptyComponent)
            .createAsync(DashboardComponent).then(fixture => {
                let dashboardComponent:DashboardComponent = fixture.componentInstance;
                dashboardComponent.ngOnInit();
                expect(dashboardComponent.messages[0].value).toEqual('init');
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should render 9 messages from 1 to 9', done => {
        tcb
            .overrideDirective(DashboardComponent, NextTurnComponent, NextTurnEmptyComponent)
            .overrideDirective(DashboardComponent, ConsoleComponent, ConsoleEmptyComponent)
            .overrideDirective(DashboardComponent, DomainComponent, DomainEmptyComponent)
            .overrideDirective(DashboardComponent, RankingComponent, RankingEmptyComponent)
            .createAsync(DashboardComponent).then(fixture => {
                let dashboardComponent:DashboardComponent = fixture.componentInstance;
                dashboardComponent.game = game;
                dashboardComponent.messages = [];
                for (let i:number = 0; i < 10; i++) {
                    dashboardComponent.addMessage(new Message('msg' + i, MessageLevel.INFO));
                }
                fixture.detectChanges();
                expect(dashboardComponent.messages.length).toEqual(9);
                expect(dashboardComponent.messages[0].value).toEqual('msg2');
                expect(dashboardComponent.messages[8].value).toEqual('init');
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should forward "next" event', done => {
        tcb
            .overrideDirective(DashboardComponent, NextTurnComponent, NextTurnEmptyComponent)
            .overrideDirective(DashboardComponent, ConsoleComponent, ConsoleEmptyComponent)
            .overrideDirective(DashboardComponent, DomainComponent, DomainEmptyComponent)
            .overrideDirective(DashboardComponent, RankingComponent, RankingEmptyComponent)
            .createAsync(DashboardComponent).then(fixture => {
                let dashboardComponent:DashboardComponent = fixture.componentInstance,
                    element:any = fixture.nativeElement;
                dashboardComponent.game = game;
                spyOn(dashboardComponent.next, 'emit');
                fixture.detectChanges();
                element.querySelector('next-turn').dispatchEvent(new CustomEvent('next'));
                fixture.detectChanges();
                expect(dashboardComponent.next.emit).toHaveBeenCalled();
                done();
            })
            .catch(e => done.fail(e));
    });

});