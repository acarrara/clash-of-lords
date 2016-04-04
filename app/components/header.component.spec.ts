import {beforeEach, beforeEachProviders, describe, inject, TestComponentBuilder} from 'angular2/testing';
import {HeaderComponent} from './header.component';
import {Lord} from '../pieces/game/Lord';
import {ActionPoints} from '../pieces/game/ActionPoints';
import {Component} from 'angular2/core';
import {ScoutComponent} from './scout.component';

describe('HeaderComponent: component', () => {
    let tcb:TestComponentBuilder;

    beforeEachProviders(() => [
        TestComponentBuilder,
        HeaderComponent
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should display current lord statistics', done => {
        tcb
            .overrideDirective(HeaderComponent, ScoutComponent, EmptyComponent)
            .createAsync(HeaderComponent).then(fixture => {
                let headerComponent:HeaderComponent = fixture.componentInstance,
                    element:any                     = fixture.nativeElement;
                let lord:Lord = new Lord();
                lord.name = 'Bonnie';
                lord.treasure = 100;
                lord.actionPoints = new ActionPoints(90);
                headerComponent.lord = lord;
                fixture.detectChanges();
                expect(element.querySelector('.lord-name').innerHTML).toEqual('Bonnie');
                expect(element.querySelector('.lord-ap').innerHTML).toEqual('90 AP');
                expect(element.querySelector('.lord-treasure').innerHTML).toEqual('100 $');
                done();
            })
            .catch(e => done.fail(e));
    });
});

@Component({template: ''})
class EmptyComponent {
}