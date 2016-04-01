import {Lord} from './Lord';
import {ActionPoints} from './ActionPoints';
import {Plot} from '../world/Plot';
import {PlotKind} from '../world/PlotKind';
import {Coordinates} from '../world/Coordinates';

describe('Lord', () => {

    var lord:Lord;

    beforeEach(() => {
        lord = new Lord();
        lord.treasure = 100;
        lord.name = 'Lordy';
        lord.domain = [new Plot(PlotKind.FOREST, new Coordinates(1, 2))];
        lord.actionPoints = new ActionPoints(9);
    });

    it('should have potential 5', () => {
        expect(lord.potential).toEqual(new ActionPoints(5));
    });

    describe('save', () => {

        beforeEach(() => {
            lord.save();
        });

        it('should have 190 bessy in treasure', () => {
            expect(lord.treasure).toEqual(190);
        });

        it('should have no remaining action points', () => {
            expect(lord.actionPoints).toEqual(new ActionPoints(0));
        });

    });

    describe('farm', () => {

        beforeEach(() => {
            lord.farm();
        });

        it('should farm 5 action points', () => {
            expect(lord.actionPoints).toEqual(new ActionPoints(5));
        });

    });

    describe('gain', () => {

        let plot:Plot;

        beforeEach(() => {
            plot = new Plot(PlotKind.CASTLE, null);
            lord.gain(plot);
        });

        it('should add new plot to domain', () => {
            expect(lord.domain.indexOf(plot)).toEqual(1);
        });

        it('update potential', () => {
            expect(lord.potential).toEqual(new ActionPoints(6));
        });

    });

    describe('lose', () => {

        let plot:Plot;

        beforeEach(() => {
            plot = new Plot(PlotKind.CASTLE, null);
            lord.domain.push(plot);
            lord.lose(plot);
        });

        it('should remove plot from domain', () => {
            expect(lord.domain.indexOf(plot)).toEqual(-1);
        });

        it('update potential', () => {
            expect(lord.potential).toEqual(new ActionPoints(5));
        });

    });
});