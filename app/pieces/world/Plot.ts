import {PlotKind} from './PlotKind';
import {Coordinates} from './Coordinates';

export class Plot {

    private _kind:PlotKind;
    private _coordinates:Coordinates;

    public constructor(kind:PlotKind, coordinates:Coordinates) {
        this._kind = kind;
        this._coordinates = coordinates;
    }

    public get constructible():boolean {
        return this.kind.constructible;
    }

    public get kind():PlotKind {
        return this._kind;
    }

    public set kind(value:PlotKind) {
        this._kind = value;
    }

    public get coordinates():Coordinates {
        return this._coordinates;
    }
}
