import {Region} from './Region';
import {Plot} from './Plot';
import {PlotKind} from './PlotKind';
import {Coordinates} from './Coordinates';
import {Objects} from "../commons/Objects";

export class RegionFactory {

    private _plots:Plot[][];
    private _grassOn:boolean = false;

    private _kinds:PlotKind[] = [
        PlotKind.FOREST,
        PlotKind.GRASS,
        PlotKind.MOUNTAIN,
        PlotKind.WATER
    ]

    public create(dimension:number):Region {
        this._plots = [];
        for (let i:number = 0; i < dimension; i++) {
            this._plots.push([]);
            for (let j:number = 0; j < dimension; j++) {
                var seed:number = Math.floor(Math.random() * 8);
                var kind:PlotKind = this.getKind(i, j, seed);
                this._plots[i].push(new Plot(kind, new Coordinates(i, j)));
            }
        }
        console.log('created');
        return new Region(this._plots);
    }

    private getKind(i:number, j:number, seed:number):PlotKind {
        var candidatePlot:Plot;
        if (seed <= 2) {
            var x:number = i - 1;
            var y:number = j - 1 + seed;
            if (Objects.isDefined(this._plots[x])) {
                candidatePlot = this._plots[x][y];
            }
        } else if (seed === 3) {
            var x:number = i;
            var y:number = j - 1;
            candidatePlot = this._plots[x][y];
        }
        if (Objects.isDefined(candidatePlot)) {
            return candidatePlot.kind;
        } else {
            return this.randomKind(seed);
        }
    }

    private randomKind(seed:number):PlotKind {
        var index:number = seed % this._kinds.length;
        console.log(seed, index);
        this._grassOn = !this._grassOn;
        return this._grassOn === true ? PlotKind.GRASS : this._kinds[index];
    }

    public fromJson(json:string):Region {
        console.log(json);
        var jsonObject:Object[][] = JSON.parse(json);
        var plots:Plot[][] = [];
        for (let i:number = 0; i < jsonObject.length; i++) {
                plots.push([]);
            for (let j:number = 0; j < jsonObject[0].length; j++) {
                var type:string = jsonObject[i][j].toString();
                var kind:PlotKind = PlotKind.fromName(type);
                plots[i].push(new Plot(kind,  new Coordinates(i, j)));
            }
        }
        return new Region(plots);
    }
}