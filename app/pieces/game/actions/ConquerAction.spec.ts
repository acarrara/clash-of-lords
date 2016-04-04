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

    var plainPlot:Plot;
    var castlePlot:Plot;
    var forestPlot:Plot;
    var mountainPlot:Plot;

    var startActionPoints:ActionPoints = new ActionPoints(15);
    var actual:ActionPoints;

    beforeEach(() => {
        conqueror = new Lord();
        conqueror.name = 'conqueror';
        conqueror.domain = [];

        conquered = new Lord();
        conquered.name = 'conquered';

        politics = new Politics();

        politics.domainMap = [
            [conquered, conquered],
            [conquered, conquered]
        ];

        plainPlot = new Plot(PlotKind.PLAIN, new Coordinates(0, 0));
        castlePlot = new Plot(PlotKind.CASTLE, new Coordinates(1, 0));
        forestPlot = new Plot(PlotKind.FOREST, new Coordinates(0, 1));
        mountainPlot = new Plot(PlotKind.MOUNTAIN, new Coordinates(1, 1));
    });

    describe('run', () => {

        describe('conquer plain', () => {

            beforeEach(() => {
                politics.domainMap[0][1] = conqueror;
                conqueror.domain = [forestPlot];
                conquered.domain = [plainPlot, castlePlot, mountainPlot];
                forestPlot.kind = PlotKind.CASTLE;
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
                expect(conqueror.domain).toEqual([forestPlot, plainPlot]);
            });

            it('should remove plot from the conquered domain', () => {
                expect(conquered.domain).toEqual([castlePlot, mountainPlot]);
            });

        });

        describe('conquer forest', () => {

            beforeEach(() => {
                conqueror.domain = [mountainPlot];
                conquered.domain = [plainPlot, castlePlot, forestPlot];
                mountainPlot.kind = PlotKind.CASTLE;
                politics.domainMap[1][1] = conqueror;
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
                expect(conqueror.domain).toEqual([mountainPlot, forestPlot]);
            });

            it('should remove plot from the conquered domain', () => {
                expect(conquered.domain).toEqual([plainPlot, castlePlot]);
            });

        });

        describe('conquer mountain', () => {

            beforeEach(() => {
                politics.domainMap[0][1] = conqueror;
                conqueror.domain = [forestPlot];
                conquered.domain = [plainPlot, castlePlot, mountainPlot];
                forestPlot.kind = PlotKind.CASTLE;
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
                expect(conqueror.domain).toEqual([forestPlot, mountainPlot]);
            });

            it('should remove plot from the conquered domain', () => {
                expect(conquered.domain).toEqual([plainPlot, castlePlot]);
            });

            it('dry run should return 9', () => {
                expect(conquerAction.dryRun()).toEqual(new ActionPoints(9));
            });

        });

        describe('conquer plain when fortified', () => {

            beforeEach(() => {
                politics.domainMap[0][1] = conqueror;
                conqueror.domain = [forestPlot];
                conquered.domain = [plainPlot, castlePlot, mountainPlot];
                forestPlot.kind = PlotKind.CASTLE;
                plainPlot.fortified = true;
                conquerAction = new ConquerAction(conqueror, plainPlot, politics);
                actual = conquerAction.run(startActionPoints);
            });

            it('should return 9 Action Points', () => {
                expect(actual).toEqual(new ActionPoints(9));
            });

            it('should change politics with new lord in plot', () => {
                expect(politics.lordAt(new Coordinates(0, 0))).toEqual(conqueror);
            });

            it('should add plot to the lord domain', () => {
                expect(conqueror.domain).toEqual([forestPlot, plainPlot]);
            });

            it('should remove plot from the conquered domain', () => {
                expect(conquered.domain).toEqual([castlePlot, mountainPlot]);
            });

            it('should remove fortification from the conquered plot', () => {
                expect(plainPlot.fortified).toEqual(false);
            });

        });

        it('conquer should throw "debt" error', () => {
            conquerAction = new ConquerAction(conqueror, mountainPlot, politics);
            expect(() => conquerAction.run(new ActionPoints(2))).toThrowError('Unsufficient Action Points: 2');
        });

        describe('conquer castle', () => {

            beforeEach(() => {
                conqueror.domain = [mountainPlot];
                conquered.domain = [plainPlot, castlePlot, forestPlot];
                mountainPlot.kind = PlotKind.CASTLE;
                politics.domainMap[1][1] = conqueror;
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
                expect(conqueror.domain).toEqual([mountainPlot, castlePlot]);
            });

            it('should remove plot from the conquered domain', () => {
                expect(conquered.domain).toEqual([plainPlot, forestPlot]);
            });
        });

    });

});