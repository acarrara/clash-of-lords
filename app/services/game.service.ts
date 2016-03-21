import {save} from '../mock-region';
import {Injectable} from 'angular2/core';
import {Region} from '../pieces/world/Region';
import {RegionFactory} from '../pieces/world/RegionFactory';
import {Politics} from '../pieces/game/Politics';
import {PoliticsFactory} from '../pieces/game/PoliticsFactory';
import {Lord} from '../pieces/game/Lord';
import {Coordinates} from '../pieces/world/Coordinates';
import {Objects} from '../pieces/commons/Objects';

@Injectable()
export class GameService {

    public regionFactory:RegionFactory;
    public politics:Politics;
    public lords:Lord[];

    constructor() {
        this.regionFactory = new RegionFactory();
        this.politics = new Politics();
    }

    public loadSavedGame():any {
        return new Promise<Region>((resolve:any) => {
            var region:Region = this.regionFactory.fromJson(save.region);
            this.lords = save.lords;
            console.log(this.lords);
            this.politics = new PoliticsFactory().fromLords(region.plots.length, this.lords);
            return resolve(region);
        });
    }

    public isRight(x:number, y:number):boolean {
        return this.isBorder(new Coordinates(x, y), new Coordinates(x, y + 1));
    }

    public isLeft(x:number, y:number):boolean {
        return this.isBorder(new Coordinates(x, y), new Coordinates(x, y - 1));
    }

    public isTop(x:number, y:number):boolean {
        return this.isBorder(new Coordinates(x, y), new Coordinates(x - 1, y));
    }

    public isBottom(x:number, y:number):boolean {
        return this.isBorder(new Coordinates(x, y), new Coordinates(x + 1, y));
    }

    private isBorder(coordinates:Coordinates, neighbourCoordinates:Coordinates):boolean {
        var current:Lord = this.politics.lordAt(coordinates);
        var neighbour:Lord = this.politics.lordAt(neighbourCoordinates);
        return Objects.isDefined(current) &&
            (!Objects.isDefined(neighbour) ||
            current !== neighbour);
    }
}
