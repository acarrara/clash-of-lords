import {ActionPoints} from '../ActionPoints';

export interface Action {
    costCoefficient:number;

    run(cost:ActionPoints):ActionPoints;

}