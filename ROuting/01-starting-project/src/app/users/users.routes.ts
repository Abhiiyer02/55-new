import { Routes} from "@angular/router";
import { resolveUserTasks, TasksComponent } from "../tasks/tasks.component";
import { confirmBeforeLeavingPage, NewTaskComponent } from "../tasks/new-task/new-task.component";
import { resolveUsername } from "./user-tasks/user-tasks.component";

export const routes:Routes =[
    {
        path:'',
        redirectTo:'tasks',
        pathMatch: 'prefix'

    },
    {
        path:'tasks',
        component: TasksComponent,
        data:{
            message:'hello there'
        },
        runGuardsAndResolvers:'always',
        resolve:{
            usertasks: resolveUserTasks
        }
    },
    {
        path:'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [confirmBeforeLeavingPage]
    }
]