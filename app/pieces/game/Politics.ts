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
        if (!this.isAdjacent(settler, coordinates)) {
            throw new Error('Plot must be adjacent to your domain!');
        }
        if (!this.isCastleReachable(settler, coordinates)) {
            throw new Error('Plot must be reachable from a castle!');
        }
        this.domainMap[coordinates.x][coordinates.y] = settler;
    }

    public availableAction(lord:Lord, dest:Coordinates):string {
        if (lord.plotAt(dest)) {
            return 'Fortify';
        }
        if (this.isAdjacent(lord, dest)) {
            if (this.isSettled(dest)) {
                return 'Conquer';
            }
            if (!this.isCastleReachable(lord, dest)) {
                return 'Unreachable';
            }
            return 'Colonize';
        }
        return 'Unreachable';
    }

    private isSettled(dest:Coordinates):boolean {
        return Objects.isDefined(this.domainMap[dest.x][dest.y]);
    };

    private initDomainMap(dimension:number):void {
        this.domainMap = [];
        for (let i:number = 0; i < dimension; i++) {
            this.domainMap[i] = [];
            for (let j:number = 0; j < dimension; j++) {
                this.domainMap[i].push(undefined);
            }
        }
    }

    private isAdjacent(settler:Lord, coordinates:Coordinates):boolean {
        var neighbours:Coordinates[] = coordinates.neighbours(this.domainMap.length, this.domainMap[0].length);
        for (let i:number = 0; i < neighbours.length; i++) {
            if (this.belongs(settler, neighbours[i])) {
                return true;
            }
        }
        return false;
    }

    private belongs(settler:Lord, candidate:Coordinates):boolean {
        var lord:Lord = this.lordAt(candidate);
        return Objects.isDefined(lord) && lord === settler;
    };

    private  isCastleReachable(settler:Lord, coordinates:Coordinates):boolean {
        var path:Coordinates[] = [coordinates];
        var visited:string[] = [];
        while (path.length) {
            var current:Coordinates = path.shift();
            visited.push(JSON.stringify(current));
            var neighbours:Coordinates[] = current.neighbours(this.domainMap.length, this.domainMap[0].length);
            for (let i:number = 0; i < neighbours.length; i++) {
                var currentNeighbour:Coordinates = neighbours[i];
                if (this.belongs(settler, currentNeighbour) && visited.indexOf(JSON.stringify(currentNeighbour)) === -1) {
                    path.push(currentNeighbour);
                }
                var plot:Plot = settler.plotAt(currentNeighbour);
                if (Objects.isDefined(plot) && plot.kind === PlotKind.CASTLE) {
                    return true;
                }
            }
        }
        return false;
    }
}
