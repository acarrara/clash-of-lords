import {ActionPoints} from '../ActionPoints';
import {Lord} from '../Lord';
import {Plot} from '../../world/Plot';
import {PlotKind} from '../../world/PlotKind';
import {Politics} from '../Politics';
import {AvailableAction} from './AvailableAction';
import {Coordinates} from '../../world/Coordinates';
import {ActionCost} from './ActionCost';

describe('ActionCost', () => {
    describe('evaluate', () => {

        let lord:Lord;
        let plot01:Plot;
        let plot10:Plot;
        let plot12:Plot;

        let politics:Politics;
        let availableAction:AvailableAction;
        let actionCost:ActionCost;

        beforeEach(() => {
            let castlePlot:Plot = new Plot(PlotKind.CASTLE, new Coordinates(1, 1));
            plot01 = new Plot(PlotKind.PLAIN, new Coordinates(0, 1));
            plot10 = new Plot(PlotKind.PLAIN, new Coordinates(1, 0));
            plot12 = new Plot(PlotKind.PLAIN, new Coordinates(1, 2));

            lord = new Lord();
            lord.actionPoints = new ActionPoints(5);
            lord.domain = [castlePlot, plot12];

            let enemy:Lord = new Lord();
            enemy.domain = [plot01];

            politics = new Politics();
            politics.setDimension(3);
            politics.domainMap[1][1] = lord;
            politics.domainMap[0][1] = enemy;
            politics.domainMap[1][2] = lord;
        });

        it('should return 0 when no action is selected', () => {
            availableAction = AvailableAction.UNREACHABLE;
            actionCost = new ActionCost(availableAction.costCoefficient);
            expect(actionCost.evaluate(undefined)).toEqual(new ActionPoints(0));
        });

        describe('colonize', () => {

            beforeEach(() => {
                availableAction = AvailableAction.COLONIZE;
                actionCost = new ActionCost(availableAction.costCoefficient);
            });

            it('should return 4', () => {
                expect(actionCost.evaluate(plot10)).toEqual(new ActionPoints(1));
            });

        });

        describe('conquer', () => {

            beforeEach(() => {
                availableAction = AvailableAction.CONQUER;
                actionCost = new ActionCost(availableAction.costCoefficient);
            });

            it('should return 2', () => {
                expect(actionCost.evaluate(plot01)).toEqual(new ActionPoints(3));
            });

        });

        describe('fortify', () => {

            beforeEach(() => {
                availableAction = AvailableAction.FORTIFY;
                actionCost = new ActionCost(availableAction.costCoefficient);
            });

            it('return 4', () => {
                expect(actionCost.evaluate(plot12)).toEqual(new ActionPoints(1));
            });

        });

    });
});