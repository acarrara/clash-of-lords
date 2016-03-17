import {source} from '../mock-region';
import {Injectable} from 'angular2/core';
import {Region} from "../world/Region";

@Injectable()
export class GameService {

    public loadRegion() {
        return Promise.resolve(source);
    }
}