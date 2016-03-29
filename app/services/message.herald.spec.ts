import {beforeEachProviders, describe, expect, it, inject} from 'angular2/testing';
import {MessageHerald} from './message.herald';
import {Message} from '../pieces/game/message/Message';
import {MessageLevel} from '../pieces/game/message/MessageLevel';

describe('MessageHerald', () => {

    beforeEachProviders(() => [MessageHerald]);

    describe('assert', () => {

        it('should assert a message when something happens', inject([MessageHerald], (herald:MessageHerald) => {

            var message:Message = new Message('Something happens', MessageLevel.INFO);
            herald.listen((received:Message) => {
                expect(received.value).toEqual('Something happens');
            });
            herald.assert(message);
        }));

        it('should buffer a message when something happens and first listener gets it', inject([MessageHerald], (herald:MessageHerald) => {
            var message:Message = new Message('Something happens', MessageLevel.INFO);
            herald.assert(message);
            herald.listen((received:Message) => {
                expect(received.value).toEqual('Something happens');
            });
            herald.assert(message);
        }));

    });

});