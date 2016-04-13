import {TestComponentBuilder, inject, beforeEachProviders, beforeEach} from 'angular2/testing';
import {DashboardComponent} from './dashboard.component';
import {GameService} from '../services/game.service';
import {provide, Component} from 'angular2/core';
import {Lord} from '../pieces/game/Lord';
import {Region} from '../pieces/world/Region';
import {ClashOfLordsComponent} from './clash-of-lords.component';
import {HeaderComponent} from './header.component';
import {RegionBoardComponent} from './region-board.component';
import {MockBackend} from '../services/mock.backend';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Game} from '../pieces/game/Game';
import {createGame} from '../mock-game';
import {AvailableAction} from '../pieces/game/actions/AvailableAction';

class MockGameService {

    public game:Game = createGame();
    public started:boolean = false;

    public startGame():void {
        // do nothing
    }

    public run():void {
        // do nothing
    }
}

class MockMockBackend {

    public region:Region = new Region([[]]);

    public loadSavedGame():Observable<Region> {
        return Observable.create((observer:Observer<Region>) => {
            observer.next(this.region);
            observer.complete();
        });
    }
}

@Component({
    selector: 'dashboard',
    template: '',
    inputs: ['lord', 'lords']
})
class DashboardEmptyComponent {
    public lord:Lord;
    public lords:Lord[];
}

@Component({
    selector: 'header',
    template: '',
    inputs: ['game']
})
class HeaderEmptyComponent {
    public game:Game;
}

@Component({
    selector: 'region-board',
    template: '',
    inputs: ['game']
})
class RegionEmptyComponent {
    public game:Game;
}

describe('ClashOfLordsComponent: component', () => {
    let tcb:TestComponentBuilder;

    let mockGameService:MockGameService = new MockGameService();
    let mockMockBackend:MockMockBackend = new MockMockBackend();

    beforeEachProviders(() => [
        TestComponentBuilder,
        ClashOfLordsComponent,
        provide(GameService, {useValue: mockGameService}),
        provide(MockBackend, {useValue: mockMockBackend})
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should load region from backend', done => {
        tcb
            .overrideDirective(ClashOfLordsComponent, DashboardComponent, DashboardEmptyComponent)
            .overrideDirective(ClashOfLordsComponent, HeaderComponent, HeaderEmptyComponent)
            .overrideDirective(ClashOfLordsComponent, RegionBoardComponent, RegionEmptyComponent)
            .createAsync(ClashOfLordsComponent).then(fixture => {
                let clashOfLordsComponent:ClashOfLordsComponent = fixture.componentInstance;
                fixture.detectChanges();
                expect(clashOfLordsComponent.game).toBe(mockGameService.game);
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should load region from game service', done => {
        tcb
            .overrideDirective(ClashOfLordsComponent, DashboardComponent, DashboardEmptyComponent)
            .overrideDirective(ClashOfLordsComponent, HeaderComponent, HeaderEmptyComponent)
            .overrideDirective(ClashOfLordsComponent, RegionBoardComponent, RegionEmptyComponent)
            .createAsync(ClashOfLordsComponent).then(fixture => {
                let clashOfLordsComponent:ClashOfLordsComponent = fixture.componentInstance;
                mockGameService.started = true;
                fixture.detectChanges();
                expect(clashOfLordsComponent.game.region).toBe(mockGameService.game.region);
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should call game service run when runaction event is fired', done => {
        tcb
            .overrideDirective(ClashOfLordsComponent, DashboardComponent, DashboardEmptyComponent)
            .overrideDirective(ClashOfLordsComponent, HeaderComponent, HeaderEmptyComponent)
            .overrideDirective(ClashOfLordsComponent, RegionBoardComponent, RegionEmptyComponent)
            .createAsync(ClashOfLordsComponent).then(fixture => {
                let clashOfLordsComponent:ClashOfLordsComponent = fixture.componentInstance,
                    element:HTMLElement = fixture.nativeElement;
                mockGameService.started = true;
                spyOn(mockGameService, 'run');
                fixture.detectChanges();
                element.querySelector('.clash-game').dispatchEvent(new CustomEvent('runaction', {detail: AvailableAction.BUILD}));
                fixture.detectChanges();
                expect(clashOfLordsComponent.game.availableAction).toEqual(AvailableAction.BUILD);
                expect(mockGameService.run).toHaveBeenCalled();
                done();
            })
            .catch(e => done.fail(e));
    });

});