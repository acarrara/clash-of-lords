import {Politics} from './Politics';
import {Lord} from './Lord';
import {Plot} from '../world/Plot';
import {PlotKind} from '../world/PlotKind';
import {PoliticsFactory} from './PoliticsFactory';
import {Coordinates} from '../world/Coordinates';

describe('Politics', () => {

    var politics:Politics;
    var lord:Lord;

    var plot11:Plot = new Plot(PlotKind.CASTLE, new Coordinates(1, 1));
    var plot12:Plot = new Plot(PlotKind.PLAIN, new Coordinates(1, 2));
    var plot13:Plot = new Plot(PlotKind.PLAIN, new Coordinates(1, 3));
    var plot03:Plot = new Plot(PlotKind.PLAIN, new Coordinates(3, 0));

    // domain
    // *  *  *  *
    // *  C  P  P
    // *  *  *  *
    // P  *  *  *

    beforeEach(() => {
        lord = new Lord();
        lord.domain = [plot11, plot12, plot13, plot03];
        politics = new PoliticsFactory().fromLords(4, [lord]);
    });

    describe('settle', () => {

        it('should settle plot if a castle is reachable', () => {
            politics.settle(lord, new Coordinates(2, 3));
            expect(politics.lordAt(new Coordinates(2, 3))).toBe(lord);
        });

        it('should throw error if lord domain is not adjacent', () => {
            expect(() => politics.settle(lord, new Coordinates(3, 3))).toThrowError('Plot must be adjacent to your domain!');
        });

        it('should throw error if adjacent lord domain has no castle', () => {
            expect(() => politics.settle(lord, new Coordinates(3, 1))).toThrowError('Plot must be reachable from a castle!');
        });

    });

});