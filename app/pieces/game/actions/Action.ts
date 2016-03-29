import {ActionPoints} from '../ActionPoints';

export interface Action<T> {
    costCoefficient:number;

    run(cost:ActionPoints):T;

}