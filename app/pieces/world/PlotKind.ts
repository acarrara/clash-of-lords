export class PlotKind {

    public static PLAIN:PlotKind = new PlotKind(true, true, 'p', 'Plain', 1);
    public static WATER:PlotKind = new PlotKind(false, false, 'w', 'Water', 1);
    public static FOREST:PlotKind = new PlotKind(false, true, 'f', 'Forest',  2);
    public static MOUNTAIN:PlotKind = new PlotKind(false, true, 'm', 'Mountain',  3);
    public static CASTLE:PlotKind = new PlotKind(false, true, 'c', 'Castle',  8);

    public static KINDS:PlotKind[] = [
        PlotKind.PLAIN,
        PlotKind.WATER,
        PlotKind.FOREST,
        PlotKind.MOUNTAIN,
        PlotKind.CASTLE
    ];

    private _constructible:boolean;
    private _colonizable:boolean;
    private _name:string;
    private _fullName:string;
    private _worth:number;

    public constructor(constructible:boolean, colonizable:boolean, name:string, fullName:string, worth:number) {
        this._constructible = constructible;
        this._colonizable = colonizable;
        this._name = name;
        this._fullName = fullName;
        this._worth = worth;
    }

    public static fromName(name:string):PlotKind {
        for (var i:number = 0; i < PlotKind.KINDS.length; i++) {
            if (PlotKind.KINDS[i].name === name) {
                return PlotKind.KINDS[i];
            }
        }
        throw new Error('Unexpected name: ' + name);
    }

    public get name():string {
        return this._name;
    }

    public get constructible():boolean {
        return this._constructible;
    }

    public get colonizable():boolean {
        return this._colonizable;
    }

    public get fullName():string {
        return this._fullName;
    }

    public get worth():number {
        return this._worth;
    }
}