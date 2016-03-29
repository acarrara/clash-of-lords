import {Component, OnInit} from 'angular2/core';
import {Message} from '../pieces/game/message/Message';
import {MessageHerald} from '../services/message.herald';

@Component({
    selector: 'console',
    template: `
    <div>
    <div class="message {{msg.level.name}}" *ngFor="#msg of messages">&gt; {{msg.value}}</div>
</div>
    `
})
export class ConsoleComponent implements OnInit {

    private static MAX_SIZE:number = 9;

    public messages:Message[] = [];

    constructor(private _herald:MessageHerald) {
    }

    public ngOnInit():void {
        this._herald.listen((message:Message) => {
            this.addMessage(message);
        });
    }

    public addMessage(message:Message):void {
        if (this.messages.length === ConsoleComponent.MAX_SIZE) {
            this.removeOldestMessage();
        }
        this.messages.push(message);
    };

    private removeOldestMessage():void {
        this.messages = this.messages.splice(1, 9);
    };
}