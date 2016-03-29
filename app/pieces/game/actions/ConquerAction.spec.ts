import {Plot} from '../../world/Plot';
import {PlotKind} from '../../world/PlotKind';
import {Coordinates} from '../../world/Coordinates';
import {ActionPoints} from '../ActionPoints';
import {Politics} from '../Politics';
import {ConquerAction} from './ConquerAction';
import {Lord} from '../Lord';

describe('ConquerAction', () => {

    var politics:Politics;
    var conquerAction:ConquerAction;
    var conqueror:Lord;
    var conquered:Lord;

    var plainPlot:Plot = new Plot(PlotKind.PLAIN, new Coordinates(0, 0));
    var castlePlot:Plot = new Plot(PlotKind.CASTLE, new Coordinates(1, 0));
    var forestPlot:Plot = new Plot(PlotKind.FOREST, new Coordinates(0, 1));
    var mountainPlot:Plot = new Plot(PlotKind.MOUNTAIN, new Coordinates(1, 1));

    var startActionPoints:ActionPoints = new ActionPoints(15);
    var actual:ActionPoints;

    beforeEach(() => {
        conqueror = new Lord();
        conqueror.name = 'conqueror';
        conqueror.domain = [];

        conquered = new Lord();
        conquered.name = 'conquered';
        conquered.domain = [plainPlot, castlePlot, forestPlot, mountainPlot];

        politics = new Politics();

        politics.domainMap = [
            [conquered, conquered],
            [conquered, conquered]
        ];
    });

    describe('run', () => {

        describe('conquer plain', () => {

            beforeEach(() => {
                conquerAction = new ConquerAction(conqueror, plainPlot, politics);
                actual = conquerAction.run(startActionPoints);
            });

            it('should return 12 Action Points', () => {
                expect(actual).toEqual(new ActionPoints(12));
            });

            it('should change politics with new lord in plot', () => {
                expect(politics.lordAt(new Coordinates(0, 0))).toEqual(conqueror);
            });

            it('should add plot to the lord domain', () => {
                expect(conqueror.domain).toEqual([plainPlot]);
            });

            it('should remove plot from the conquered domain', () => {
                expect(conquered.domain).toEqual([castlePlot, forestPlot, mountainPlot]);
            });

        });

        describe('conquer forest', () => {

            beforeEach(() => {
                conquerAction = new ConquerAction(conqueror, forestPlot, politics);
                actual = conquerAction.run(startActionPoints);
            });

            it('should return 9 Action Points', () => {
                expect(actual).toEqual(new ActionPoints(9));
            });

            it('should change politics with new lord in plot', () => {
                expect(politics.lordAt(new Coordinates(0, 1))).toEqual(conqueror);
            });

            it('should add plot to the lord domain', () => {
                expect(conqueror.domain).toEqual([forestPlot]);
            });

            it('should remove plot from the conquered domain', () => {
                expect(conquered.domain).toEqual([plainPlot, castlePlot, mountainPlot]);
            });

        });

        describe('conquer mountain', () => {

            beforeEach(() => {
                conquerAction = new ConquerAction(conqueror, mountainPlot, politics);
                actual = conquerAction.run(startActionPoints);
            });

            it('should return 6 Action Points', () => {
                expect(actual).toEqual(new ActionPoints(6));
            });

            it('should change politics with new lord in plot', () => {
                expect(politics.lordAt(new Coordinates(1, 1))).toEqual(conqueror);
            });

            it('should add plot to the lord domain', () => {
                expect(conqueror.domain).toEqual([mountainPlot]);
            });

            it('should remove plot from the conquered domain', () => {
                expect(conquered.domain).toEqual([plainPlot, castlePlot, forestPlot]);
            });

        });

        it('conquer should throw "debt" error', () => {
            conquerAction = new ConquerAction(conqueror, mountainPlot, politics);
            expect(() => conquerAction.run(new ActionPoints(2))).toThrowError('Unsufficient Action Points: 2');
        });

        describe('conquer castle', () => {

            beforeEach(() => {
                conquerAction = new ConquerAction(conqueror, castlePlot, politics);
                actual = conquerAction.run(new ActionPoints(25));
            });

            it('should return 1 Action Points', () => {
                expect(actual).toEqual(new ActionPoints(1));
            });

            it('should change politics with new lord in plot', () => {
                expect(politics.lordAt(new Coordinates(1, 0))).toEqual(conqueror);
            });

            it('should add plot to the lord domain', () => {
                expect(conqueror.domain).toEqual([castlePlot]);
            });

            it('should remove plot from the conquered domain', () => {
                expect(conquered.domain).toEqual([plainPlot, forestPlot, mountainPlot]);
            });
        });

    });

});