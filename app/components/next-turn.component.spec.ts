import {beforeEach, beforeEachProviders, describe, expect, inject, TestComponentBuilder} from 'angular2/testing';
import {NextTurnComponent} from './next-turn.component';

describe('NextTurnComponent: component', () => {
    let tcb:TestComponentBuilder;

    beforeEachProviders(() => [
        TestComponentBuilder,
        NextTurnComponent
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should fire "next" event', done => {
        tcb.createAsync(NextTurnComponent).then(fixture => {
                let nextTurnComponent:NextTurnComponent = fixture.componentInstance,
                    element:any = fixture.nativeElement;
                nextTurnComponent.lordIndex = 0;
                spyOn(nextTurnComponent.next, 'emit');
                fixture.detectChanges();
                element.querySelector('#nextturn').dispatchEvent(new Event('click'));
                fixture.detectChanges();
                expect(nextTurnComponent.next.emit).toHaveBeenCalled();
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should have lord2 class', done => {
        tcb.createAsync(NextTurnComponent).then(fixture => {
                let nextTurnComponent:NextTurnComponent = fixture.componentInstance,
                    element:any = fixture.nativeElement;
                nextTurnComponent.lordIndex = 2;
                fixture.detectChanges();
                expect(element.querySelector('#nextturn')).toHaveCssClass('lord2');
                done();
            })
            .catch(e => done.fail(e));
    });
    
});