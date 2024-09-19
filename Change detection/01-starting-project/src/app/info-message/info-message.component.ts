import { Component } from '@angular/core';

@Component({
  selector: 'app-info-message',
  standalone: true,
  imports: [],
  templateUrl: './info-message.component.html',
  styleUrl: './info-message.component.css',
  
})
export class InfoMessageComponent {
  get debugOutput() {
    console.log('[InfoMessages] "debugOutput" binding re-evaluated.');
    return 'InfoMessage Component Debug Output';
    // return Math.random() // in dev mode angular runs change detection twice, just to ensure that  there are no unintended changes(potential bugs) that are done once it records the results of change detection. now for ex, if you return Math.random(), it will raise an error

  }

  onLog() {
    console.log('Clicked!');
  }
}
