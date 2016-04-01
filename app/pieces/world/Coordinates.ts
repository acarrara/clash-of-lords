import {Objects} from '../commons/Objects';

export class Coordinates {
    private _x:number;
    private _y:number;

    private _xDimension:number;
    private _yDimension:number;

    public constructor(x:number, y:number) {
        this._x = x;
        this._y = y;
        this._xDimension = undefined;
        this._yDimension = undefined;
    }

    public get x():number {
        return this._x;
    }

    public get y():number {
        return this._y;
    }

    public neighbours(xDimension:number, yDimension:number):Array<Coordinates> {
        var neighbours:Array<Coordinates> = [];
        this._xDimension = xDimension;
        this._yDimension = yDimension;

        this.pushNeighbour(this.westNeighbour(), neighbours);
        this.pushNeighbour(this.eastNeighbour(), neighbours);
        this.pushNeighbour(this.southNeighbour(), neighbours);
        this.pushNeighbour(this.northNeighbour(), neighbours);

        this._xDimension = undefined;
        this._yDimension = undefined;

        return neighbours;
    }

    public left():Coordinates {
        return new Coordinates(this._x, this._y - 1);
    }

    public right():Coordinates {
        return new Coordinates(this._x, this._y + 1);
    }

    public top():Coordinates {
        return new Coordinates(this._x - 1, this._y);
    }

    public bottom():Coordinates {
        return new Coordinates(this._x + 1, this._y);
    }

    private pushNeighbour(neighbour:Coordinates, neighbours:Array<Coordinates>):void {
        if (Objects.isDefined(neighbour)) {
            neighbours.push(neighbour);
        }
    };

    private insideBorders(x:number, y:number):boolean {
        return x >= 0 && x < this._xDimension && y >= 0 && y < this._yDimension;
    }

    private westNeighbour():Coordinates {
        return this.insideBorders(this._x, this._y - 1) ? this.left() : undefined;
    }

    private eastNeighbour():Coordinates {
        return this.insideBorders(this._x, this._y + 1) ? this.right() : undefined;
    }

    private northNeighbour():Coordinates {
        return this.insideBorders(this._x - 1, this._y) ? this.top() : undefined;
    }

    private southNeighbour():Coordinates {
        return this.insideBorders(this._x + 1, this._y) ? this.bottom() : undefined;
    }
}