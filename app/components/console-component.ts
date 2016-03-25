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

    public messages:Message[] = [];

    constructor(private _herald:MessageHerald) {
    }

    public ngOnInit():void {
        this._herald.listen((message:Message) => {
            this.addMessage(message);
        });
    }

    private addMessage(message:Message):void {
        this.messages.push(message);
    };
}