import {Coordinates} from './Coordinates';

describe('Coordinates', () => {

    it('should equal another coordinate', () => {
        var coor01:Coordinates = new Coordinates(0, 1);
        var coor01copy:Coordinates = new Coordinates(0, 1);

        expect(coor01).toEqual(coor01copy);
    });

});