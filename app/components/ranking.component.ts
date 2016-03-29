import {Component, DoCheck} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {Lord} from '../pieces/game/Lord';

@Component({
    selector: 'ranking',
    template: `
    <div class="stats">
        <div class="stats-title reverse">Treasures</div>
            <div *ngFor="#lord of lords; #i=index" class="stats-element">
            <div class="element-icon treasure{{i}}"></div>
            <div class="element-name reverse">{{lord.name}}</div>
            <div class="element-number reverse">{{lord.treasure}}</div>
        </div>
    </div>
    `,
    inputs: ['lords'],
    directives: [NgFor]
})
export class RankingComponent implements DoCheck {
    public lords:Lord[];

    public ngDoCheck():void {
        this.lords.sort((a:Lord, b:Lord) => {
            return b.treasure - a.treasure;
        });
    }
}