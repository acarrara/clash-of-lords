import {
    beforeEach,
    beforeEachProviders,
    describe,
    expect,
    it,
    inject,
    TestComponentBuilder,
    MockApplicationRef
} from 'angular2/testing';
import {provide, ApplicationRef, Component} from 'angular2/core';
import {RegionBoardComponent} from './region-board.component';
import {Region} from '../pieces/world/Region';
import {Plot} from '../pieces/world/Plot';
import {PlotKind} from '../pieces/world/PlotKind';
import {Coordinates} from '../pieces/world/Coordinates';
import {RouterLink, ROUTER_PRIMARY_COMPONENT, ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {AppComponent} from './app.component';
import {Game} from '../pieces/game/Game';
import {PlotComponent} from './plot.component';
import {AvailableAction} from '../pieces/game/actions/AvailableAction';
import {createGame} from '../mock-game';

@Component({
    selector: 'plot',
    template: '',
    inputs: ['plot', 'game']
})
class MockPlotComponent {
    public plot:Plot;
    public game:Game;
}

describe('RegionBoardComponent: component', () => {
    let tcb:TestComponentBuilder;
    let game:Game = createGame();

    beforeEachProviders(() => [
        TestComponentBuilder,
        RegionBoardComponent,
        RouterLink,
        ROUTER_PROVIDERS,
        provide(APP_BASE_HREF, {useValue: '/'}),
        provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
        provide(ApplicationRef, {useClass: MockApplicationRef})
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should render one row with id 0', done => {
        tcb
            .overrideDirective(RegionBoardComponent, PlotComponent, MockPlotComponent)
            .createAsync(RegionBoardComponent).then(fixture => {
                let regionBoardComponent:RegionBoardComponent = fixture.componentInstance,
                    element:any = fixture.nativeElement;
                regionBoardComponent.game = game;
                regionBoardComponent.game.region = new Region([[new Plot(PlotKind.FOREST, new Coordinates(0, 0))]]);
                fixture.detectChanges();
                expect(element.querySelector('.row').id).toEqual('0');
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should forward runaction event', done => {
        tcb
            .overrideDirective(RegionBoardComponent, PlotComponent, MockPlotComponent)
            .createAsync(RegionBoardComponent).then(fixture => {
                let regionBoardComponent:RegionBoardComponent = fixture.componentInstance,
                    element:any = fixture.nativeElement;
                regionBoardComponent.game = game;
                spyOn(regionBoardComponent.runaction, 'emit');
                fixture.detectChanges();
                element.querySelector('plot').dispatchEvent(new CustomEvent('runaction', {detail: AvailableAction.BUILD}));
                fixture.detectChanges();
                expect(regionBoardComponent.runaction.emit).toHaveBeenCalled();
                done();
            })
            .catch(e => done.fail(e));
    });
});
