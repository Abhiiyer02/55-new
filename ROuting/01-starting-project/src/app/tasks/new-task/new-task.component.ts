import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  public submitted=false
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  private router = inject(Router)
  private tasksService = inject(TasksService);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.router.navigate(['/users',this.userId(),'tasks'],{
      replaceUrl: true
    })
    this.submitted=true
  }
}
export const confirmBeforeLeavingPage : CanDeactivateFn<NewTaskComponent> = (component) =>{
  if(component.submitted){
    return true
  }
  if(component.enteredDate() || component.enteredSummary() || component.enteredTitle()){
    return window.confirm('Are you sure you wanna leave this page?')
  }
  return true
} 
