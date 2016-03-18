import {Region} from './Region';
import {Plot} from './Plot';
import {PlotKind} from './PlotKind';
import {Coordinates} from './Coordinates';

export class RegionFactory {

    public fromJson(json:string):Region {
        var jsonObject:Object[][] = JSON.parse(json);
        var plots:Plot[][] = [];
        for (let i:number = 0; i < jsonObject.length; i++) {
            plots.push([]);
            for (let j:number = 0; j < jsonObject[0].length; j++) {
                var type:string = jsonObject[i][j].toString();
                var kind:PlotKind = PlotKind.fromName(type);
                plots[i].push(new Plot(kind, new Coordinates(i, j)));
            }
        }
        return new Region(plots);
    }
}