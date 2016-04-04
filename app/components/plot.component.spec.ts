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

    it('should render a plot with id 1_0 and classes plot, f and lord0 ', done => {
        tcb.createAsync(PlotComponent).then(fixture => {
                let plotComponent:any = fixture.componentInstance,
                    element:any       = fixture.nativeElement;
                plotComponent.plot = new Plot(PlotKind.FOREST, new Coordinates(1, 0));
                fixture.detectChanges();
                expect(element.querySelector('div').id).toBe('1_0');
                expect(element.querySelector('div')).toHaveCssClass('plot');
                expect(element.querySelector('div')).toHaveCssClass('f');
                expect(element.querySelector('div')).toHaveCssClass('lord0');
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should render a plot with id 2_0 and classes plot, f, lord0 and limes-*', done => {
        tcb.createAsync(PlotComponent).then(fixture => {
                let plotComponent:any = fixture.componentInstance,
                    element:any       = fixture.nativeElement;
                plotComponent.plot = new Plot(PlotKind.FOREST, new Coordinates(2, 0));
                fixture.detectChanges();
                expect(element.querySelector('div').id).toBe('2_0');
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

    it('should render a plot with id 2_0 and classes plot and f', done => {
        tcb.createAsync(PlotComponent).then(fixture => {
                let plotComponent:any = fixture.componentInstance,
                    element:any       = fixture.nativeElement;
                plotComponent.plot = new Plot(PlotKind.FOREST, new Coordinates(0, 0));
                fixture.detectChanges();
                expect(element.querySelector('div').id).toBe('0_0');
                expect(element.querySelector('div')).toHaveCssClass('plot');
                expect(element.querySelector('div')).toHaveCssClass('f');
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should render a plot without class "toRemove"', done => {
        tcb.createAsync(PlotComponent).then(fixture => {
                let plotComponent:any = fixture.componentInstance,
                    element:any       = fixture.nativeElement;
                element.querySelector('div').classList.add('toRemove');
                plotComponent.plot = new Plot(PlotKind.FOREST, new Coordinates(0, 0));
                fixture.detectChanges();
                expect(element.querySelector('div')).not.toHaveCssClass('toRemove');
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should change available action to "pippo" on mouse enter', done => {
        tcb.createAsync(PlotComponent).then(fixture => {
                let plotComponent:any = fixture.componentInstance,
                    element:any       = fixture.nativeElement;
                plotComponent.plot = new Plot(PlotKind.FOREST, new Coordinates(1, 0));
                element.dispatchEvent(new Event('mouseenter'));
                fixture.detectChanges();
                expect(plotComponent.availableAction).toEqual('pippo');
                done();
            })
            .catch(e => done.fail(e));
    });

    xit('should call game service conquer when action is "Conquer"', done => {
        tcb.createAsync(PlotComponent).then(fixture => {
                let plotComponent:any = fixture.componentInstance;
                var forest:Plot = new Plot(PlotKind.FOREST, new Coordinates(1, 0));
                plotComponent.plot = forest;
                plotComponent.availableAction = 'Conquer';
                plotComponent.action();
                done();
            })
            .catch(e => done.fail(e));
    });

});

export class MockGameService {

    public politics:Politics;
    public lords:Lord[];

    constructor() {
        this.initMock();
    }

    public changeAvailableAction(dest:Coordinates):string {
        return 'pippo';
    }

    public conquer():void {
        // do nothing
    }

    public colonize():void {
        // do nothing
    }

    public changePlot(plot:Plot):void {
        // do nothing
    }

    public isRight(current:Coordinates):boolean {
        return current.x % 2 === 0;
    }

    public isLeft(current:Coordinates):boolean {
        return current.x % 2 === 0;
    }

    public isTop(current:Coordinates):boolean {
        return current.x % 2 === 0;
    }

    public isBottom(current:Coordinates):boolean {
        return current.x % 2 === 0;
    }

    private initMock():void {
        this.politics = new Politics();
        this.politics.domainMap = [[], [], []];
        var lord:Lord = new Lord();
        this.politics.domainMap[1][0] = lord;
        this.politics.domainMap[2][0] = lord;
        this.lords = [lord];
    };
}
