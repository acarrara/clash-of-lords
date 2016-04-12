import {Lord} from './Lord';
import {Region} from '../world/Region';
import {AvailableAction} from './actions/AvailableAction';
import {Plot} from '../world/Plot';
import {Politics} from './Politics';

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
}