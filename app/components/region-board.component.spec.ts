import {
    beforeEach, beforeEachProviders, describe, expect, it, inject, TestComponentBuilder,
    MockApplicationRef
} from 'angular2/testing';
import {provide, ApplicationRef} from 'angular2/core';
import {RegionBoardComponent} from './region-board.component';
import {Region} from '../pieces/world/Region';
import {Plot} from '../pieces/world/Plot';
import {PlotKind} from '../pieces/world/PlotKind';
import {Coordinates} from '../pieces/world/Coordinates';
import {
    RouterLink, ROUTER_PRIMARY_COMPONENT, ROUTER_PROVIDERS,
    APP_BASE_HREF
} from 'angular2/router';
import {AppComponent} from './app.component';
import {MockGameService} from './plot.component.spec';
import {GameService} from '../services/game.service';

describe('RegionBoardComponent: component', () => {
    let tcb:TestComponentBuilder;

    beforeEachProviders(() => [
        TestComponentBuilder,
        RegionBoardComponent,
        RouterLink,
        ROUTER_PROVIDERS,
        provide(APP_BASE_HREF, {useValue: '/'}),
        provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
        provide(ApplicationRef, {useClass: MockApplicationRef}),
        provide(GameService, {useClass: MockGameService})
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should render one row with id 0', done => {
        tcb.createAsync(RegionBoardComponent).then(fixture => {
                let regionBoardComponent:RegionBoardComponent = fixture.componentInstance,
                    element:any                               = fixture.nativeElement;
                regionBoardComponent.region = new Region([[new Plot(PlotKind.FOREST, new Coordinates(0, 0))]]);
                fixture.detectChanges();
                expect(element.querySelector('.row').id).toEqual('0');
                expect(element.querySelector('.plot').id).toEqual('0_0');
                done();
            })
            .catch(e => done.fail(e));
    });
});
