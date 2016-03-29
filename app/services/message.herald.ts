import {Observable, Observer, Subscription} from 'rxjs/Rx';
import {Injectable} from 'angular2/core';
import {Message} from '../pieces/game/message/Message';
import {Objects} from '../pieces/commons/Objects';

@Injectable()
export class MessageHerald {

    public messages:Message[] = [];
    public _heraldObservable:Observable<Message>;
    private _heraldObserver:Observer<Message>;

    private _buffer:Message[];

    constructor() {
        this._buffer = [];
        this._heraldObservable = new Observable((observer:Observer<Message>) => {
            this._heraldObserver = observer;
        }).share();
    }

    public assert(message:Message):void {
        if (Objects.isDefined(this._heraldObserver)) {
            this.emptyBuffer();
            this.assertMessage(message);
        } else {
            this._buffer.push(message);
        }
    }

    public listen(callback:(message:Message) => void):Subscription {
        return this._heraldObservable.subscribe(callback);
    }

    private emptyBuffer():void {
        while (this._buffer.length > 0) {
            this.assertMessage(this._buffer.pop());
        }
    }

    private assertMessage(message:Message):void {
        this.messages.push(message);
        this._heraldObserver.next(message);
    }

}