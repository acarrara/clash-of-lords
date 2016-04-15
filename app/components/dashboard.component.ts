import {Component, OnInit, EventEmitter} from 'angular2/core';
import {NextTurnComponent} from './next-turn.component';
import {ConsoleComponent} from './console.component';
import {DomainComponent} from './domain.component';
import {RankingComponent} from './ranking.component';
import {Game} from '../pieces/game/Game';
import {Message} from '../pieces/game/message/Message';
import {MessageHerald} from '../services/message.herald';

@Component({
    selector: 'dashboard',
    template: `
        <div class="dashboard" >
            <domain [domain]="game.displayed"></domain>
            <div class="console">
                <next-turn (next)="nextTurn()"
                [lordIndex]="game.lordIndex"></next-turn>
                <console [messages]="messages" class="messages"></console>
             </div>
            <ranking [game]="game"></ranking>
        </div>
    `,
    directives: [NextTurnComponent, ConsoleComponent, DomainComponent, RankingComponent],
    inputs: ['game'],
    outputs: ['next']
})
export class DashboardComponent implements OnInit {

    private static MAX_SIZE:number = 9;

    public messages:Message[] = [];
    public game:Game;
    public next:EventEmitter<any> = new EventEmitter();

    constructor(private _herald:MessageHerald) {
    }

    public ngOnInit():void {
        this._herald.listen((message:Message) => {
            this.addMessage(message);
        });
    }

    public nextTurn():void {
        this.next.emit(null);
    }

    public addMessage(message:Message):void {
        if (this.messages.length === DashboardComponent.MAX_SIZE) {
            this.removeOldestMessage();
        }
        this.messages.push(message);
    };

    private removeOldestMessage():void {
        this.messages = this.messages.splice(1, 9);
    };
}