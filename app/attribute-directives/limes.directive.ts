import {Directive, ElementRef, Input, DoCheck} from 'angular2/core';
import {Plot} from '../pieces/world/Plot';
import {GameService} from '../services/game.service';
import {Lord} from '../pieces/game/Lord';
import {Objects} from '../pieces/commons/Objects';

@Directive({
    selector: '[limes]'
})
export class LimesDirective implements DoCheck {

    @Input('limes')
    public plot:Plot;

    constructor(private el:ElementRef, private _gameService:GameService) {
    }

    public ngDoCheck():void {
        this.onLoad();
    }

    private onLoad():void {
        this.clear(this.el.nativeElement.classList);

        this.el.nativeElement.classList.add('plot');

        var lord:Lord = this._gameService.politics.lordAt(this.plot.coordinates);
        if (Objects.isDefined(lord)) {
            this.el.nativeElement.classList.add('lord' + this._gameService.lords.indexOf(lord));
        }

        this.el.nativeElement.classList.add(this.plot.kind.name);

        if (this.plot.fortified) {
            this.el.nativeElement.classList.add('fortified');
        }

        if (this._gameService.isRight(this.plot.coordinates)) {
            this.el.nativeElement.classList.add('limes-right');
        }

        if (this._gameService.isLeft(this.plot.coordinates)) {
            this.el.nativeElement.classList.add('limes-left');
        }

        if (this._gameService.isBottom(this.plot.coordinates)) {
            this.el.nativeElement.classList.add('limes-bottom');
        }

        if (this._gameService.isTop(this.plot.coordinates)) {
            this.el.nativeElement.classList.add('limes-top');
        }

    }

    private clear(classList:DOMTokenList):void {
        while (classList.length) {
            classList.remove(classList.item(0));
        }
    }
}
