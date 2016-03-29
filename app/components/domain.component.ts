import {Component, DoCheck} from 'angular2/core';
import {Plot} from '../pieces/world/Plot';
import {PlotKind} from '../pieces/world/PlotKind';
import {NgFor} from 'angular2/common';

@Component({
    selector: 'domain',
    template: `
     <div class="stats">
        <div class="stats-title">Domain</div>
        <div *ngFor="#amount of amounts; #i=index" class="stats-element">
            <div class="element-number">{{amount}}</div>
            <div class="element-name">{{kinds[i].fullName}}{{amount !== 1 ? 's' : ''}}</div>
            <div class="element-icon b{{kinds[i].name}}"></div>
        </div>
    </div>
    `,
    inputs: ['domain'],
    directives: [NgFor]
})
export class DomainComponent implements DoCheck {
    public domain:Plot[];

    public kinds:PlotKind[] = [
        PlotKind.PLAIN,
        PlotKind.FOREST,
        PlotKind.MOUNTAIN,
        PlotKind.CASTLE
    ];

    public amounts:number[];

    constructor() {
        this.resetCount();
    }

    public ngDoCheck():any {
        this.resetCount();
        for (let i:number = 0; i < this.domain.length; i++) {
            for (let j:number = 0; j < this.kinds.length; j++) {
                if (this.domain[i].kind === this.kinds[j]) {
                    this.amounts[j] += 1;
                }
            }
        }
    }

    private resetCount():void {
        this.amounts = [];
        for (let i:number = 0; i < this.kinds.length; i++) {
            this.amounts.push(0);
        }
    }
}