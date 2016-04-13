import {Directive, ElementRef, Input} from 'angular2/core';
import {Plot} from '../pieces/world/Plot';
import {Game} from '../pieces/game/Game';

@Directive({
    selector: '[display-domain]',
    host: {
        '(mouseenter)': 'setDomain()',
        '(mouseleave)': 'unsetDomain()'
    }
})
export class DisplayDomainDirective {

    @Input('display-domain')
    public domain:Plot[];

    private _game:Game;

    constructor(private el:ElementRef) {
    }

    @Input()
    public set game(value:Game) {
        this._game = value;
    }

    public setDomain():void {
        this._game.displayed = this.domain;
    }

    public unsetDomain():void {
        this._game.resetDisplayed();
    }
}
