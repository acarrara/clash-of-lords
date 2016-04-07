import {DisplayDomainDirective} from './display-domain.directive';
import {TestComponentBuilder, it, beforeEach, beforeEachProviders, inject} from 'angular2/testing';
import {Component, provide} from 'angular2/core';
import {Plot} from '../pieces/world/Plot';
import {GameService} from '../services/game.service';

describe('DisplayDomainDirective: directive', () => {
    let tcb:TestComponentBuilder;

    let gameService:GameService = new GameService(null, null);

    beforeEachProviders(() => [
        TestComponentBuilder,
        DisplayDomainDirective,
        TestContainer,
        provide(GameService, {useValue: gameService})
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should change domain on mouse enter', done => {
        tcb.createAsync(TestContainer).then(fixture => {
                let testContainer:TestContainer = fixture.componentInstance,
                    element:any                 = fixture.nativeElement;
                gameService.displayed = undefined;
                fixture.detectChanges();
                element.querySelector('.test-picker').dispatchEvent(new Event('mouseenter'));
                fixture.detectChanges();
                expect(gameService.displayed).toBe(testContainer.domain);
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should reset domain on mouse leave', done => {
        tcb.createAsync(TestContainer).then(fixture => {
                let element:any = fixture.nativeElement;
                gameService.displayed = [];
                fixture.detectChanges();
                element.querySelector('.test-picker').dispatchEvent(new Event('mouseleave'));
                fixture.detectChanges();
                expect(gameService.displayed).toBeUndefined();
                done();
            })
            .catch(e => done.fail(e));
    });

});

@Component({
    selector: 'test',
    template: `<div class="test-picker" [display-domain]="domain">asd</div>`,
    directives: [DisplayDomainDirective]
})
class TestContainer {
    public domain:Plot[] = [];

    constructor() {
        this.domain = [];
    }
}