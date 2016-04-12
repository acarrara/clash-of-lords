export class AvailableAction {

    public static BUILD:AvailableAction = new AvailableAction(8, 'Build');
    public static COLONIZE:AvailableAction = new AvailableAction(1, 'Colonize');
    public static FORTIFY:AvailableAction = new AvailableAction(1, 'Fortify');
    public static CONQUER:AvailableAction = new AvailableAction(3, 'Conquer');
    public static FARM:AvailableAction = new AvailableAction(0.1, 'Farm');
    public static UNREACHABLE:AvailableAction = new AvailableAction(0, 'Unreachable');
    public static NOTHING:AvailableAction = new AvailableAction(0, 'Nothing');

    public costCoefficient:number;
    public name:string;

    constructor(costCoefficient:number, name:string) {
        this.costCoefficient = costCoefficient;
        this.name = name;
    }
}