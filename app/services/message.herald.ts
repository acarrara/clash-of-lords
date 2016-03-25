import {Observable, Observer, Subscription} from 'rxjs/Rx';
import {Injectable} from 'angular2/core';
import {Message} from '../pieces/game/message/Message';
import {Objects} from '../pieces/commons/Objects';

@Injectable()
export class MessageHerald {

    public messages:Message[] = [];
    public _heraldObservable:Observable<Message>;
    private _heraldObserver:Observer<Message>;

    constructor() {
        this._heraldObservable = new Observable((observer:Observer<Message>) => {
            this._heraldObserver = observer;
        }).share();
    }

    public assert(message:Message):void {
        this.messages.push(message);
        if (Objects.isDefined(this._heraldObserver)) {
            this._heraldObserver.next(message);
        }
    }

    public listen(callback:(message:Message) => void):Subscription {
        return this._heraldObservable.subscribe(callback);
    }

}