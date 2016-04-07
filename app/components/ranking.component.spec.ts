import {beforeEach, beforeEachProviders, describe, inject, TestComponentBuilder} from 'angular2/testing';
import {RankingComponent} from './ranking.component';
import {Lord} from '../pieces/game/Lord';
import {ActionPoints} from '../pieces/game/ActionPoints';
import {DisplayDomainDirective} from '../attribute-directives/display-domain.directive';
import {Directive, Input, provide} from 'angular2/core';
import {Plot} from '../pieces/world/Plot';
import {GameService} from '../services/game.service';

describe('RankingComponent: component', () => {
    let tcb:TestComponentBuilder;
    let gameService:GameService = new GameService(null, null);

    beforeEachProviders(() => [
        TestComponentBuilder,
        RankingComponent,
        provide(GameService, {useValue: gameService})
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    var buildLords:any = ():Array<Lord> => {
        let lord0:Lord = new Lord();
        lord0.name = 'Bonnie';
        lord0.treasure = 0;
        lord0.potential = new ActionPoints(9);
        let lord1:Lord = new Lord();
        lord1.name = 'Clyde';
        lord1.treasure = 1;
        lord1.potential = new ActionPoints(8);
        return [lord0, lord1];
    };

    it('should order Bonnie and Clyde on treasure size', done => {
        tcb
            .overrideDirective(RankingComponent, DisplayDomainDirective, MockDisplayDomainDirective)
            .createAsync(RankingComponent).then(fixture => {
                let rankingComponent:RankingComponent = fixture.componentInstance,
                    element:any                       = fixture.nativeElement;
                rankingComponent.lords = buildLords();
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
                    element:any                       = fixture.nativeElement;
                rankingComponent.rankedLords = [];
                rankingComponent.lords = buildLords();
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
}