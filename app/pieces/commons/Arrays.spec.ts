import {Arrays} from './Arrays';

describe('Arrays', () => {

    var obj1:Arrays = new Arrays();
    var obj2:Arrays = new Arrays();
    var obj3:Arrays = new Arrays();
    var array:Arrays[];

    beforeEach(() => {
        array = [obj1, obj2, obj3];
    });

    describe('remove', () => {

        it('should return true when value is removed', () => {
            expect(Arrays.remove(array, obj1)).toEqual(true);
        });

        it('should remove element when in array', () => {
            Arrays.remove(array, obj2);
            expect(array.indexOf(obj2)).toEqual(-1);
            expect(array.length).toEqual(2);
        });

        it('should return false when value is not in array', () => {
            expect(Arrays.remove(array, new Arrays())).toEqual(false);
        });
    });

    describe('clear', () => {

        it('should remove all elements from the array', () => {
            Arrays.clear(array);
            expect(array.length).toEqual(0);
        });

    });

    describe('copy', () => {

        it('should copy all elements from source array to new array', () => {
            var copy:Arrays[] = Arrays.copy(array);
            expect(copy).toEqual(array);
        });

    });
});