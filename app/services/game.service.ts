import {Injectable} from 'angular2/core';
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
import {Game} from '../pieces/game/Game';

@Injectable()
export class GameService {

    public regionFactory:RegionFactory;
    public politicsFactory:PoliticsFactory;
    public actionFactory:ActionFactory;
    public actionCostFactory:ActionCostFactory;

    public displayed:Plot[];

    public started:boolean;

    public game:Game;

    constructor(private _herald:MessageHerald, private _director:GameDirector) {
        this.regionFactory = new RegionFactory();
        this.politicsFactory = new PoliticsFactory();
        this.actionFactory = new ActionFactory();
        this.actionCostFactory = new ActionCostFactory();
        this.game = new Game();
        this.game.politics = new Politics();
        this.started = false;
        this.game.availableAction = AvailableAction.NOTHING;
    }

    public load(save:Save):void {
        this.game.region = this.regionFactory.fromJson(save.region);
        this.createLords(save);
        this.game.politics = this.politicsFactory.fromLords(this.game.region.plots.length, this.game.lords);
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
        this.game.lords = savedGame.lords;
    }

    public startGame():void {
        this._director.register(this.game.lords);
        for (let i:number = 0; i < this.game.lords.length; i++) {
            this._herald.assert(new Message(this.game.lords[i].name + ' enters the game!', MessageLevel.INFO));
        }
        this.nextTurn();
        this.changePlot(this.game.lord.domain[0]);
        this.started = true;
    }

    public nextTurn():void {
        this.game.lord = this._director.nextTurn();
        this._herald.assert(new Message('It\'s ' + this.game.lord.name + '\'s turn.', MessageLevel.INFO));
    };

    public changePlot(plot:Plot):void {
        this.game.plot = plot;
    }

    public changeAvailableAction(coordinates:Coordinates):AvailableAction {
        this.game.availableAction = this.game.politics.availableAction(this.game.lord, coordinates);
        return this.game.availableAction;
    }

    public setDisplayed(domain:Plot[]):void {
        this.displayed = domain;
    }

    public unsetDisplayed():void {
        this.setDisplayed(undefined);
    }

    public run():void {
        let action:ActiveAction = this.actionFactory.createAction(this.game);
        try {
            this.game.lord.actionPoints = action.run(this.game.lord.actionPoints);
            this._herald.assert(action.getMessage());
        } catch (e) {
            this._herald.assert(new Message(e.message, MessageLevel.WARN));
        }
    }

    public build():void {
        this.game.availableAction = AvailableAction.BUILD;
        this.run();
    }

    private isBorder(coordinates:Coordinates, neighbourCoordinates:Coordinates):boolean {
        var current:Lord = this.game.politics.lordAt(coordinates);
        var neighbour:Lord = this.game.politics.lordAt(neighbourCoordinates);
        return Objects.isDefined(current) &&
            (!Objects.isDefined(neighbour) ||
            current !== neighbour);
    }
}
