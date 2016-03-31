import {Politics} from './Politics';
import {Lord} from './Lord';
import {Plot} from '../world/Plot';
import {PlotKind} from '../world/PlotKind';
import {PoliticsFactory} from './PoliticsFactory';
import {Coordinates} from '../world/Coordinates';

describe('Politics', () => {

    var politics:Politics;
    var lord:Lord;

    var enemy:Lord;

    var plot11:Plot = new Plot(PlotKind.CASTLE, new Coordinates(1, 1));
    var plot12:Plot = new Plot(PlotKind.PLAIN, new Coordinates(1, 2));
    var plot13:Plot = new Plot(PlotKind.PLAIN, new Coordinates(1, 3));
    var plot30:Plot = new Plot(PlotKind.PLAIN, new Coordinates(3, 0));
    var plot10:Plot = new Plot(PlotKind.FOREST, new Coordinates(1, 0));

    // domain
    // *  *  *  *
    // F  C  P  P
    // *  *  *  *
    // P  *  *  *

    beforeEach(() => {
        lord = new Lord();
        lord.domain = [plot11, plot12, plot13, plot30];
        enemy = new Lord();
        enemy.domain = [plot10];
        politics = new PoliticsFactory().fromLords(4, [lord, enemy]);
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

    describe('availableAction', () => {

        it('should return "unreachable" when dest plot is unreachable', () => {
            var dest:Coordinates = new Coordinates(3, 3);
            expect(politics.availableAction(lord, dest)).toEqual('unreachable');
        });

        it('should return "colonize" when dest plot is unsettled and adjacent to lord domain', () => {
            var dest:Coordinates = new Coordinates(0, 1);
            expect(politics.availableAction(lord, dest)).toEqual('colonize');
        });

        it('should return "conquer" when dest plot is settled by another lord and adjacent to lord domain', () => {
            var dest:Coordinates = new Coordinates(1, 0);
            expect(politics.availableAction(lord, dest)).toEqual('conquer');
        });

        it('should return "fortify" when dest plot belongs to lord', () => {
            var dest:Coordinates = new Coordinates(1, 1);
            expect(politics.availableAction(lord, dest)).toEqual('fortify');
        });

        it('should return "unreachable" when dest plot is adjacent to lonely zombie domain', () => {
            var dest:Coordinates = new Coordinates(2, 0);
            expect(politics.availableAction(lord, dest)).toEqual('unreachable');
        });

        it('should return "unreachable" when dest plot is adjacent to composite zombie domain', () => {
            var dest:Coordinates = new Coordinates(3, 2);
            var plot31:Plot = new Plot(PlotKind.MOUNTAIN, new Coordinates(3, 1));
            lord.domain.push(plot31);
            politics.domainMap[3][1] = lord;
            expect(politics.availableAction(lord, dest)).toEqual('unreachable');
        });

    });

});