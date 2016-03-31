import {Component, DoCheck} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {Lord} from '../pieces/game/Lord';
import {Arrays} from '../pieces/commons/Arrays';

@Component({
    selector: 'ranking',
    template: `
    <div class="stats">
        <div class="stats-title reverse">Treasures</div>
            <div *ngFor="#lord of rankingLords; #i=index" class="stats-element">
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
    public rankingLords:Lord[];

    public ngDoCheck():void {
        this.rankingLords = Arrays.copy(this.lords);
        this.rankingLords.sort((a:Lord, b:Lord) => {
            return b.treasure - a.treasure;
        });
    }
}