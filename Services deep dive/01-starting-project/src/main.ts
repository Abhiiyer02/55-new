import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks-list/tasks.service';
import { InjectionToken } from '@angular/core';


//alternate way to perform injection at root level
//when this is done, under the hood angular will do something(i.e the object used below) to set an injection token for the serive beong injected and injects it with the token. the token is the identifier to identify the service
bootstrapApplication(AppComponent,{
    providers:[TasksService]
}).catch((err) => console.error(err));


//generating custom injection token 
export const tasksServiceToken = new InjectionToken<TasksService>('app-tasks-service') 
bootstrapApplication(AppComponent,{
    providers : [{provide:tasksServiceToken, useClass:TasksService}] 
}).catch((err) => console.error(err));


//bootstrapApplication(AppComponent).catch((err) => console.error(err));
 