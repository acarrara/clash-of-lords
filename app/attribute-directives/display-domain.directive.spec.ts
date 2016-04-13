import {DisplayDomainDirective} from './display-domain.directive';
import {TestComponentBuilder, it, beforeEach, beforeEachProviders, inject} from 'angular2/testing';
import {Component} from 'angular2/core';
import {createGame} from '../mock-game';
import {Game} from '../pieces/game/Game';
import {Plot} from '../pieces/world/Plot';

describe('DisplayDomainDirective: directive', () => {
    let tcb:TestComponentBuilder;
    let game:Game = createGame();

    beforeEachProviders(() => [
        TestComponentBuilder,
        DisplayDomainDirective,
        TestContainer
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should change domain on mouse enter', done => {
        tcb.createAsync(TestContainer).then(fixture => {
                let testContainer:TestContainer = fixture.componentInstance,
                    element:any = fixture.nativeElement;
                testContainer.game = game;
                game.displayed = undefined;
                fixture.detectChanges();
                element.querySelector('.test-picker').dispatchEvent(new Event('mouseenter'));
                fixture.detectChanges();
                expect(testContainer.game.displayed).toBe(game.displayed);
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should reset domain on mouse leave', done => {
        tcb.createAsync(TestContainer).then(fixture => {
                let testContainer:TestContainer = fixture.componentInstance,
                    element:any = fixture.nativeElement;
                testContainer.game = game;
                game.displayed = [];
                fixture.detectChanges();
                element.querySelector('.test-picker').dispatchEvent(new Event('mouseleave'));
                fixture.detectChanges();
                expect(game.displayed).toBe(game.lord.domain);
                done();
            })
            .catch(e => done.fail(e));
    });

});

@Component({
    selector: 'test',
    template: `<div class="test-picker" [display-domain]="domain" [game]="game">asd</div>`,
    directives: [DisplayDomainDirective]
})
class TestContainer {
    public game:Game;
    public domain:Plot[];

    constructor() {
        this.game = new Game();
        this.game.displayed = [];
        this.domain = this.game.displayed;
    }
}