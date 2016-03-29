import {beforeEach, beforeEachProviders, describe, inject, TestComponentBuilder} from 'angular2/testing';
import {RankingComponent} from './ranking.component';
import {Lord} from '../pieces/game/Lord';

describe('RankingComponent: component', () => {
    let tcb:TestComponentBuilder;

    beforeEachProviders(() => [
        TestComponentBuilder,
        RankingComponent
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should order Bonnie and Clyde on treasure size', done => {
        tcb.createAsync(RankingComponent).then(fixture => {
                let rankingComponent:RankingComponent = fixture.componentInstance,
                    element:any                       = fixture.nativeElement;
                let lord0:Lord = new Lord();
                lord0.name = 'Bonnie';
                lord0.treasure = 0;
                let lord1:Lord = new Lord();
                lord1.name = 'Clyde';
                lord1.treasure = 1;
                rankingComponent.lords = [lord0, lord1];
                fixture.detectChanges();
                var elementNames:NodeListOf<Element> = element.querySelectorAll('.element-name');
                var elementTreasures:NodeListOf<Element> = element.querySelectorAll('.element-number');
                expect(elementNames.item(0).innerHTML).toEqual('Clyde');
                expect(elementNames.item(1).innerHTML).toEqual('Bonnie');
                expect(elementTreasures.item(0).innerHTML).toEqual('1');
                expect(elementTreasures.item(1).innerHTML).toEqual('0');
                done();
            })
            .catch(e => done.fail(e));
    });
});