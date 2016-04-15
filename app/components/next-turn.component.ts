import {Component, EventEmitter} from 'angular2/core';

@Component({
    selector: 'next-turn',
    template: `
    <div class="nextturn lord{{lordIndex}}"
    id="nextturn" (click)="nextTurn()">Next Turn</div>
    `,
    inputs: ['lordIndex'],
    outputs: ['next']
})
export class NextTurnComponent {

    public lordIndex:number;
    public next:EventEmitter<any> = new EventEmitter();

    public nextTurn():void {
        this.next.emit(null);
    }

}
