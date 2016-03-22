export class Objects {
    public static isDefined(object:any):boolean {
        return object !== undefined;
    }

    public static isNotDefined(object:any):boolean {
        return !Objects.isDefined(object);
    }
}