import {Game} from './pieces/game/Game';
import {Plot} from './pieces/world/Plot';
import {PlotKind} from './pieces/world/PlotKind';
import {Region} from './pieces/world/Region';
import {AvailableAction} from './pieces/game/actions/AvailableAction';
import {Lord} from './pieces/game/Lord';
import {PoliticsFactory} from './pieces/game/PoliticsFactory';
import {Coordinates} from './pieces/world/Coordinates';

export var createGame:any = ():Game => {
    let game:Game = new Game();
    let plot1:Plot = new Plot(PlotKind.PLAIN, new Coordinates(1, 0));
    let plot2:Plot = new Plot(PlotKind.PLAIN, new Coordinates(2, 0));
    let plot3:Plot = new Plot(PlotKind.PLAIN, new Coordinates(2, 2));
    game.plot = new Plot(PlotKind.PLAIN, new Coordinates(0, 0));
    game.region = new Region([[game.plot]]);
    game.availableAction = AvailableAction.CONQUER;
    let lord:Lord = new Lord();
    lord.name = 'Bonnie';
    lord.domain = [plot1, plot2, plot3];
    game.lords = [lord];
    game.lord = lord;
    game.politics = new PoliticsFactory().fromLords(3, game.lords);
    return game;
};