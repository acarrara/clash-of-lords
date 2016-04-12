import {ActionPoints} from '../ActionPoints';
import {ActionCost} from './ActionCost';

export interface Action<T> {
    actionCost:ActionCost;

    run(cost:ActionPoints):T;

}