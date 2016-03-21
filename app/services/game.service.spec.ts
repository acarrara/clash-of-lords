import {
    beforeEachProviders,
    beforeEach,
    describe,
    expect,
    it,
    inject
} from 'angular2/testing';

import {GameService} from './game.service';
import {RegionFactory} from '../pieces/world/RegionFactory';
import {Politics} from '../pieces/game/Politics';
import {Lord} from '../pieces/game/Lord';

describe('GameService', () => {

    beforeEachProviders(() => [GameService]);

    it('should have region factory set', inject([GameService], (gameService:GameService) => {
        expect(gameService.regionFactory).toEqual(new RegionFactory());
    }));

    it('should have politics set', inject([GameService], (gameService:GameService) => {
        expect(gameService.politics).toEqual(new Politics());
    }));

    describe('isDirections()', () => {

        beforeEach(inject([GameService], (gameService:GameService) => {
            var mockPolitics:Politics = new Politics();
            mockPolitics.setDimension(2);
            mockPolitics.domainMap[0][0] = new Lord();

            gameService.politics = mockPolitics;
        }));

        it('should return false when is not right', inject([GameService], (gameService:GameService) => {
            expect(gameService.isRight(1, 0)).toEqual(false);
        }));

        it('should return true when is right', inject([GameService], (gameService:GameService) => {
            expect(gameService.isRight(0, 0)).toEqual(true);
        }));

        it('should return true when is right with another lord', inject([GameService], (gameService:GameService) => {
            gameService.politics.domainMap[0][1] = new Lord();
            expect(gameService.isRight(0, 0)).toEqual(true);
        }));

        it('should return false when is not left', inject([GameService], (gameService:GameService) => {
            expect(gameService.isLeft(1, 0)).toEqual(false);
        }));

        it('should return true when is left', inject([GameService], (gameService:GameService) => {
            expect(gameService.isLeft(0, 0)).toEqual(true);
        }));

        it('should return false when is not top', inject([GameService], (gameService:GameService) => {
            expect(gameService.isTop(1, 0)).toEqual(false);
        }));

        it('should return true when is top', inject([GameService], (gameService:GameService) => {
            expect(gameService.isTop(0, 0)).toEqual(true);
        }));

        it('should return false when is not bottom', inject([GameService], (gameService:GameService) => {
            expect(gameService.isBottom(1, 0)).toEqual(false);
        }));

        it('should return true when is bottom', inject([GameService], (gameService:GameService) => {
            expect(gameService.isBottom(0, 0)).toEqual(true);
        }));
    });
});
