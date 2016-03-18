import {Region} from '../../../scripts/pieces/world/Region';
import {Plot} from '../../../scripts/pieces/world/Plot';
import {PlotKind} from '../../../scripts/pieces/world/PlotKind';
import {Coordinates} from '../../../scripts/pieces/world/Coordinates';

describe('Region', () => {

    var region:Region;

    beforeEach(() => {
        var plots:Plot[][] = [
            [new Plot(PlotKind.PLAIN, new Coordinates(0, 0)), new Plot(PlotKind.WATER, new Coordinates(0, 1)), new Plot(PlotKind.PLAIN, new Coordinates(0, 2)), new Plot(PlotKind.PLAIN, new Coordinates(0, 3))],
            [new Plot(PlotKind.PLAIN, new Coordinates(1, 0)), new Plot(PlotKind.PLAIN, new Coordinates(1, 1)), new Plot(PlotKind.PLAIN, new Coordinates(1, 2)), new Plot(PlotKind.PLAIN, new Coordinates(1, 3))],
            [new Plot(PlotKind.PLAIN, new Coordinates(2, 0)), new Plot(PlotKind.MOUNTAIN, new Coordinates(2, 1)), new Plot(PlotKind.MOUNTAIN, new Coordinates(2, 2)), new Plot(PlotKind.MOUNTAIN, new Coordinates(2, 3))],
            [new Plot(PlotKind.PLAIN, new Coordinates(3, 0)), new Plot(PlotKind.MOUNTAIN, new Coordinates(3, 1)), new Plot(PlotKind.MOUNTAIN, new Coordinates(3, 2)), new Plot(PlotKind.PLAIN, new Coordinates(3, 3))]
        ];
        region = new Region(plots);
    });

    describe('path() method', () => {

        it('should return self', () => {

            var startingCoordinates:Coordinates = new Coordinates(1, 0);
            var startPoint:Plot = region.plotAt(startingCoordinates);
            var actualPath:Array<Plot> = region.path(startPoint, startPoint);

            var expectedPath:Array<Plot> = [];
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 0)));

            expect(JSON.stringify(actualPath)).toEqual(JSON.stringify(expectedPath));
        });

        it('should return empty path when plot not constructible', () => {

            var startingCoordinates:Coordinates = new Coordinates(2, 1);
            var startPoint:Plot = region.plotAt(startingCoordinates);
            var actualPath:Array<Plot> = region.path(startPoint, startPoint);

            var expectedPath:Array<Plot> = [];

            expect(JSON.stringify(actualPath)).toEqual(JSON.stringify(expectedPath));
        });

        it('should return path when direction is left', () => {

            var startingCoordinates:Coordinates = new Coordinates(1, 0);
            var endingCoordinates:Coordinates = new Coordinates(1, 2);
            var startPoint:Plot = region.plotAt(startingCoordinates);
            var endPoint:Plot = region.plotAt(endingCoordinates);
            var actualPath:Array<Plot> = region.path(startPoint, endPoint);

            var expectedPath:Array<Plot> = [];
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 0)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 1)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 2)));

            expect(JSON.stringify(actualPath)).toEqual(JSON.stringify(expectedPath));
        });

        it('should return path when direction is right', () => {

            var startingCoordinates:Coordinates = new Coordinates(1, 2);
            var endingCoordinates:Coordinates = new Coordinates(1, 0);
            var startPoint:Plot = region.plotAt(startingCoordinates);
            var endPoint:Plot = region.plotAt(endingCoordinates);
            var actualPath:Array<Plot> = region.path(startPoint, endPoint);

            var expectedPath:Array<Plot> = [];
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 2)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 1)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 0)));

            expect(JSON.stringify(actualPath)).toEqual(JSON.stringify(expectedPath));
        });

        it('should return path when direction is north', () => {

            var startingCoordinates:Coordinates = new Coordinates(2, 0);
            var endingCoordinates:Coordinates = new Coordinates(0, 0);
            var startPoint:Plot = region.plotAt(startingCoordinates);
            var endPoint:Plot = region.plotAt(endingCoordinates);
            var actualPath:Array<Plot> = region.path(startPoint, endPoint);

            var expectedPath:Array<Plot> = [];
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(2, 0)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 0)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(0, 0)));

            expect(JSON.stringify(actualPath)).toEqual(JSON.stringify(expectedPath));
        });

        it('should return path when direction is south', () => {

            var startingCoordinates:Coordinates = new Coordinates(0, 0);
            var endingCoordinates:Coordinates = new Coordinates(2, 0);
            var startPoint:Plot = region.plotAt(startingCoordinates);
            var endPoint:Plot = region.plotAt(endingCoordinates);
            var actualPath:Array<Plot> = region.path(startPoint, endPoint);

            var expectedPath:Array<Plot> = [];
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(0, 0)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 0)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(2, 0)));

            expect(JSON.stringify(actualPath)).toEqual(JSON.stringify(expectedPath));
        });

        it('should return path when direction is north east', () => {

            var startingCoordinates:Coordinates = new Coordinates(2, 0);
            var endingCoordinates:Coordinates = new Coordinates(1, 2);
            var startPoint:Plot = region.plotAt(startingCoordinates);
            var endPoint:Plot = region.plotAt(endingCoordinates);
            var actualPath:Array<Plot> = region.path(startPoint, endPoint);

            var expectedPath:Array<Plot> = [];
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(2, 0)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 0)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 1)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 2)));

            expect(JSON.stringify(actualPath)).toEqual(JSON.stringify(expectedPath));
        });

        it('should return path when direction is south west', () => {

            var startingCoordinates:Coordinates = new Coordinates(0, 2);
            var endingCoordinates:Coordinates = new Coordinates(1, 0);
            var startPoint:Plot = region.plotAt(startingCoordinates);
            var endPoint:Plot = region.plotAt(endingCoordinates);
            var actualPath:Array<Plot> = region.path(startPoint, endPoint);

            var expectedPath:Array<Plot> = [];
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(0, 2)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 2)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 1)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 0)));

            expect(JSON.stringify(actualPath)).toEqual(JSON.stringify(expectedPath));
        });

        it('should return path when water obstacle', () => {

            var startingCoordinates:Coordinates = new Coordinates(0, 0);
            var endingCoordinates:Coordinates = new Coordinates(0, 2);
            var startPoint:Plot = region.plotAt(startingCoordinates);
            var endPoint:Plot = region.plotAt(endingCoordinates);
            var actualPath:Array<Plot> = region.path(startPoint, endPoint);

            var expectedPath:Array<Plot> = [];
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(0, 0)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 0)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 1)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 2)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(0, 2)));

            expect(JSON.stringify(actualPath)).toEqual(JSON.stringify(expectedPath));
        });

        it('should return path when direction is south west with obstacles', () => {

            var startingCoordinates:Coordinates = new Coordinates(1, 1);
            var endingCoordinates:Coordinates = new Coordinates(2, 0);
            var startPoint:Plot = region.plotAt(startingCoordinates);
            var endPoint:Plot = region.plotAt(endingCoordinates);
            var actualPath:Array<Plot> = region.path(startPoint, endPoint);

            var expectedPath:Array<Plot> = [];
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 1)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(1, 0)));
            expectedPath.push(new Plot(PlotKind.PLAIN, new Coordinates(2, 0)));

            expect(JSON.stringify(actualPath)).toEqual(JSON.stringify(expectedPath));
        });

        it('should return emtpy path when start plot is not constructible', () => {

            var startingCoordinates:Coordinates = new Coordinates(0, 1);
            var endingCoordinates:Coordinates = new Coordinates(0, 2);
            var startPoint:Plot = region.plotAt(startingCoordinates);
            var endPoint:Plot = region.plotAt(endingCoordinates);
            var actualPath:Array<Plot> = region.path(startPoint, endPoint);

            var expectedPath:Array<Plot> = [];

            expect(JSON.stringify(actualPath)).toEqual(JSON.stringify(expectedPath));
        });

        it('should return emtpy path when end plot is not constructible', () => {

            var startingCoordinates:Coordinates = new Coordinates(1, 1);
            var endingCoordinates:Coordinates = new Coordinates(2, 2);
            var startPoint:Plot = region.plotAt(startingCoordinates);
            var endPoint:Plot = region.plotAt(endingCoordinates);
            var actualPath:Array<Plot> = region.path(startPoint, endPoint);

            var expectedPath:Array<Plot> = [];

            expect(JSON.stringify(actualPath)).toEqual(JSON.stringify(expectedPath));
        });

        it('should return emtpy path when path is impossible', () => {

            var startingCoordinates:Coordinates = new Coordinates(0, 0);
            var endingCoordinates:Coordinates = new Coordinates(3, 3);
            var startPoint:Plot = region.plotAt(startingCoordinates);
            var endPoint:Plot = region.plotAt(endingCoordinates);
            var actualPath:Array<Plot> = region.path(startPoint, endPoint);

            var expectedPath:Array<Plot> = [];

            expect(JSON.stringify(actualPath)).toEqual(JSON.stringify(expectedPath));
        });
    });
});