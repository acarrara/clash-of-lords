import {MessageLevel} from './MessageLevel';

export class Message {

    public value:string;
    public level:MessageLevel;

    constructor(value:string, level:MessageLevel) {
        this.value = value;
        this.level = level;
    }
}