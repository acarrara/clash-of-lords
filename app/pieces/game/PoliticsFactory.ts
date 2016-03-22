import {Politics} from './Politics';
import {Lord} from './Lord';
import {Plot} from '../world/Plot';
import {Coordinates} from '../world/Coordinates';

export class PoliticsFactory {

    public fromLords(dimension:number, lords:Lord[]):Politics {
        var politics:Politics = new Politics();
        politics.setDimension(dimension);
        for (let i:number = 0; i < lords.length; i++) {
            var plots:Plot[] = lords[i].domain;
            for (let j:number = 0; j < plots.length; j++) {
                var coordinates:Coordinates = plots[j].coordinates;
                politics.domainMap[coordinates.x][coordinates.y] = lords[i];
            }
        }
        return politics;
    }

}