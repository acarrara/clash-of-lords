import {Component} from 'angular2/core';
import {Message} from '../pieces/game/message/Message';

@Component({
    selector: 'console',
    template: `
    <div>
        <div class="message {{msg.level.name}}" *ngFor="#msg of messages">&gt; {{msg.value}}</div>
    </div>
    `,
    inputs: ['messages']
})
export class ConsoleComponent {
    public messages:Message[] = [];
}