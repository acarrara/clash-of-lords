import {beforeEach, beforeEachProviders, describe, inject, TestComponentBuilder} from 'angular2/testing';
import {NextTurnComponent} from './next-turn.component';
import {provide} from 'angular2/core';
import {GameService} from '../services/game.service';

describe('NextTurnComponent: component', () => {
    let tcb:TestComponentBuilder;

    let gameService:GameService = new GameService(null, null);

    beforeEachProviders(() => [
        TestComponentBuilder,
        NextTurnComponent,
        provide(GameService, {useValue: gameService})
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
        spyOn(gameService, 'nextTurn');
    }));

    it('should order Bonnie and Clyde on treasure size', done => {
        tcb.createAsync(NextTurnComponent).then(fixture => {
                // let nextTurnComponent:NextTurnComponent = fixture.componentInstance,
                let element:any = fixture.nativeElement;
                element.querySelector('.nextturn').dispatchEvent(new Event('click'));
                fixture.detectChanges();
                expect(gameService.nextTurn).toHaveBeenCalled();
                done();
            })
            .catch(e => done.fail(e));
    });
});