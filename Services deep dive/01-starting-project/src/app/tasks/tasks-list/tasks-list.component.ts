import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from './tasks.service';
import { TASK_STATUS_OPTIONS, Task, TaskStatusOptions, taskStatusOptionsProvider} from '../task.model';
import { tasksServiceToken } from '../../../main';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  // providers:[{
  //   provide: TASK_STATUS_OPTIONS,
  //   useValue: TaskStatusOptions
  // }]
  providers: [taskStatusOptionsProvider]
})
export class TasksListComponent {
  private selectedFilter = signal<string>('all');
  // private tasksService = inject(TasksService)
  taskStatusOptions = inject(TASK_STATUS_OPTIONS)
  private tasksService = inject(tasksServiceToken) //alternate injector
  tasks = computed(()=>{
    switch(this.selectedFilter()){
      case 'open':
        return this.tasksService.allTasks().filter(task => task.status === 'OPEN');
      case 'done':
        return this.tasksService.allTasks().filter(task => task.status === 'DONE');
      case 'in-progress':
        return this.tasksService.allTasks().filter(task => task.status === 'IN_PROGRESS');
      default:
        return this.tasksService.allTasks()
    }
  })
  // constructor(private tasksService:TasksService){
  //   // this.task
  // }

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
