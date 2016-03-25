export class MessageLevel {

    public static INFO:MessageLevel = new MessageLevel('i');
    public static WARN:MessageLevel = new MessageLevel('w');

    public name:string;

    constructor(name:string) {
        this.name = name;
    }
}