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

class MockGameService {
    public lords:Lord[] = [new Lord()];
    public activeLord:Lord = this.lords[0];
    public started:boolean = false;
    public region:Region = new Region([]);

    public startGame():void {
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
    inputs: ['lord']
})
class HeaderEmptyComponent {
    public lord:Lord;
}

@Component({
    selector: 'region-board',
    template: '',
    inputs: ['region']
})
class RegionEmptyComponent {
    public region:Region;
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

    it('should return model active lord', done => {
        tcb
            .overrideDirective(ClashOfLordsComponent, DashboardComponent, DashboardEmptyComponent)
            .overrideDirective(ClashOfLordsComponent, HeaderComponent, HeaderEmptyComponent)
            .overrideDirective(ClashOfLordsComponent, RegionBoardComponent, RegionEmptyComponent)
            .createAsync(ClashOfLordsComponent).then(fixture => {
                let clashOfLordsComponent:ClashOfLordsComponent = fixture.componentInstance;

                fixture.detectChanges();
                expect(clashOfLordsComponent.activeLord()).toBe(mockGameService.activeLord);
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should load region from backend', done => {
        tcb
            .overrideDirective(ClashOfLordsComponent, DashboardComponent, DashboardEmptyComponent)
            .overrideDirective(ClashOfLordsComponent, HeaderComponent, HeaderEmptyComponent)
            .overrideDirective(ClashOfLordsComponent, RegionBoardComponent, RegionEmptyComponent)
            .createAsync(ClashOfLordsComponent).then(fixture => {
                let clashOfLordsComponent:ClashOfLordsComponent = fixture.componentInstance;
                fixture.detectChanges();
                expect(clashOfLordsComponent.region).toBe(mockMockBackend.region);
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
                expect(clashOfLordsComponent.region).toBe(mockGameService.region);
                done();
            })
            .catch(e => done.fail(e));
    });

});