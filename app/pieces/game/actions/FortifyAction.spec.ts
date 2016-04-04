import {Plot} from '../../world/Plot';
import {PlotKind} from '../../world/PlotKind';
import {Coordinates} from '../../world/Coordinates';
import {ActionPoints} from '../ActionPoints';
import {FortifyAction} from './FortifyAction';
import {Lord} from '../Lord';

describe('FortifyAction', () => {

    var fortifyAction:FortifyAction;
    var fortifier:Lord;

    var plot:Plot;

    var startActionPoints:ActionPoints = new ActionPoints(5);
    var actual:ActionPoints;

    beforeEach(() => {
        fortifier = new Lord();
        fortifier.name = 'test';
        fortifier.domain = [];
        plot = new Plot(PlotKind.FOREST, new Coordinates(0, 0));
    });

    describe('run', () => {

        describe('fortify plot', () => {

            beforeEach(() => {
                fortifyAction = new FortifyAction(fortifier, plot);
                actual = fortifyAction.run(startActionPoints);
            });

            it('should return 3 Action Points', () => {
                expect(actual).toEqual(new ActionPoints(3));
            });

            it('should fortify plot', () => {
                expect(plot.fortified).toEqual(true);
            });

            it('conquer should throw "debt" error', () => {
                plot.fortified = false;
                expect(() => fortifyAction.run(new ActionPoints(1))).toThrowError('Unsufficient Action Points: 1');
            });

            it('conquer should throw "already fortified" error', () => {
                plot.fortified = true;
                expect(() => fortifyAction.run(new ActionPoints(1))).toThrowError('Cannot fortify an already fortified plot');
            });

            it('dry run on forest should return 2', () => {
                plot.fortified = false;
                expect(fortifyAction.dryRun()).toEqual(new ActionPoints(2));
            });

            it('dry run should return 16', () => {
                plot.kind = PlotKind.CASTLE;
                expect(fortifyAction.dryRun()).toEqual(new ActionPoints(16));
            });

            it('dry run should not fortify plot', () => {
                plot.fortified = false;
                fortifyAction.dryRun();
                expect(plot.fortified).toEqual(false);
            });

        });
    });

});