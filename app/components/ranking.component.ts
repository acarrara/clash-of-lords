import {Component, DoCheck} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {Lord} from '../pieces/game/Lord';
import {Arrays} from '../pieces/commons/Arrays';
import {Objects} from '../pieces/commons/Objects';
import {DisplayDomainDirective} from '../attribute-directives/display-domain.directive';

@Component({
    selector: 'ranking',
    template: `
    <div class="stats">
        <div class="stats-title reverse">Rankings</div>
            <div *ngFor="#lord of rankedLords; #i=index" 
            class="stats-element" [display-domain]="lord.domain">
            <div class="element-icon treasure{{i}}"></div>
            <div class="element-name reverse">{{lord.name}}</div>
            <div class="element-number reverse">
                <span class="treasure">{{lord.treasure}} $</span>
                <span class="action-points">{{lord.potential.amount}} AP</span>
            </div>
        </div>
    </div>
    `,
    inputs: ['lords'],
    directives: [NgFor, DisplayDomainDirective]
})
export class RankingComponent implements DoCheck {
    public lords:Lord[];
    public rankedLords:Lord[];

    public ngDoCheck():void {
        this.initRankedLords();
        Arrays.clear(this.rankedLords);
        this.rankedLords = this.rankedLords.concat(this.lords);
        this.rankedLords.sort((a:Lord, b:Lord) => {
            return b.treasure - a.treasure;
        });
    }

    private initRankedLords():void {
        if (Objects.isNotDefined(this.rankedLords)) {
            this.rankedLords = [];
        }
    }
}