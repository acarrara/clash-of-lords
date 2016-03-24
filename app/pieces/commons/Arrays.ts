export class Arrays {
    public static remove<T>(array:Array<T>, element:T):boolean {
        var index:number = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
            return true;
        }
        return false;
    }

    public static clear(array:Array<any>):void {
        while (array.length) {
            array.pop();
        }
    }
}