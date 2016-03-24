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

    var plainPlot:Plot = new Plot(PlotKind.PLAIN, new Coordinates(0, 0));
    var castlePlot:Plot = new Plot(PlotKind.CASTLE, new Coordinates(1, 0));
    var forestPlot:Plot = new Plot(PlotKind.FOREST, new Coordinates(0, 1));
    var mountainPlot:Plot = new Plot(PlotKind.MOUNTAIN, new Coordinates(1, 1));

    var startActionPoints:ActionPoints = new ActionPoints(5);
    var actual:ActionPoints;

    beforeEach(() => {
        colonizer = {
            name: 'test',
            domain: [],
            actionPoints: new ActionPoints(0)
        };
        politics = new Politics();
        politics.domainMap = [[], []];
    });

    describe('run', () => {

        describe('colonize plain', () => {

            beforeEach(() => {
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
                expect(colonizer.domain).toEqual([plainPlot]);
            });

        });

        describe('colonize forest', () => {

            beforeEach(() => {
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
                expect(colonizer.domain).toEqual([forestPlot]);
            });

        });

        describe('colonize mountain', () => {

            beforeEach(() => {
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
                expect(colonizer.domain).toEqual([mountainPlot]);
            });

        });

        it('colonize should throw "debt" error', () => {
            colonizeAction = new ColonizeAction(colonizer, mountainPlot, politics);
            expect(() => colonizeAction.run(new ActionPoints(2))).toThrowError('Unsufficient Action Points: 2');
        });

        describe('colonize castle', () => {

            beforeEach(() => {
                colonizeAction = new ColonizeAction(colonizer, castlePlot, politics);
            });

            it('should throw "uncolonizable" error', () => {
                expect(() => colonizeAction.run(startActionPoints)).toThrowError('Cannot colonize a plot with kind c');
            });
        });

    });

});