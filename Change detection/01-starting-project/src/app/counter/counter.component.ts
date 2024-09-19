import { Component, inject, NgZone, OnInit, signal } from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
})
export class CounterComponent implements OnInit{
  count = signal(0); 
  private zone = inject(NgZone)
  ngOnInit(): void {
      setTimeout(() => {this.count.set(2)},5000)

      // setTimeout(() => {
      //   console.log("TImer Expired!")
      // },5000)

      //note that timers are provided by the browser and not angular, but still zone.js run change detection when a timer expires. so inorder to prevent zone.js from running unwanted change detection, you can exclude the logic using this:
      // (note, once you use this exclusion logic, you will not be seeing any change detection logs in the console)
      
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          // now only the first timer will trigger change detection, but not the second timer
          console.log("TImer Expired!")
        },5000)
      })
  }

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
