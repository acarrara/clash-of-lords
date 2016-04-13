import {beforeEach, beforeEachProviders, describe, expect, it, inject, TestComponentBuilder} from 'angular2/testing';
import {PlotComponent} from './plot.component';
import {PlotKind} from '../pieces/world/PlotKind';
import {Plot} from '../pieces/world/Plot';
import {Coordinates} from '../pieces/world/Coordinates';
import {AvailableAction} from '../pieces/game/actions/AvailableAction';
import {Game} from '../pieces/game/Game';
import {createGame} from '../mock-game';

describe('PlotComponent: component', () => {
    let tcb:TestComponentBuilder;
    let game:Game = createGame();

    beforeEachProviders(() => [
        TestComponentBuilder,
        PlotComponent
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should render a plot with id 1_0 and classes plot, f and lord0 ', done => {
        tcb.createAsync(PlotComponent).then(fixture => {
                let plotComponent:any = fixture.componentInstance,
                    element:any = fixture.nativeElement;
                plotComponent.game = game;
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
                    element:any = fixture.nativeElement;
                plotComponent.game = game;
                plotComponent.plot = new Plot(PlotKind.PLAIN, new Coordinates(2, 2));
                fixture.detectChanges();
                expect(element.querySelector('div').id).toBe('2_2');
                expect(element.querySelector('div')).toHaveCssClass('plot');
                expect(element.querySelector('div')).toHaveCssClass('p');
                expect(element.querySelector('div')).toHaveCssClass('lord0');
                expect(element.querySelector('div')).toHaveCssClass('limes-right');
                expect(element.querySelector('div')).toHaveCssClass('limes-left');
                expect(element.querySelector('div')).toHaveCssClass('limes-bottom');
                expect(element.querySelector('div')).toHaveCssClass('limes-top');
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should render a plot with id 2_0 and classes plot, f and fortified', done => {
        tcb.createAsync(PlotComponent).then(fixture => {
                let plotComponent:any = fixture.componentInstance,
                    element:any = fixture.nativeElement;
                plotComponent.game = game;
                plotComponent.plot = new Plot(PlotKind.FOREST, new Coordinates(0, 0));
                plotComponent.plot.fortified = true;
                fixture.detectChanges();
                expect(element.querySelector('div').id).toBe('0_0');
                expect(element.querySelector('div')).toHaveCssClass('plot');
                expect(element.querySelector('div')).toHaveCssClass('f');
                expect(element.querySelector('div')).toHaveCssClass('fortified');
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should render a plot without class "toRemove"', done => {
        tcb.createAsync(PlotComponent).then(fixture => {
                let plotComponent:any = fixture.componentInstance,
                    element:any = fixture.nativeElement;
                plotComponent.game = game;
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
                    element:any = fixture.nativeElement;
                plotComponent.game = game;
                plotComponent.plot = new Plot(PlotKind.FOREST, new Coordinates(1, 0));
                element.dispatchEvent(new Event('mouseenter'));
                fixture.detectChanges();
                expect(plotComponent.availableAction).toEqual(AvailableAction.FORTIFY);
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should call game service conquer when action is "Conquer"', done => {
        tcb.createAsync(PlotComponent).then(fixture => {
                let plotComponent:any = fixture.componentInstance;
                spyOn(plotComponent.runaction, 'emit');
                plotComponent.game = game;
                plotComponent.plot = new Plot(PlotKind.FOREST, new Coordinates(1, 0));
                plotComponent.action(AvailableAction.CONQUER);
                expect(plotComponent.runaction.emit).toHaveBeenCalledWith(AvailableAction.CONQUER);
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should call game service build when action context menu', done => {
        tcb.createAsync(PlotComponent).then(fixture => {
                let plotComponent:any = fixture.componentInstance,
                    element:HTMLElement = fixture.nativeElement;
                let contextMenuEvent:Event = new Event('contextmenu');
                spyOn(plotComponent.runaction, 'emit');
                spyOn(contextMenuEvent, 'preventDefault');
                plotComponent.game = game;
                plotComponent.plot = new Plot(PlotKind.FOREST, new Coordinates(1, 0));
                fixture.detectChanges();
                element.querySelector('.plot').dispatchEvent(contextMenuEvent);
                fixture.detectChanges();
                expect(plotComponent.runaction.emit).toHaveBeenCalledWith(AvailableAction.BUILD);
                expect(contextMenuEvent.preventDefault).toHaveBeenCalled();
                done();
            })
            .catch(e => done.fail(e));
    });

});
