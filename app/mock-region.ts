import {Save} from './pieces/game/Save';
import {PlotKind} from './pieces/world/PlotKind';
import {Plot} from './pieces/world/Plot';
import {Coordinates} from './pieces/world/Coordinates';

export var save:Save = {
    region: '[["m","m","m","m","m","m","m","m","f","f","f","f","f","p","p","p","p","p","f","f"],["m","m","m","m","m","m","m","f","f","f","f","p","f","p","p","w","w","p","p","f"],["m","m","m","m","m","m","m","f","f","f","p","p","p","p","p","w","w","w","p","p"],["f","m","m","m","m","m","f","f","p","p","p","c","p","p","w","w","w","w","w","p"],["f","f","f","m","m","f","f","f","p","p","p","p","p","w","w","w","w","w","w","w"],["f","f","f","f","f","f","f","p","p","p","p","p","p","p","w","w","w","w","w","w"],["f","f","f","f","f","f","p","p","p","p","p","p","p","p","p","w","w","w","w","w"],["f","f","f","f","p","p","p","p","p","p","p","p","p","p","p","p","w","w","w","w"],["m","m","f","p","p","p","p","p","p","p","p","p","p","p","p","p","p","w","w","w"],["f","f","f","f","p","p","p","p","p","p","p","p","p","p","p","p","p","w","w","w"],["f","f","f","f","f","p","p","p","p","p","p","p","p","p","p","p","w","w","w","w"],["m","f","f","f","f","f","p","p","p","p","p","p","p","p","p","w","w","w","w","w"],["m","m","f","m","f","f","p","p","p","p","p","p","p","p","w","w","w","w","w","w"],["m","m","m","m","m","f","f","p","p","p","p","p","p","p","w","w","w","w","w","w"],["m","m","m","m","m","m","f","p","p","p","p","p","p","w","w","w","w","w","w","w"],["m","m","m","m","f","f","f","p","p","p","p","p","p","p","w","w","w","w","w","w"],["m","m","m","f","f","p","p","p","p","p","p","p","p","p","p","w","w","w","w","w"],["m","f","f","f","p","p","p","p","p","p","p","p","p","c","p","w","p","p","w","p"],["m","f","f","p","p","p","p","p","p","f","f","p","p","p","p","p","p","p","p","p"],["f","f","f","f","p","p","p","p","p","f","f","f","f","p","p","p","p","f","f","p"]]',
    lords: [{
        name: 'Bonnie',
        domain: {
            plots: [new Plot(PlotKind.CASTLE, new Coordinates(3, 11))]
        }
    },
        {
            name: 'Clyde',
            domain: {
                plots: [
                    new Plot(PlotKind.CASTLE, new Coordinates(17, 13)),
                    new Plot(PlotKind.CASTLE, new Coordinates(18, 13)
                    )]
            }
        }]
};
