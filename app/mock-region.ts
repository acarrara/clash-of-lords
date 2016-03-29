import {Save} from './pieces/game/Save';
import {PlotKind} from './pieces/world/PlotKind';
import {Plot} from './pieces/world/Plot';
import {Coordinates} from './pieces/world/Coordinates';
import {Lord} from './pieces/game/Lord';

var lord0:Lord = new Lord();
lord0.name = 'Bonnie';
lord0.domain = [new Plot(PlotKind.CASTLE, new Coordinates(3, 11))];

var lord1:Lord = new Lord();
lord1.name = 'Clyde';
lord1.domain = [
    new Plot(PlotKind.CASTLE, new Coordinates(17, 13)),
    new Plot(PlotKind.PLAIN, new Coordinates(16, 13)),
    new Plot(PlotKind.PLAIN, new Coordinates(16, 12)),
    new Plot(PlotKind.PLAIN, new Coordinates(17, 12)),
    new Plot(PlotKind.PLAIN, new Coordinates(18, 13))
];

var lord2:Lord = new Lord();
lord2.name = 'Gigi';
lord2.domain = [
    new Plot(PlotKind.CASTLE, new Coordinates(10, 10))
];

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
    '["f","f","f","f","f","p","p","p","p","p","c","p","p","p","p","p","w","w","w","w"],' +
    '["m","f","f","f","f","f","p","p","p","p","p","p","p","p","p","w","w","w","w","w"],' +
    '["m","m","f","m","f","f","p","p","p","p","p","p","p","p","w","w","w","w","w","w"],' +
    '["m","m","m","m","m","f","f","p","p","p","p","p","p","p","w","w","w","w","w","w"],' +
    '["m","m","m","m","m","m","f","p","p","p","p","p","p","w","w","w","w","w","w","w"],' +
    '["m","m","m","m","f","f","f","p","p","p","p","p","p","p","w","w","w","w","w","w"],' +
    '["m","m","m","f","f","p","p","p","p","p","p","p","p","p","p","w","w","w","w","w"],' +
    '["m","f","f","f","p","p","p","p","p","p","p","p","p","c","p","w","p","p","w","p"],' +
    '["m","f","f","p","p","p","p","p","p","f","f","p","p","p","p","p","p","p","p","p"],' +
    '["f","f","f","f","p","p","p","p","p","f","f","f","f","p","p","p","p","f","f","p"]]',
    lords: [lord0, lord1, lord2]
};
