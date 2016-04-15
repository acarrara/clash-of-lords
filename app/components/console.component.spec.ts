import {beforeEach, beforeEachProviders, describe, inject, TestComponentBuilder} from 'angular2/testing';
import {ConsoleComponent} from './console.component';
import {MessageLevel} from '../pieces/game/message/MessageLevel';
import {Message} from '../pieces/game/message/Message';

describe('ConsoleComponent: component', () => {
    let tcb:TestComponentBuilder;

    beforeEachProviders(() => [
        TestComponentBuilder,
        ConsoleComponent
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));

    it('should render 2 messages ("> hello" and "> world")', done => {
        tcb.createAsync(ConsoleComponent).then(fixture => {
                let consoleComponent:ConsoleComponent = fixture.componentInstance,
                    element:any = fixture.nativeElement;
                var message1:Message = new Message('hello', MessageLevel.INFO);
                var message2:Message = new Message('world', MessageLevel.WARN);
                consoleComponent.messages = [message1, message2];
                fixture.detectChanges();
                expect(element.querySelectorAll('.message').item(0).innerHTML).toEqual('&gt; hello');
                expect(element.querySelectorAll('.message').item(1).innerHTML).toEqual('&gt; world');
                done();
            })
            .catch(e => done.fail(e));
    });
});