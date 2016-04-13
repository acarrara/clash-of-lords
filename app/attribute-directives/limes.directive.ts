import {Directive, ElementRef, Input, DoCheck} from 'angular2/core';
import {Plot} from '../pieces/world/Plot';
import {Lord} from '../pieces/game/Lord';
import {Objects} from '../pieces/commons/Objects';
import {Game} from '../pieces/game/Game';

@Directive({
    selector: '[limes]'
})
export class LimesDirective implements DoCheck {

    @Input('limes')
    public plot:Plot;

    private _game:Game;

    constructor(private el:ElementRef) {
    }

    @Input()
    public set game(game:Game) {
        this._game = game;
    }

    public ngDoCheck():void {
        this.onLoad();
    }

    private onLoad():void {
        this.clear(this.el.nativeElement.classList);

        this.el.nativeElement.classList.add('plot');

        var lord:Lord = this._game.politics.lordAt(this.plot.coordinates);
        if (Objects.isDefined(lord)) {
            this.el.nativeElement.classList.add('lord' + this._game.lords.indexOf(lord));
        }

        this.el.nativeElement.classList.add(this.plot.kind.name);

        if (this.plot.fortified) {
            this.el.nativeElement.classList.add('fortified');
        }

        if (this._game.isRight(this.plot.coordinates)) {
            this.el.nativeElement.classList.add('limes-right');
        }

        if (this._game.isLeft(this.plot.coordinates)) {
            this.el.nativeElement.classList.add('limes-left');
        }

        if (this._game.isBottom(this.plot.coordinates)) {
            this.el.nativeElement.classList.add('limes-bottom');
        }

        if (this._game.isTop(this.plot.coordinates)) {
            this.el.nativeElement.classList.add('limes-top');
        }

    }

    private clear(classList:DOMTokenList):void {
        while (classList.length) {
            classList.remove(classList.item(0));
        }
    }
}
