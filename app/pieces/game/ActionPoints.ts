export class ActionPoints {

    private _amount:number;

    public constructor(total:number) {
        this._amount = total;
    }

    public get amount():number {
        return this._amount;
    }

    public isDebt():boolean {
        return this._amount < 0;
    }

    public add(actionPoints:ActionPoints):ActionPoints {
        return new ActionPoints(actionPoints.amount + this.amount);
    }

    public subtract(actionPoints:ActionPoints):ActionPoints {
        return new ActionPoints(this.amount - actionPoints.amount);
    }
}