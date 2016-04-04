import {Objects} from './Objects';

describe('Objects', () => {

    describe('isDefined', () => {
        it('should return true when value is defined', () => {
            expect(Objects.isDefined(new Objects())).toEqual(true);
        });

        it('should return false when value is undefined', () => {
            expect(Objects.isDefined(undefined)).toEqual(false);
        });
    });

    describe('isNotDefined', () => {
        it('should return false when value is defined', () => {
            expect(Objects.isNotDefined(new Objects())).toEqual(false);
        });

        it('should return true when value is undefined', () => {
            expect(Objects.isNotDefined(undefined)).toEqual(true);
        });
    });

    describe('toNumber', () => {
        it('should return 1 when value is true', () => {
            expect(Objects.toNumber(true)).toEqual(1);
        });

        it('should return 0 when value is false', () => {
            expect(Objects.toNumber(false)).toEqual(0);
        });
    });
});