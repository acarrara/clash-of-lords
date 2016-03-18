import {source} from '../mock-region';
import {Injectable} from 'angular2/core';
import {Region} from '../pieces/world/Region';
import {RegionFactory} from '../pieces/world/RegionFactory';

@Injectable()
export class GameService {

    private _regionFactory:RegionFactory;

    constructor() {
        this._regionFactory = new RegionFactory();
    }

    public loadRegion():any {
        return new Promise<Region>((resolve:any) => {
            return resolve(this._regionFactory.fromJson(source));
        });
    }
}