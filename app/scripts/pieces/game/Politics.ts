import {Lord} from './Lord';

export class Politics {

    private _domainMap:Lord[][];

    constructor(dimension:number) {
        this.initDomainMap(dimension);
    }

    private initDomainMap(dimension:number):void {
        this._domainMap = [];
        for (let i:number = 0; i < dimension; i++) {
            this._domainMap[i] = [];
        }
    };

}