import {save} from '../mock-region';
import {GameService} from './game.service';
import {Injectable} from 'angular2/core';
import {Region} from '../pieces/world/Region';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {RegionFactory} from '../pieces/world/RegionFactory';

@Injectable()
export class FakeBackend {

    constructor(private _gameService:GameService) {
    }

    public loadSavedGame():Observable<Region> {
        return Observable.create((observer:Observer<Region>) => {
            this._gameService.load(save);
            var region:Region = new RegionFactory().fromJson(save.region);
            observer.next(region);
            observer.complete();
        });
    }
}