import {beforeEach, beforeEachProviders, describe, expect, it, inject, TestComponentBuilder} from 'angular2/testing';
import {provide} from 'angular2/core';
import {PlotComponent} from './plot.component';
import {PlotKind} from '../pieces/world/PlotKind';
import {Plot} from '../pieces/world/Plot';
import {Coordinates} from '../pieces/world/Coordinates';
import {GameService} from '../services/game.service';
import {Politics} from '../pieces/game/Politics';
import {Lord} from '../pieces/game/Lord';

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
                expect(element.querySelector('div')).toHaveCssClass('lord0');
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

    public politics:Politics;
    public lords:Lord[];

    constructor() {
        this.initMock();
    }

    public isRight(current:Coordinates):boolean {
        return true;
    }

    public isLeft(current:Coordinates):boolean {
        return true;
    }

    public isTop(current:Coordinates):boolean {
        return true;
    }

    public isBottom(current:Coordinates):boolean {
        return true;
    }

    private initMock():void {
        this.politics = new Politics();
        this.politics.domainMap = [[], []];
        var lord:Lord = new Lord();
        this.politics.domainMap[1][0] = lord;
        this.lords = [lord];
    };
}
