export class PlotKind {

    public static GRASS:PlotKind = new PlotKind(true, 'g');
    public static WATER:PlotKind = new PlotKind(false, 'w');
    public static FOREST:PlotKind = new PlotKind(false, 'f');
    public static MOUNTAIN:PlotKind = new PlotKind(false, 'm');
    public static ROAD:PlotKind = new PlotKind(true, 'r');
    public static CASTLE:PlotKind = new PlotKind(false, 'c');

    public static KINDS:PlotKind[] = [
        PlotKind.GRASS,
        PlotKind.WATER,
        PlotKind.FOREST,
        PlotKind.MOUNTAIN,
        PlotKind.CASTLE
    ];

    private _constructible:boolean;
    private _name:string;

    public constructor(constructible:boolean, name:string) {
        this._constructible = constructible;
        this._name = name;
    }

    public static fromName(name:string):PlotKind {
        for(var i:number = 0; i < PlotKind.KINDS.length; i++) {
            if(PlotKind.KINDS[i].name === name) {
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
}