import {beforeEach, beforeEachProviders, describe, inject, TestComponentBuilder} from 'angular2/testing';
import {DomainComponent} from './domain.component';
import {PlotKind} from '../pieces/world/PlotKind';
import {Plot} from '../pieces/world/Plot';

describe('DomainComponent: component', () => {
    let tcb:TestComponentBuilder;

    beforeEachProviders(() => [
        TestComponentBuilder,
        DomainComponent
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should render 1 plain, 1 forest, 0 mountains and 2 castles', done => {
        tcb.createAsync(DomainComponent).then(fixture => {
                let domainComponent:DomainComponent = fixture.componentInstance,
                    element:any                     = fixture.nativeElement;
                domainComponent.domain = [
                    new Plot(PlotKind.CASTLE, null),
                    new Plot(PlotKind.CASTLE, null),
                    new Plot(PlotKind.PLAIN, null),
                    new Plot(PlotKind.FOREST, null)
                ];
                fixture.detectChanges();
                var elementAmounts:NodeListOf<Element> = element.querySelectorAll('.element-number');
                expect(elementAmounts.item(0).innerHTML).toEqual('1');
                expect(elementAmounts.item(1).innerHTML).toEqual('1');
                expect(elementAmounts.item(2).innerHTML).toEqual('0');
                expect(elementAmounts.item(3).innerHTML).toEqual('2');
                var elementNames:NodeListOf<Element> = element.querySelectorAll('.element-name');
                expect(elementNames.item(0).innerHTML).toEqual('Plain');
                expect(elementNames.item(1).innerHTML).toEqual('Forest');
                expect(elementNames.item(2).innerHTML).toEqual('Mountains');
                expect(elementNames.item(3).innerHTML).toEqual('Castles');
                done();
            })
            .catch(e => done.fail(e));
    });
});