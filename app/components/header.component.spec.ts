import {beforeEach, beforeEachProviders, describe, inject, TestComponentBuilder} from 'angular2/testing';
import {HeaderComponent} from './header.component';
import {Lord} from '../pieces/game/Lord';
import {ActionPoints} from '../pieces/game/ActionPoints';
import {GameService} from '../services/game.service';
import {provide} from 'angular2/core';
import {MockGameService} from './plot.component.spec';

describe('HeaderComponent: component', () => {
    let tcb:TestComponentBuilder;

    beforeEachProviders(() => [
        TestComponentBuilder,
        HeaderComponent,
        provide(GameService, {useClass: MockGameService})
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    xit('should order Bonnie and Clyde on treasure size', done => {
        tcb.createAsync(HeaderComponent).then(fixture => {
                let headerComponent:HeaderComponent = fixture.componentInstance,
                    element:any                       = fixture.nativeElement;
                let lord:Lord = new Lord();
                lord.name = 'Bonnie';
                lord.treasure = 100;
                lord.actionPoints = new ActionPoints(90);
                headerComponent.lord = lord;
                fixture.detectChanges();
                expect(element.querySelector('.lord-name').innerHTML).toEqual('Bonnie');
                expect(element.querySelector('.lord-ap').innerHTML).toEqual('90');
                expect(element.querySelector('.lord-treasure').innerHTML).toEqual('100 $');
                done();
            })
            .catch(e => done.fail(e));
    });
});