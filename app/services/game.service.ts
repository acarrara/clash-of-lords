import {save} from '../mock-region';
import {Save} from '../pieces/game/Save';
import {Injectable} from 'angular2/core';
import {Region} from '../pieces/world/Region';
import {RegionFactory} from '../pieces/world/RegionFactory';
import {Politics} from '../pieces/game/Politics';
import {PoliticsFactory} from '../pieces/game/PoliticsFactory';
import {Lord} from '../pieces/game/Lord';
import {Coordinates} from '../pieces/world/Coordinates';
import {Objects} from '../pieces/commons/Objects';
import {Observable, Observer} from 'rxjs/Rx';

@Injectable()
export class GameService {

    public regionFactory:RegionFactory;
    public politicsFactory:PoliticsFactory;

    public politics:Politics;
    public lords:Lord[];

    constructor() {
        this.regionFactory = new RegionFactory();
        this.politicsFactory = new PoliticsFactory();
        this.politics = new Politics();
    }

    public loadSavedGame():Observable<Region> {
        return Observable.create((observer:Observer<Region>) => {
            var region:Region = this.createRegion(save);
            this.createLords(save);
            this.createPolitics(region);
            observer.next(region);
            observer.complete();
        });
    }

    public isRight(current:Coordinates):boolean {
        return this.isBorder(current, current.right());
    }

    public isLeft(current:Coordinates):boolean {
        return this.isBorder(current, current.left());
    }

    public isTop(current:Coordinates):boolean {
        return this.isBorder(current, current.top());
    }

    public isBottom(current:Coordinates):boolean {
        return this.isBorder(current, current.bottom());
    }

    public createLords(savedGame:Save):void {
        this.lords = savedGame.lords;
    }

    public createPolitics(region:Region):void {
        this.politics = this.politicsFactory.fromLords(region.plots.length, this.lords);
    }

    private isBorder(coordinates:Coordinates, neighbourCoordinates:Coordinates):boolean {
        var current:Lord = this.politics.lordAt(coordinates);
        var neighbour:Lord = this.politics.lordAt(neighbourCoordinates);
        return Objects.isDefined(current) &&
            (!Objects.isDefined(neighbour) ||
            current !== neighbour);
    }

    private createRegion(savedGame:Save):Region {
        return this.regionFactory.fromJson(savedGame.region);
    };
}
