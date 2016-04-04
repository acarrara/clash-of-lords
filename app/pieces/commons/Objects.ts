export class Objects {
    public static isDefined(object:any):boolean {
        return object !== undefined;
    }

    public static isNotDefined(object:any):boolean {
        return !Objects.isDefined(object);
    }

    public static toNumber(value:boolean):number {
        return (<number><any> value) + 0;
    }
}