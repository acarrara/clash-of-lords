import {TestComponentBuilder, inject, beforeEachProviders, beforeEach} from 'angular2/testing';
import {Component} from 'angular2/core';
import {Lord} from '../pieces/game/Lord';
import {RegionBoardComponent} from './region-board.component';
import {Game} from '../pieces/game/Game';
import {TreasuryComponent} from './treasury.component';
import {HelpComponent} from './help.component';
import {ScoutComponent} from './scout.component';

@Component({
    selector: 'treasury',
    template: '',
    inputs: ['lord']
})
class TreasuryEmptyComponent {
    public lord:Lord;
}

@Component({
    selector: 'scout',
    template: '',
    inputs: ['game']
})
class ScoutEmptyComponent {
    public game:Game;
}

@Component({
    selector: 'region-board',
    template: '',
    inputs: ['game']
})
class RegionEmptyComponent {
    public game:Game;
}

describe('HelpComponent: component', () => {
    let tcb:TestComponentBuilder;

    beforeEachProviders(() => [
        TestComponentBuilder,
        HelpComponent
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should have game defined', done => {
        tcb
            .overrideDirective(HelpComponent, TreasuryComponent, TreasuryEmptyComponent)
            .overrideDirective(HelpComponent, ScoutComponent, ScoutEmptyComponent)
            .overrideDirective(HelpComponent, RegionBoardComponent, RegionEmptyComponent)
            .createAsync(HelpComponent).then(fixture => {
                let helpComponent:HelpComponent = fixture.componentInstance;
                fixture.detectChanges();
                expect(helpComponent.game).toBeDefined();
                done();
            })
            .catch(e => done.fail(e));
    });

});