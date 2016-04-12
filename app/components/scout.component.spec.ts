import {beforeEach, beforeEachProviders, describe, expect, inject, TestComponentBuilder} from 'angular2/testing';
import {ScoutComponent} from './scout.component';
import {GameService} from '../services/game.service';
import {provide} from 'angular2/core';
import {Plot} from '../pieces/world/Plot';
import {PlotKind} from '../pieces/world/PlotKind';
import {Coordinates} from '../pieces/world/Coordinates';
import {PoliticsFactory} from '../pieces/game/PoliticsFactory';
import {Lord} from '../pieces/game/Lord';
import {ActionPoints} from '../pieces/game/ActionPoints';
import {AvailableAction} from '../pieces/game/actions/AvailableAction';

describe('ScoutComponent: component', () => {
    let tcb:TestComponentBuilder;

    let gameService:GameService = new GameService(null, null);
    gameService.currentPlot = new Plot(PlotKind.PLAIN, new Coordinates(0, 0));
    gameService.availableAction = AvailableAction.CONQUER;
    let lord:Lord = new Lord();
    lord.name = 'Bonnie';
    lord.domain = [];
    gameService.politics = new PoliticsFactory().fromLords(4, [lord]);
    gameService.activeLord = lord;

    beforeEachProviders(() => [
        TestComponentBuilder,
        ScoutComponent,
        provide(GameService, {useValue: gameService})
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should fill header with plot info', done => {
        tcb.createAsync(ScoutComponent).then(fixture => {
                let element:any = fixture.nativeElement;
                lord.actionPoints = new ActionPoints(9);
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
                let element:any = fixture.nativeElement;
                gameService.politics.domainMap[0][0] = lord;
                lord.actionPoints = new ActionPoints(2);
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