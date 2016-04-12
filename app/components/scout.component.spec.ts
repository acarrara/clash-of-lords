import {beforeEach, beforeEachProviders, describe, expect, inject, TestComponentBuilder} from 'angular2/testing';
import {ScoutComponent} from './scout.component';
import {ActionPoints} from '../pieces/game/ActionPoints';
import {Game} from '../pieces/game/Game';
import {createGame} from '../mock-game';

describe('ScoutComponent: component', () => {
    let tcb:TestComponentBuilder;
    var game:Game = createGame();

    beforeEachProviders(() => [
        TestComponentBuilder,
        ScoutComponent
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should fill header with plot info', done => {
        tcb.createAsync(ScoutComponent).then(fixture => {
                let scoutComponent:ScoutComponent = fixture.componentInstance,
                    element:any = fixture.nativeElement;
                scoutComponent.game = game;
                game.lord.actionPoints = new ActionPoints(9);
                fixture.detectChanges();
                expect(element.querySelector('.scout-position').innerHTML).toContain('(0, 0)');
                expect(element.querySelector('.scout-report').innerHTML).toContain('Plain');
                expect(element.querySelector('.scout-spy').innerHTML).toContain('Uncolonized');
                expect(element.querySelector('.scout-advice').innerHTML).toContain('Conquer');
                expect(element.querySelector('.scout-guess').innerHTML).toContain('3 AP');
                expect(element.querySelector('.scout-guess')).not.toHaveCssClass('unsufficient');
                done();
            })
            .catch(e => done.fail(e));
    });

    it('should fill header with plot info and settler name', done => {
        tcb.createAsync(ScoutComponent).then(fixture => {
                let scoutComponent:ScoutComponent = fixture.componentInstance,
                    element:any = fixture.nativeElement;
                scoutComponent.game = game;
                game.politics.domainMap[0][0] = game.lord;
                game.lord.actionPoints = new ActionPoints(2);
                fixture.detectChanges();
                expect(element.querySelector('.scout-position').innerHTML).toContain('(0, 0)');
                expect(element.querySelector('.scout-report').innerHTML).toContain('Plain');
                expect(element.querySelector('.scout-spy').innerHTML).toContain('Bonnie');
                expect(element.querySelector('.scout-advice').innerHTML).toContain('Conquer');
                expect(element.querySelector('.scout-guess').innerHTML).toContain('3 AP');
                expect(element.querySelector('.scout-guess')).toHaveCssClass('unsufficient');
                done();
            })
            .catch(e => done.fail(e));
    });
});