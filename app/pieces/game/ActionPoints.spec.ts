import {ActionPoints} from './ActionPoints';

describe('ActionPoints', () => {

    var ap1:ActionPoints;
    var ap2:ActionPoints;

    beforeEach(() => {
        ap1 = new ActionPoints(8);
        ap2 = new ActionPoints(4);
    });

    it('should have 8 as value', () => {
        expect(ap1.amount).toEqual(8);
    });

    describe('add', () => {
        it('should return 12', () => {
            expect(ap1.add(ap2).amount).toEqual(12);
        });
    });

    describe('subtract', () => {
        it('should return 4', () => {
            expect(ap1.subtract(ap2).amount).toEqual(4);
        });
    });

});