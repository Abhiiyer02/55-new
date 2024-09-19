import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterState, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet,RouterLink]
})
export class UserTasksComponent /*implements OnInit*/{
  //with signals
  // userId = input.required<string>()
  // public userService = inject(UsersService)
  // // users = this.userService.users
  // userName = computed(() => this.userService.users.find(u => u.id === this.userId())?.name)
  
  //from route param
  username = input.required<string>()
  // console.log(username());
  // public userNameWithoutSignal!: string ;

  // private activatedRoute = inject(ActivatedRoute)
  // private destroRef = inject(DestroyRef)

  // ngOnInit(): void {
  //     const subscription = this.activatedRoute.paramMap.subscribe({
  //       next : (paramMap) => {this.userNameWithoutSignal = this.userService.users.find(u => u.id === paramMap.get('userId'))?.name ||  ''} 
  //     })
  //     this.destroRef.onDestroy(()=>subscription.unsubscribe)
  // }

}


// this is an alternative get username without the signal or activated route, via dynamic route params

export const resolveUsername : ResolveFn<string>= (activateRoute:ActivatedRouteSnapshot,routerState : RouterStateSnapshot) => { 
  const usersService = inject(UsersService)
  const username = usersService.users.find(u => u.id === activateRoute.paramMap.get('userId'))?.name || ''
  console.log(username)
  return username
}

export const resolvePageTitle : ResolveFn<string>= (activateRoute:ActivatedRouteSnapshot,routerState : RouterStateSnapshot) =>{

  return resolveUsername(activateRoute,routerState) + "'s Tasks"
}