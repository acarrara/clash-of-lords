import {
    beforeEach,
    beforeEachProviders,
    describe,
    expect,
    it,
    inject,
    TestComponentBuilder
} from 'angular2/testing';
import {provide} from 'angular2/core';

import {PlotComponent} from './plot.component';
import {PlotKind} from '../pieces/world/PlotKind';
import {Plot} from '../pieces/world/Plot';
import {Coordinates} from '../pieces/world/Coordinates';
import {GameService} from '../services/game.service';

describe('PlotComponent: component', () => {
    let tcb:TestComponentBuilder;

    beforeEachProviders(() => [
        TestComponentBuilder,
        PlotComponent,
        provide(GameService, {useClass: MockGameService})
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should render a plot with id 1_0 and class f', done => {
        tcb.createAsync(PlotComponent).then(fixture => {
                let plotComponent:any = fixture.componentInstance,
                    element:any = fixture.nativeElement;
                plotComponent.plot = new Plot(PlotKind.FOREST, new Coordinates(1, 0));
                fixture.detectChanges();
                expect(element.querySelector('div').id).toBe('1_0');
                expect(element.querySelector('div')).toHaveCssClass('plot');
                expect(element.querySelector('div')).toHaveCssClass('f');
                expect(element.querySelector('div')).toHaveCssClass('limes-right');
                expect(element.querySelector('div')).toHaveCssClass('limes-left');
                expect(element.querySelector('div')).toHaveCssClass('limes-bottom');
                expect(element.querySelector('div')).toHaveCssClass('limes-top');
                done();
            })
            .catch(e => done.fail(e));
    });
});

class MockGameService {

    public isRight(x:number, y:number):boolean {
        return true;
    }

    public isLeft(x:number, y:number):boolean {
        return true;
    }

    public isTop(x:number, y:number):boolean {
        return true;
    }

    public isBottom(x:number, y:number):boolean {
        return true;
    }
}
