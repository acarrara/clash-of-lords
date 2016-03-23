import {Arrays} from './Arrays';

describe('Arrays', () => {

    var obj1:Arrays = new Arrays();
    var obj2:Arrays = new Arrays();
    var array:Arrays[];

    beforeEach(() => {
        array = [obj1, obj2];
    });

    describe('remove', () => {

        it('should return true when value is removed', () => {
            expect(Arrays.remove(array, obj1)).toEqual(true);
        });

        it('should remove element when in array', () => {
            Arrays.remove(array, obj2);
            expect(array.indexOf(obj2)).toEqual(-1);
        });

        it('should return false when value is not in array', () => {
            expect(Arrays.remove(array, new Arrays())).toEqual(false);
        });
    });
});