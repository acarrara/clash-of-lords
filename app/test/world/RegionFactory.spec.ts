import {Region} from '../../scripts/world/Region';
import {Plot} from '../../scripts/world/Plot';
import {PlotKind} from '../../scripts/world/PlotKind';
import {Coordinates} from '../../scripts/world/Coordinates';
import {RegionFactory} from "../../scripts/world/RegionFactory";

describe('RegionFactory', () => {

    var region:Region;
    var regionFactory:RegionFactory;
    var sourceJson:string;

    beforeEach(() => {
        var plots:Plot[][] = [
            [new Plot(PlotKind.GRASS, new Coordinates(0, 0)), new Plot(PlotKind.WATER, new Coordinates(0, 1)), new Plot(PlotKind.GRASS, new Coordinates(0, 2)), new Plot(PlotKind.GRASS, new Coordinates(0, 3))],
            [new Plot(PlotKind.GRASS, new Coordinates(1, 0)), new Plot(PlotKind.GRASS, new Coordinates(1, 1)), new Plot(PlotKind.GRASS, new Coordinates(1, 2)), new Plot(PlotKind.GRASS, new Coordinates(1, 3))],
            [new Plot(PlotKind.GRASS, new Coordinates(2, 0)), new Plot(PlotKind.MOUNTAIN, new Coordinates(2, 1)), new Plot(PlotKind.MOUNTAIN, new Coordinates(2, 2)), new Plot(PlotKind.MOUNTAIN, new Coordinates(2, 3))],
            [new Plot(PlotKind.GRASS, new Coordinates(3, 0)), new Plot(PlotKind.MOUNTAIN, new Coordinates(3, 1)), new Plot(PlotKind.MOUNTAIN, new Coordinates(3, 2)), new Plot(PlotKind.GRASS, new Coordinates(3, 3))]
        ];
        region = new Region(plots);
        sourceJson = '[["g","w","g","g"],["g","g","g","g"],["g","m","m","m"],["g","m","m","g"]]';
        regionFactory = new RegionFactory();
    });

    describe('fromJson() method', () => {

        it('should parse a good string', () => {

            var actual:Region = regionFactory.fromJson(sourceJson);

            expect(JSON.stringify(actual)).toEqual(JSON.stringify(region));
        });
    });
});