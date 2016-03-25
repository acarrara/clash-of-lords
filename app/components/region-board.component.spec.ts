import {beforeEach, beforeEachProviders, describe, expect, it, inject, TestComponentBuilder} from 'angular2/testing';
import {provide} from 'angular2/core';
import {RegionBoardComponent} from './region-board.component';
import {Region} from '../pieces/world/Region';
import {Plot} from '../pieces/world/Plot';
import {PlotKind} from '../pieces/world/PlotKind';
import {Coordinates} from '../pieces/world/Coordinates';
import {GameService} from '../services/game.service';
import {MockGameService} from './plot.component.spec';

describe('RegionBoardComponent: component', () => {
    let tcb:TestComponentBuilder;

    beforeEachProviders(() => [
        TestComponentBuilder,
        RegionBoardComponent,
        provide(GameService, {useClass: MockGameService})
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should render one row with id 0', done => {
        tcb.createAsync(RegionBoardComponent).then(fixture => {
                let regionBoardComponent:RegionBoardComponent = fixture.componentInstance,
                    element:any = fixture.nativeElement;
                var region:Region = new Region([[new Plot(PlotKind.FOREST, new Coordinates(0, 0))]]);
                regionBoardComponent.region = region;
                fixture.detectChanges();
                expect(element.querySelector('.row').id).toEqual('0');
                expect(element.querySelector('.plot').id).toEqual('0_0');
                done();
            })
            .catch(e => done.fail(e));
    });
});
