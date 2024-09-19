import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [AsyncPipe],//shortcut as well
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent implements OnInit{
  private messageService = inject(MessagesService)

  //Manual way to trigger change detection & unsubscribe whne not requireed when signals are not usd 
  // private cdRef = inject(ChangeDetectorRef);
  // private destroyRef = inject(DestroyRef)
  // ngOnInit(): void {
  //     const subscription = this.messageService.messages$.subscribe((messages)=>{
  //       this.messages = messages;
  //       this.cdRef.markForCheck()
  //     })
  //     this.destroyRef.onDestroy(()=>{
  //       subscription.unsubscribe();
  //     })
  // }
  // messages : string[]= []

  // without signals example to show that nessages will not appear in mesage list
  // get messages(){
  //    return this.messageService.allMessages
  // }

  // shortcut

  messages$ = this.messageService.messages$
  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
