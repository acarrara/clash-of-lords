import {Lord} from './Lord';
import {Coordinates} from '../world/Coordinates';
import {Objects} from '../commons/Objects';

export class Politics {

    public domainMap:Lord[][];

    public setDimension(dimension:number):void {
        this.initDomainMap(dimension);
    }

    public lordAt(coordinates:Coordinates):Lord {
        var row:Lord[] = this.domainMap[coordinates.x];
        if (!Objects.isDefined(row)) {
            return undefined;
        }
        return row[coordinates.y];
    }

    private initDomainMap(dimension:number):void {
        this.domainMap = [];
        for (let i:number = 0; i < dimension; i++) {
            this.domainMap[i] = [];
            for (let j:number = 0; j < dimension; j++) {
                this.domainMap[i].push(undefined);
            }
        }
    }

}
