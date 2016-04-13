import {Lord} from './Lord';
import {Region} from '../world/Region';
import {AvailableAction} from './actions/AvailableAction';
import {Plot} from '../world/Plot';
import {Politics} from './Politics';
import {Objects} from '../commons/Objects';
import {Coordinates} from '../world/Coordinates';

export class Game {
    public region:Region;
    public lords:Lord[];
    public lord:Lord;
    public availableAction:AvailableAction;
    public plot:Plot;
    public politics:Politics;

    public get lordIndex():number {
        return this.lords.indexOf(this.lord);
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

    public isRight(current:Coordinates):boolean {
        return this.isBorder(current, current.right());
    }

    private isBorder(coordinates:Coordinates, neighbourCoordinates:Coordinates):boolean {
        var current:Lord = this.politics.lordAt(coordinates);
        var neighbour:Lord = this.politics.lordAt(neighbourCoordinates);
        return Objects.isDefined(current) &&
            (!Objects.isDefined(neighbour) ||
            current !== neighbour);
    }

}