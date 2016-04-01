import {Save} from './pieces/game/Save';
import {PlotKind} from './pieces/world/PlotKind';
import {Plot} from './pieces/world/Plot';
import {Coordinates} from './pieces/world/Coordinates';
import {Lord} from './pieces/game/Lord';
import {ActionPoints} from './pieces/game/ActionPoints';

var lord0:Lord = new Lord();
lord0.name = 'Bonnie';
lord0.domain = [new Plot(PlotKind.CASTLE, new Coordinates(3, 11))];
lord0.actionPoints = new ActionPoints(0);

var lord1:Lord = new Lord();
lord1.name = 'Clyde';
lord1.domain = [
    new Plot(PlotKind.CASTLE, new Coordinates(17, 13)),
    new Plot(PlotKind.PLAIN, new Coordinates(16, 13)),
    new Plot(PlotKind.PLAIN, new Coordinates(16, 12)),
    new Plot(PlotKind.PLAIN, new Coordinates(17, 12)),
    new Plot(PlotKind.PLAIN, new Coordinates(18, 13))
];
lord1.actionPoints = new ActionPoints(0);

export var save:Save = {
    region: '[' +
    '["m","m","m","m","m","m","m","m","f","f","f","f","f","p","p","p","p","p","f","f"],' +
    '["m","m","m","m","m","m","m","f","f","f","f","p","f","p","p","w","w","p","p","f"],' +
    '["m","m","m","m","m","m","m","f","f","f","p","p","p","p","p","w","w","w","p","p"],' +
    '["f","m","m","m","m","m","f","f","p","p","p","c","p","p","w","w","w","w","w","p"],' +
    '["f","f","f","m","m","f","f","f","p","p","p","p","p","w","w","w","w","w","w","w"],' +
    '["f","f","f","f","f","f","f","p","p","p","p","p","p","p","w","w","w","w","w","w"],' +
    '["f","f","f","f","f","f","p","p","p","p","p","p","p","p","p","w","w","w","w","w"],' +
    '["f","f","f","f","p","p","p","p","p","p","p","p","p","p","p","p","w","w","w","w"],' +
    '["m","m","f","p","p","p","p","p","p","p","p","p","p","p","p","p","p","w","w","w"],' +
    '["f","f","f","f","p","p","p","p","p","p","p","p","p","p","p","p","p","w","w","w"],' +
    '["f","f","f","f","f","p","p","p","p","p","p","p","p","p","p","p","w","w","w","w"],' +
    '["m","f","f","f","f","f","p","p","p","p","p","p","p","p","p","w","w","w","w","w"],' +
    '["m","m","f","m","f","f","p","p","p","p","p","p","p","p","w","w","w","w","w","w"],' +
    '["m","m","m","m","m","f","f","p","p","p","p","p","p","p","w","w","w","w","w","w"],' +
    '["m","m","m","m","m","m","f","p","p","p","p","p","p","w","w","w","w","w","w","w"],' +
    '["m","m","m","m","f","f","f","p","p","p","p","p","p","p","w","w","w","w","w","w"],' +
    '["m","m","m","f","f","p","p","p","p","p","p","p","p","p","p","w","w","w","w","w"],' +
    '["m","f","f","f","p","p","p","p","p","p","p","p","p","c","p","w","p","p","w","p"],' +
    '["m","f","f","p","p","p","p","p","p","f","f","p","p","p","p","p","p","p","p","p"],' +
    '["f","f","f","f","p","p","p","p","p","f","f","f","f","p","p","p","p","f","f","p"]]',
    lords: [lord0, lord1]
};
