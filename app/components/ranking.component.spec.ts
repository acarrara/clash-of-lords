import {beforeEach, beforeEachProviders, describe, inject, TestComponentBuilder} from 'angular2/testing';
import {RankingComponent} from './ranking.component';
import {DisplayDomainDirective} from '../attribute-directives/display-domain.directive';
import {Directive, Input} from 'angular2/core';
import {Plot} from '../pieces/world/Plot';
import {createGame} from '../mock-game';
import {Game} from '../pieces/game/Game';

describe('RankingComponent: component', () => {
    let tcb:TestComponentBuilder;
    let game:Game = createGame();

    beforeEachProviders(() => [
        TestComponentBuilder,
        RankingComponent
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should order Bonnie and Clyde on treasure size', done => {
        tcb
            .overrideDirective(RankingComponent, DisplayDomainDirective, MockDisplayDomainDirective)
            .createAsync(RankingComponent).then(fixture => {
                let rankingComponent:RankingComponent = fixture.componentInstance,
                    element:any = fixture.nativeElement;
                rankingComponent.game = game;
                fixture.detectChanges();
                var elementNames:NodeListOf<Element> = element.querySelectorAll('.element-name');
                var elementTreasures:NodeListOf<Element> = element.querySelectorAll('.treasure');
                var elementActionPoints:NodeListOf<Element> = element.querySelectorAll('.action-points');
                expect(elementNames.item(0).innerHTML).toEqual('Clyde');
                expect(elementNames.item(1).innerHTML).toEqual('Bonnie');
                expect(elementTreasures.item(0).innerHTML).toEqual('1 $');
                expect(elementTreasures.item(1).innerHTML).toEqual('0 $');
                expect(elementActionPoints.item(0).innerHTML).toEqual('8 AP');
                expect(elementActionPoints.item(1).innerHTML).toEqual('9 AP');
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should order Bonnie and Clyde on treasure size when ranking lords are empty', done => {
        tcb
            .overrideDirective(RankingComponent, DisplayDomainDirective, MockDisplayDomainDirective)
            .createAsync(RankingComponent).then(fixture => {
                let rankingComponent:RankingComponent = fixture.componentInstance,
                    element:any = fixture.nativeElement;
                rankingComponent.rankedLords = [];
                rankingComponent.game = game;
                fixture.detectChanges();
                var elementNames:NodeListOf<Element> = element.querySelectorAll('.element-name');
                var elementTreasures:NodeListOf<Element> = element.querySelectorAll('.treasure');
                var elementActionPoints:NodeListOf<Element> = element.querySelectorAll('.action-points');
                expect(elementNames.item(0).innerHTML).toEqual('Clyde');
                expect(elementNames.item(1).innerHTML).toEqual('Bonnie');
                expect(elementTreasures.item(0).innerHTML).toEqual('1 $');
                expect(elementTreasures.item(1).innerHTML).toEqual('0 $');
                expect(elementActionPoints.item(0).innerHTML).toEqual('8 AP');
                expect(elementActionPoints.item(1).innerHTML).toEqual('9 AP');
                done();
            })
            .catch(e => done.fail(e));
    });
});

@Directive({
    selector: '[display-domain]'
})
class MockDisplayDomainDirective {
    @Input('display-domain')
    public domain:Plot[];
    @Input()
    public game:Game;
}