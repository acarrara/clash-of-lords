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
import {ColonizeAction} from '../pieces/game/actions/ColonizeAction';
import {Plot} from '../pieces/world/Plot';
import {GameDirector} from './game-director';
import {MessageLevel} from '../pieces/game/message/MessageLevel';
import {Message} from '../pieces/game/message/Message';
import {MessageHerald} from './message.herald';
import {ConquerAction} from '../pieces/game/actions/ConquerAction';
import {FortifyAction} from '../pieces/game/actions/FortifyAction';
import {ActionPoints} from '../pieces/game/ActionPoints';

@Injectable()
export class GameService {

    public regionFactory:RegionFactory;
    public politicsFactory:PoliticsFactory;

    public politics:Politics;
    public lords:Lord[];

    public activeLord:Lord;
    public currentPlot:Plot;
    public availableAction:string;

    constructor(private _herald:MessageHerald, private _director:GameDirector) {
        this.regionFactory = new RegionFactory();
        this.politicsFactory = new PoliticsFactory();
        this.politics = new Politics();
    }

    public loadSavedGame():Observable<Region> {
        return Observable.create((observer:Observer<Region>) => {
            var region:Region = this.regionFactory.fromJson(save.region);
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

    public startGame():void {
        this._director.register(this.lords);
        for (let i:number = 0; i < this.lords.length; i++) {
            this._herald.assert(new Message(this.lords[i].name + ' enters the game!', MessageLevel.INFO));
        }
        this.nextTurn();
        this.currentPlot = this.activeLord.domain[0];
    }

    public createPolitics(region:Region):void {
        this.politics = this.politicsFactory.fromLords(region.plots.length, this.lords);
    }

    public nextTurn():void {
        this.activeLord = this._director.nextTurn();
        this._herald.assert(new Message('It\'s ' + this.activeLord.name + ' turn.', MessageLevel.INFO));
    };

    public changePlot(plot:Plot):void {
        this.currentPlot = plot;
    }

    public changeAvailableAction(coordinates:Coordinates):string {
        this.availableAction = this.politics.availableAction(this.activeLord, coordinates);
        return this.availableAction;
    }

    public run():void {
        switch (this.availableAction) {
            case 'Conquer':
            {
                this.conquer(this.currentPlot);
                break;
            }
            case 'Colonize':
            {
                this.colonize(this.currentPlot);
                break;
            }
            case 'Fortify':
            {
                this.fortify(this.currentPlot);
                break;
            }
        }
    }

    public dryRun():ActionPoints {
        switch (this.availableAction) {
            case 'Conquer':
            {
                var conquerAction:ConquerAction = new ConquerAction(this.activeLord, this.currentPlot, this.politics);
                return conquerAction.dryRun();
            }
            case 'Colonize':
            {
                var colonizeAction:ColonizeAction = new ColonizeAction(this.activeLord, this.currentPlot, this.politics);
                return colonizeAction.dryRun();
            }
            case 'Fortify':
            {
                var fortifyAction:FortifyAction = new FortifyAction(this.activeLord, this.currentPlot);
                return fortifyAction.dryRun();
            }
            default:
            {
                return new ActionPoints(0);
            }
        }
    }

    public colonize(plot:Plot):void {
        var colonizeAction:ColonizeAction = new ColonizeAction(this.activeLord, plot, this.politics);
        try {
            this.activeLord.actionPoints = colonizeAction.run(this.activeLord.actionPoints);
            this._herald.assert(new Message('Colonized plot at (' + plot.coordinates.x + ',' + plot.coordinates.y + ')', MessageLevel.INFO));
        } catch (e) {
            this._herald.assert(new Message(e.message, MessageLevel.WARN));
        }
    }

    public fortify(plot:Plot):void {
        var fortifyAction:FortifyAction = new FortifyAction(this.activeLord, plot);
        try {
            this.activeLord.actionPoints = fortifyAction.run(this.activeLord.actionPoints);
            this._herald.assert(new Message('Fortified plot at (' + plot.coordinates.x + ',' + plot.coordinates.y + ')', MessageLevel.INFO));
        } catch (e) {
            this._herald.assert(new Message(e.message, MessageLevel.WARN));
        }
    }

    public conquer(plot:Plot):void {
        var conquerAction:ConquerAction = new ConquerAction(this.activeLord, plot, this.politics);
        try {
            this.activeLord.actionPoints = conquerAction.run(this.activeLord.actionPoints);
            this._herald.assert(new Message('Conquered plot at (' + plot.coordinates.x + ',' + plot.coordinates.y + ')', MessageLevel.INFO));
        } catch (e) {
            this._herald.assert(new Message(e.message, MessageLevel.WARN));
        }
    }

    private isBorder(coordinates:Coordinates, neighbourCoordinates:Coordinates):boolean {
        var current:Lord = this.politics.lordAt(coordinates);
        var neighbour:Lord = this.politics.lordAt(neighbourCoordinates);
        return Objects.isDefined(current) &&
            (!Objects.isDefined(neighbour) ||
            current !== neighbour);
    }
}
