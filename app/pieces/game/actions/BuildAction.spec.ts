import {Plot} from '../../world/Plot';
import {PlotKind} from '../../world/PlotKind';
import {Coordinates} from '../../world/Coordinates';
import {ActionPoints} from '../ActionPoints';
import {BuildAction} from './BuildAction';
import {Lord} from '../Lord';
import {Region} from '../../world/Region';

describe('BuildAction', () => {

    var buildAction:BuildAction;
    var builder:Lord;

    var plot:Plot;
    var region:Region;

    var startActionPoints:ActionPoints = new ActionPoints(10);
    var actual:ActionPoints;

    var buildPlots:any = (dimension:number):Plot[][] => {
        var plots:Plot[][] = [];
        for (let i:number = 0; i < dimension; i++) {
            plots.push([]);
            for (let j:number = 0; j < dimension; j++) {
                plots[i].push(new Plot(PlotKind.PLAIN, new Coordinates(i, j)));
            }
        }
        return plots;
    };

    beforeEach(() => {
        builder = new Lord();
        builder.name = 'test';
        builder.domain = [];
        region = new Region(buildPlots(5));
        plot = region.plotAt(new Coordinates(2, 2));
    });

    describe('run', () => {

        describe('build castle', () => {

            beforeEach(() => {
                buildAction = new BuildAction(builder, plot, region);
                actual = buildAction.run(startActionPoints);
            });

            it('should return 2 Action Points', () => {
                expect(actual).toEqual(new ActionPoints(2));
            });

            it('should build castle', () => {
                expect(plot.kind).toEqual(PlotKind.CASTLE);
            });

            it('build should throw "debt" error', () => {
                plot.kind = PlotKind.PLAIN;
                expect(() => buildAction.run(new ActionPoints(1))).toThrowError('Unsufficient Action Points: 1');
            });

            it('build should throw "already castle" error', () => {
                plot.kind = PlotKind.CASTLE;
                expect(() => buildAction.run(new ActionPoints(1))).toThrowError('Plot already has a castle');
            });

            it('build should throw "not buildable" error', () => {
                plot.kind = PlotKind.FOREST;
                expect(() => buildAction.run(new ActionPoints(1))).toThrowError('Cannot build a castle on a Forest plot');
            });

            it('build should throw "too close" error', () => {
                plot.kind = PlotKind.PLAIN;
                region.plotAt(new Coordinates(3, 3)).kind = PlotKind.CASTLE;
                expect(() => buildAction.run(new ActionPoints(1))).toThrowError('Too close to another castle!');
            });

            it('build should throw "too close" error when dest is close to map borders', () => {
                buildAction = new BuildAction(builder, region.plotAt(new Coordinates(0, 0)), region);
                region.plotAt(new Coordinates(0, 1)).kind = PlotKind.CASTLE;
                expect(() => buildAction.run(new ActionPoints(1))).toThrowError('Too close to another castle!');
            });

            it('build should not throw "too close" error', () => {
                plot.kind = PlotKind.PLAIN;
                expect(() => buildAction.run(new ActionPoints(10))).not.toThrowError('Too close to another castle!');
            });

            it('dry run on plain should return 8', () => {
                plot.kind = PlotKind.PLAIN;
                expect(buildAction.dryRun()).toEqual(new ActionPoints(8));
            });

            it('dry run should not build castle', () => {
                plot.kind = PlotKind.PLAIN;
                buildAction.dryRun();
                expect(plot.kind).toEqual(PlotKind.PLAIN);
            });

        });

    });

});