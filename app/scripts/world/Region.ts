import {Coordinates} from './Coordinates';
import {Plot} from './Plot';
import {Scores} from './path/Scores';
import {Objects} from '../commons/Objects';

export class Region {

    private _plots:Plot[][];

    public constructor(plots:Plot[][]) {
        this._plots = plots;
    }

    public get plots():Plot[][] {
        return this._plots;
    }

    public plotAt(coordinates:Coordinates):Plot {
        var row:Plot[] = this._plots[coordinates.x];
        if (!Objects.isDefined(row)) {
            return undefined;
        }
        return row[coordinates.y];
    }

    public path(startPlot:Plot, endPlot:Plot):Array<Plot> {
        if (!startPlot.constructible || !endPlot.constructible) {
            return [];
        }
        if (startPlot === endPlot) {
            return [endPlot];
        }

        // Lee algorithm
        var scores:Scores = new Scores(this._plots.length, this._plots[0].length);
        var queue:Array<Coordinates> = new Array<Coordinates>();

        // init
        var startCoordinates:Coordinates = startPlot.coordinates;
        queue.push(startCoordinates);
        scores.mark(startCoordinates, 0);

        // waves
        while (queue.length !== 0) {
            var current:Coordinates = queue.shift();
            var neighbours:Array<Coordinates> = current.neighbours(this._plots.length, this._plots[0].length);
            for (let i:number = 0; i < neighbours.length; i++) {
                var currentNeighbour:Coordinates = neighbours[i];
                var eachPlot:Plot = this.plotAt(currentNeighbour);

                if (queue.indexOf(currentNeighbour) === -1 && eachPlot.constructible && !scores.isMarked(currentNeighbour)) {
                    scores.setChild(currentNeighbour, current);
                    queue.push(currentNeighbour);
                }
                // destination?
                if (eachPlot === endPlot) {
                    var coordinates:Array<Coordinates> = scores.pathCoordinates(startCoordinates, endPlot.coordinates);
                    var path:Array<Plot> = [];
                    for (let i:number = 0; i < coordinates.length; i++) {
                        var currentCoordinates:Coordinates = coordinates[i];
                        path.push(this.plotAt(currentCoordinates));
                    }
                    return path;
                }
            }
        }

        return [];
    }
}