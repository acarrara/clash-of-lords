import {FarmAction} from './FarmAction';
import {Plot} from '../../world/Plot';
import {PlotKind} from '../../world/PlotKind';
import {ActionPoints} from '../ActionPoints';

describe('FarmAction', () => {

    var domain:Plot[];
    var farmAction:FarmAction;
    var castlePlot:Plot = new Plot(PlotKind.CASTLE, null);
    var plainPlot:Plot = new Plot(PlotKind.PLAIN, null);
    var forestPlot:Plot = new Plot(PlotKind.FOREST, null);
    var mountainPlot:Plot = new Plot(PlotKind.MOUNTAIN, null);

    var startActionPoints:ActionPoints = new ActionPoints(5);

    beforeEach(() => {
        domain = [];
        farmAction = new FarmAction(domain);
    });

    describe('run', () => {

        it('should return 5 Action Points when domain is empty', () => {
            expect(farmAction.run(startActionPoints)).toEqual(new ActionPoints(5));
        });

        it('should return 5 Action Points when domain has 1 castle', () => {
            domain.push(castlePlot);
            expect(farmAction.run(startActionPoints)).toEqual(new ActionPoints(5));
        });

        it('should return 6 Action Points when domain has 1 castle and 2 plains', () => {
            domain.push(castlePlot);
            domain.push(plainPlot);
            domain.push(plainPlot);
            expect(farmAction.run(startActionPoints)).toEqual(new ActionPoints(6));
        });

        it('should return 6 Action Points when domain has 2 castle, 2 plains, 4 forests and 2 mountains', () => {
            domain.push(castlePlot);
            domain.push(castlePlot);
            domain.push(plainPlot);
            domain.push(plainPlot);
            domain.push(forestPlot);
            domain.push(forestPlot);
            domain.push(forestPlot);
            domain.push(forestPlot);
            domain.push(mountainPlot);
            domain.push(mountainPlot);
            expect(farmAction.run(startActionPoints)).toEqual(new ActionPoints(8));
        });

    });

});