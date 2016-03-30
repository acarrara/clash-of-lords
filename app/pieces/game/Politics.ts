import {Lord} from './Lord';
import {Coordinates} from '../world/Coordinates';
import {Objects} from '../commons/Objects';
import {PlotKind} from '../world/PlotKind';
import {Plot} from '../world/Plot';

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

    public settle(settler:Lord, coordinates:Coordinates):void {
        this.checkAdjacent(settler, coordinates);
        this.checkCastleReachable(settler, coordinates);
        this.domainMap[coordinates.x][coordinates.y] = settler;
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

    private checkAdjacent(settler:Lord, coordinates:Coordinates):void {
        var neighbours:Coordinates[] = coordinates.neighbours(this.domainMap.length, this.domainMap[0].length);
        for (let i:number = 0; i < neighbours.length; i++) {
            if (this.belongs(settler, neighbours[i])) {
                return;
            }
        }
        throw new Error('Plot must be adjacent to your domain!');
    }

    private belongs(settler:Lord, candidate:Coordinates):boolean {
        var lord:Lord = this.lordAt(candidate);
        return Objects.isDefined(lord) && lord === settler;
    };

    private  checkCastleReachable(settler:Lord, coordinates:Coordinates):void {
        var path:Coordinates[] = [coordinates];
        var visited:Coordinates[] = [];
        while (path.length) {
            var current:Coordinates = path.shift();
            visited.push(current);
            var neighbours:Coordinates[] = current.neighbours(this.domainMap.length, this.domainMap[0].length);
            for (let i:number = 0; i < neighbours.length; i++) {
                var currentNeighbour:Coordinates = neighbours[i];
                if (this.belongs(settler, currentNeighbour) && visited.indexOf(currentNeighbour) === -1) {
                    path.push(currentNeighbour);
                }
                var plot:Plot = settler.plotAt(currentNeighbour);
                if (Objects.isDefined(plot) && plot.kind === PlotKind.CASTLE) {
                    return;
                }
            }
        }
        throw new Error('Plot must be reachable from a castle!');
    }
}
