import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolvePageTitle, resolveUsername, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import {routes as userRoutes } from "./users/users.routes"
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";



export const canMatchTest : CanMatchFn = (route,segments) =>{
    const router = inject(Router)
    if(Math.random()<0.5){
        return true
    }
    return new RedirectCommand(router.parseUrl('/nothing'))
}

export const routes : Routes = [
    {
        path: '',
        component: NoTaskComponent,
        title: 'No Tasks Found'
    },
    {
        path:'users/:userId',
        component: UserTasksComponent,
        children: userRoutes,
        resolve:{
            username: resolveUsername
        },
        title:resolvePageTitle,
        // canMatch: [canMatchTest]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]