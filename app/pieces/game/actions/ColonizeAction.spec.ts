import {Plot} from '../../world/Plot';
import {PlotKind} from '../../world/PlotKind';
import {Coordinates} from '../../world/Coordinates';
import {ActionPoints} from '../ActionPoints';
import {Politics} from '../Politics';
import {ColonizeAction} from './ColonizeAction';
import {Lord} from '../Lord';

describe('ColonizeAction', () => {

    var politics:Politics;
    var colonizeAction:ColonizeAction;
    var colonizer:Lord;

    var plainPlot:Plot;
    var castlePlot:Plot;
    var forestPlot:Plot;
    var mountainPlot:Plot;
    var waterPlot:Plot;

    var startActionPoints:ActionPoints = new ActionPoints(5);
    var actual:ActionPoints;

    beforeEach(() => {
        colonizer = new Lord();
        colonizer.name = 'test';
        colonizer.domain = [];

        politics = new Politics();
        politics.domainMap = [[], []];

        plainPlot = new Plot(PlotKind.PLAIN, new Coordinates(0, 0));
        castlePlot = new Plot(PlotKind.CASTLE, new Coordinates(1, 0));
        forestPlot = new Plot(PlotKind.FOREST, new Coordinates(0, 1));
        mountainPlot = new Plot(PlotKind.MOUNTAIN, new Coordinates(1, 1));
        waterPlot = new Plot(PlotKind.WATER, new Coordinates(0, 0));
    });

    describe('run', () => {

        describe('colonize plain', () => {

            beforeEach(() => {
                politics.domainMap[0][1] = colonizer;
                colonizer.domain.push(forestPlot);
                forestPlot.kind = PlotKind.CASTLE;
                colonizeAction = new ColonizeAction(colonizer, plainPlot, politics);
                actual = colonizeAction.run(startActionPoints);
            });

            it('should return 4 Action Points', () => {
                expect(actual).toEqual(new ActionPoints(4));
            });

            it('should change politics with new lord in plot', () => {
                expect(politics.lordAt(new Coordinates(0, 0))).toEqual(colonizer);
            });

            it('should add plot to the lord domain', () => {
                expect(colonizer.domain).toEqual([forestPlot, plainPlot]);
            });

            it('dry run should return 1', () => {
                actual = colonizeAction.dryRun();
                expect(actual).toEqual(new ActionPoints(1));
            });
        });

        describe('colonize forest', () => {

            beforeEach(() => {
                politics.domainMap[0][0] = colonizer;
                colonizer.domain.push(plainPlot);
                plainPlot.kind = PlotKind.CASTLE;
                colonizeAction = new ColonizeAction(colonizer, forestPlot, politics);
                actual = colonizeAction.run(startActionPoints);
            });

            it('should return 3 Action Points', () => {
                expect(actual).toEqual(new ActionPoints(3));
            });

            it('should change politics with new lord in plot', () => {
                expect(politics.lordAt(new Coordinates(0, 1))).toEqual(colonizer);
            });

            it('should add plot to the lord domain', () => {
                expect(colonizer.domain).toEqual([plainPlot, forestPlot]);
            });

            it('dry run should return 2', () => {
                actual = colonizeAction.dryRun();
                expect(actual).toEqual(new ActionPoints(2));
            });

            it('dry run should not colonize plot', () => {
                politics.domainMap[0][1] = undefined;
                actual = colonizeAction.dryRun();
                expect(politics.lordAt(new Coordinates(0, 1))).toBeUndefined();
            });

        });

        describe('colonize mountain', () => {

            beforeEach(() => {
                politics.domainMap[0][1] = colonizer;
                colonizer.domain.push(forestPlot);
                forestPlot.kind = PlotKind.CASTLE;
                colonizeAction = new ColonizeAction(colonizer, mountainPlot, politics);
                actual = colonizeAction.run(startActionPoints);
            });
            it('should return 2 Action Points', () => {
                expect(actual).toEqual(new ActionPoints(2));
            });

            it('should change politics with new lord in plot', () => {
                expect(politics.lordAt(new Coordinates(1, 1))).toEqual(colonizer);
            });

            it('should add plot to the lord domain', () => {
                expect(colonizer.domain).toEqual([forestPlot, mountainPlot]);
            });

            it('dry run should return 3', () => {
                actual = colonizeAction.dryRun();
                expect(actual).toEqual(new ActionPoints(3));
            });

        });
        it('colonize should throw "debt" error', () => {
            colonizeAction = new ColonizeAction(colonizer, mountainPlot, politics);
            expect(() => colonizeAction.run(new ActionPoints(2))).toThrowError('Unsufficient Action Points: 2');
        });

        describe('colonize castle', () => {

            it('should throw "uncolonizable" error', () => {
                politics.domainMap[0][1] = new Lord();
                colonizeAction = new ColonizeAction(colonizer, forestPlot, politics);
                expect(() => colonizeAction.run(startActionPoints)).toThrowError('Cannot colonize a plot already settled!');
            });
        });

        describe('colonize water', () => {

            it('should throw "uncolonizable" error', () => {
                colonizeAction = new ColonizeAction(colonizer, waterPlot, politics);
                expect(() => colonizeAction.run(startActionPoints)).toThrowError('Cannot colonize a plot with kind w');
            });

        });

    });

});