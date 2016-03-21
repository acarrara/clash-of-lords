import {Directive, ElementRef, Input, OnInit} from 'angular2/core';
import {Plot} from '../pieces/world/Plot';
import {GameService} from '../services/game.service';

@Directive({
    selector: '[limes]'
})
export class LimesDirective implements OnInit {

    @Input('limes') public plot:Plot;

    constructor(private el:ElementRef, private _gameService:GameService) {
    }

    public ngOnInit():void {
        this.onLoad();
    }

    private onLoad():void {
        this.el.nativeElement.classList.add('plot');
        this.el.nativeElement.classList.add(this.plot.kind.name);
        var x:number = this.plot.coordinates.x;
        var y:number = this.plot.coordinates.y;

        if (this._gameService.isRight(x, y)) {
            this.el.nativeElement.classList.add('limes-right');
        }

        if (this._gameService.isLeft(x, y)) {
            this.el.nativeElement.classList.add('limes-left');
        }

        if (this._gameService.isBottom(x, y)) {
            this.el.nativeElement.classList.add('limes-bottom');
        }

        if (this._gameService.isTop(x, y)) {
            this.el.nativeElement.classList.add('limes-top');
        }

    }
}
