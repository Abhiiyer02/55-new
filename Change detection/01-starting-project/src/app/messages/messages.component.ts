import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { MessagesListComponent } from './messages-list/messages-list.component';
import { NewMessageComponent } from './new-message/new-message.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  imports: [MessagesListComponent, NewMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
  //this is an alternative method for a component/module/element can opt in to reduce the number of time change detection is run on it. CHecl logs when you set it default and check it again after setting it to OnPush. there won't be any logs of the message component when the counter is touched

  //when onpush is set for a component, it triggers change detection only in 3 cases:
    //1.Manually triggered change detection
    //2.Inout events in this component/sub components
    //3.events in this component/sub components
})
export class MessagesComponent {
  // messages = signal<string[]>([]);

  get debugOutput() {
    console.log('[Messages] "debugOutput" binding re-evaluated.');
    return 'Messages Component Debug Output';
  }

  // onAddMessage(message: string) {
  //   this.messages.update((oldMessages) => [...oldMessages, message]);
  // }
}
