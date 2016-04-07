import {Directive, ElementRef, Input} from 'angular2/core';
import {Plot} from '../pieces/world/Plot';
import {GameService} from '../services/game.service';

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

    constructor(private el:ElementRef, private _gameService:GameService) {
    }

    public setDomain():void {
        this._gameService.setDisplayed(this.domain);
    }

    public unsetDomain():void {
        this._gameService.unsetDisplayed();
    }
}
