import {Injectable} from 'angular2/core';
import {Region} from '../pieces/world/Region';
import {RegionFactory} from '../pieces/world/RegionFactory';
import {Politics} from '../pieces/game/Politics';
import {PoliticsFactory} from '../pieces/game/PoliticsFactory';
import {Lord} from '../pieces/game/Lord';
import {Coordinates} from '../pieces/world/Coordinates';
import {Objects} from '../pieces/commons/Objects';
import {Plot} from '../pieces/world/Plot';
import {GameDirector} from './game-director';
import {MessageLevel} from '../pieces/game/message/MessageLevel';
import {Message} from '../pieces/game/message/Message';
import {MessageHerald} from './message.herald';
import {AvailableAction} from '../pieces/game/actions/AvailableAction';
import {ActionFactory} from '../pieces/game/actions/ActionFactory';
import {ActionCostFactory} from '../pieces/game/actions/ActionCostFactory';
import {ActiveAction} from '../pieces/game/actions/ActiveAction';
import {Save} from '../pieces/game/Save';

@Injectable()
export class GameService {

    public regionFactory:RegionFactory;
    public politicsFactory:PoliticsFactory;
    public actionFactory:ActionFactory;
    public actionCostFactory:ActionCostFactory;

    public region:Region;
    public politics:Politics;
    public lords:Lord[];

    public activeLord:Lord;
    public currentPlot:Plot;
    public availableAction:AvailableAction;

    public displayed:Plot[];

    public started:boolean;

    constructor(private _herald:MessageHerald, private _director:GameDirector) {
        this.regionFactory = new RegionFactory();
        this.politicsFactory = new PoliticsFactory();
        this.actionFactory = new ActionFactory();
        this.actionCostFactory = new ActionCostFactory();
        this.politics = new Politics();
        this.started = false;
        this.availableAction = AvailableAction.NOTHING;
    }

    public load(save:Save):void {
        this.region = this.regionFactory.fromJson(save.region);
        this.createLords(save);
        this.politics = this.politicsFactory.fromLords(this.region.plots.length, this.lords);
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
        this.started = true;
    }

    public nextTurn():void {
        this.activeLord = this._director.nextTurn();
        this._herald.assert(new Message('It\'s ' + this.activeLord.name + '\'s turn.', MessageLevel.INFO));
    };

    public changePlot(plot:Plot):void {
        this.currentPlot = plot;
    }

    public changeAvailableAction(coordinates:Coordinates):AvailableAction {
        this.availableAction = this.politics.availableAction(this.activeLord, coordinates);
        return this.availableAction;
    }

    public setDisplayed(domain:Plot[]):void {
        this.displayed = domain;
    }

    public unsetDisplayed():void {
        this.setDisplayed(undefined);
    }

    public run():void {
        let action:ActiveAction = this.actionFactory.createAction(
            this.availableAction,
            this.currentPlot,
            this.activeLord,
            this.politics,
            this.region
        );
        try {
            this.activeLord.actionPoints = action.run(this.activeLord.actionPoints);
            this._herald.assert(action.getMessage());
        } catch (e) {
            this._herald.assert(new Message(e.message, MessageLevel.WARN));
        }
    }

    public build():void {
        this.availableAction = AvailableAction.BUILD;
        this.run();
    }

    private isBorder(coordinates:Coordinates, neighbourCoordinates:Coordinates):boolean {
        var current:Lord = this.politics.lordAt(coordinates);
        var neighbour:Lord = this.politics.lordAt(neighbourCoordinates);
        return Objects.isDefined(current) &&
            (!Objects.isDefined(neighbour) ||
            current !== neighbour);
    }
}
