import {ActiveAction} from './ActiveAction';
import {ActionPoints} from '../ActionPoints';
import {Plot} from '../../world/Plot';
import {Lord} from '../Lord';
import {PlotKind} from '../../world/PlotKind';
import {Region} from '../../world/Region';
import {Coordinates} from '../../world/Coordinates';
import {Objects} from '../../commons/Objects';

export class BuildAction extends ActiveAction {
    private static DELTA:number = 3;

    private _region:Region;

    constructor(settler:Lord, building:Plot, region:Region) {
        super(1, settler, building);
        this._region = region;
    }

    public run(actionPoints:ActionPoints):ActionPoints {
        this.checkCastle();
        this.checkBuildable();
        this.checkOtherCastles();
        var remnant:ActionPoints = this.evaluateCost(actionPoints);
        this.checkDebt(remnant, actionPoints);
        this.buildCastle();
        return remnant;
    }

    public calculateCost():ActionPoints {
        return new ActionPoints(PlotKind.CASTLE.worth * this.costCoefficient);
    }

    private buildCastle():void {
        this.settling.kind = PlotKind.CASTLE;
    }

    private checkCastle():void {
        if (this.settling.kind === PlotKind.CASTLE) {
            throw new Error('Plot already has a castle');
        }
    }

    private checkBuildable():void {
        if (!this.settling.kind.constructible) {
            throw new Error('Cannot build a castle on a ' + this.settling.kind.fullName + ' plot');
        }
    }

    private checkOtherCastles():void {
        let x:number = this.settling.coordinates.x;
        let y:number = this.settling.coordinates.y;
        for (let i:number = x - BuildAction.DELTA; i <= x + BuildAction.DELTA; i++) {
            for (let j:number = y - BuildAction.DELTA; j <= y + BuildAction.DELTA; j++) {
                var plot:Plot = this._region.plotAt(new Coordinates(i, j));
                if (Objects.isDefined(plot) && plot.kind === PlotKind.CASTLE) {
                    throw new Error('Too close to another castle!');
                }
            }
        }

    }

}