export class MessageLevel {

    public static INFO:MessageLevel = new MessageLevel('i');
    public static WARN:MessageLevel = new MessageLevel('e');

    public name:string;

    constructor(name:string) {
        this.name = name;
    }
}