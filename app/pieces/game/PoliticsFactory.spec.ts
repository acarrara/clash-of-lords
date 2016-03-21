import {PoliticsFactory} from './PoliticsFactory';
import {Politics} from './Politics';
import {Plot} from '../world/Plot';
import {PlotKind} from '../world/PlotKind';
import {Lord} from './Lord';
import {Coordinates} from '../world/Coordinates';

describe('PoliticsFactory', () => {

    var bonnie:Lord = {
        name: 'Bonnie',
        domain: {
            plots: [
                new Plot(PlotKind.CASTLE, new Coordinates(1, 0))
            ]
        }
    };

    describe('fromLords()', () => {

        it('should load the politics', () => {

            var lords:Lord[] = [bonnie];

            var politicsFactory:PoliticsFactory = new PoliticsFactory();
            var expected:Politics = new Politics();
            expected.setDimension(2);
            expected.domainMap[1][0] = bonnie;
            var dimension:number = 2;
            var actual:Politics = politicsFactory.fromLords(dimension, lords);

            expect(actual).toEqual(expected);
        });

    });

});