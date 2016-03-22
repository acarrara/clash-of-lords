export class PlotKind {

    public static PLAIN:PlotKind = new PlotKind(true, true, 'p', 1);
    public static WATER:PlotKind = new PlotKind(false, true, 'w', 1);
    public static FOREST:PlotKind = new PlotKind(false, true, 'f', 2);
    public static MOUNTAIN:PlotKind = new PlotKind(false, true, 'm', 3);
    public static CASTLE:PlotKind = new PlotKind(false, false, 'c', 8);

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
    private _worth:number;

    public constructor(constructible:boolean, colonizable:boolean, name:string, worth:number) {
        this._constructible = constructible;
        this._colonizable = colonizable;
        this._name = name;
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

    public get worth():number {
        return this._worth;
    }
}