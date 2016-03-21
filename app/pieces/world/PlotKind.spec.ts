import {PlotKind} from './PlotKind';

describe('PlotKind', () => {

    describe('fromName()', () => {

        it('should return error when name is unknown', () => {
            expect(() => {
                PlotKind.fromName('unknown');
            }).toThrowError('Unexpected name: unknown');
        });

    });

});