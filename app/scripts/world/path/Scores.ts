import {Coordinates} from '../Coordinates';

export class Scores {

    private static DEFAULT_MARK:number = -1;

    private x:number;
    private y:number;
    private scores:number[][];

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
        this.initScores();
    }

    public valueAt(coordinates:Coordinates):number {
        return this.scores[coordinates.x][coordinates.y];
    }

    public mark(coordinates:Coordinates, score:number):void {
        this.scores[coordinates.x][coordinates.y] = score;
    }

    public setChild(child:Coordinates, parent:Coordinates):void {
        this.scores[child.x][child.y] = this.scores[parent.x][parent.y] + 1;
    }

    public isMarked(coordinates:Coordinates):boolean {
        return this.scores[coordinates.x][coordinates.y] !== Scores.DEFAULT_MARK;
    }

    public pathCoordinates(startCoordinates:Coordinates, endCoordinates:Coordinates):Array<Coordinates> {
        var coordinates:Array<Coordinates> = new Array<Coordinates>();

        var currentCoordinates:Coordinates = endCoordinates;
        coordinates.push(currentCoordinates);

        while (JSON.stringify(currentCoordinates) !== JSON.stringify(startCoordinates)) {

            var neighbours:Array<Coordinates> = currentCoordinates.neighbours(this.scores.length, this.scores[0].length);
            for (var i:number = 0; i < neighbours.length; i++) {
                var currentNeighbour:Coordinates = neighbours[i];

                if (this.isParent(currentCoordinates, currentNeighbour)) {
                    coordinates.push(currentNeighbour);
                    currentCoordinates = currentNeighbour;
                    break;
                }
            }
        }
        return coordinates.reverse();
    }

    private isParent(child:Coordinates, candidateParent:Coordinates):boolean {
        return this.valueAt(candidateParent) === this.valueAt(child) - 1;
    }

    private initScores():void {
        this.scores = [];
        for (var i:number = 0; i < this.x; i++) {
            this.scores.push([]);
            for (var j:number = 0; j < this.y; j++) {
                this.scores[i].push(Scores.DEFAULT_MARK);
            }
        }
    }

}