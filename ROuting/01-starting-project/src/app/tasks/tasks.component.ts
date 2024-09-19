import { Component, computed, DestroyRef, inject, Input, input, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterState, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent,RouterLink],
})
export class TasksComponent /*implements OnInit*/ {
  userId = input.required<string>()
  // activatedRoute = inject(ActivatedRoute)
  // destroyRef = inject(DestroyRef)
  // // userTasks: Task[] = [];
  order =  input<'asc'|'desc' | undefined>('asc')//signal<'asc'|'desc' | 'undefined'>('asc')
  // tasksService = inject(TasksService)
  // userTasks = computed(()=> this.tasksService.allTasks().filter(task => task.userId === this.userId()).sort((a,b)=>{
  //   if(this.order() === 'desc'){
  //     return a.id > b.id ? -1:1
  //   }else{
  //     return a.id > b.id ? 1 :-1
  //   }
  // }))

  // //= this.tasksService.allTasks()
  // userTasks2 : Task[] = [];
  // public order2 :string =''

  // ngOnInit(): void {
  //     const subscription = this.activatedRoute.paramMap.subscribe({
  //       next: (paramMap) => (this.userTasks2 = this.tasksService.allTasks().filter(task => task.userId === paramMap.get('userId')))
  //     }
  //     )
  //     this.destroyRef.onDestroy(()=>subscription.unsubscribe)

  //    const subs2 = this.activatedRoute.queryParams.subscribe({
  //       next: (param) => (this.order.set(param['order']))
  //    }) 
  //    this.destroyRef.onDestroy(()=>subs2.unsubscribe)
     
  // }
  usertasks = input.required<Task[]>()
}


export const resolveUserTasks : ResolveFn<Task[] | null> = (activatedRoute : ActivatedRouteSnapshot, routerState : RouterStateSnapshot) => {

  const tasksService= inject(TasksService)
  const usertasks = tasksService.allTasks().filter(
    task => task.userId === activatedRoute.paramMap.get('userId')
  )
  const order  = activatedRoute.queryParams['order']
  if ( order && order=== 'asc'){
    usertasks.sort((a,b)=>a.id> b.id? 1:-1)
  }else{
    usertasks.sort((a,b)=>a.id>b.id? -1:1)
  }
  return usertasks.length? usertasks:[]
}