import { inject, Injectable, signal } from '@angular/core';

import { catchError, map, tap, throwError } from 'rxjs';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpCLient  = inject(HttpClient)
  private errorService = inject(ErrorService) 
  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchData(
      'http://localhost:3000/places',
      'Sometheing went wrong while fetching available places, please try again'
    )
  }

  loadUserPlaces() {
    return this.fetchData(
      'http://localhost:3000/user-places',
      'Sometheing went wrong while fetching your favorite places, please try again'
    ).pipe(
      tap((feetchedUserPlaces) =>{this.userPlaces.set(feetchedUserPlaces)})
    )
  }

  addPlaceToUserPlaces(place:Place) {
    const prevPlaces = this.userPlaces()

    if(!prevPlaces.some(p => p.id === place.id)){
      this.userPlaces.set([...prevPlaces,place])
    }
    // this.userPlaces.update(prevPlaces=>[...prevPlaces, place])
    return this.httpCLient
      .put('http://localhost:3000/user-places', {
        placeId:place.id,
      }).pipe(
        catchError((err)=>{
          this.errorService.showError('Place could not be added')
          return throwError(()=>{new Error('Place could not be added')})
        })
      )
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces()
    if(prevPlaces.some(p => p.id === place.id)){
      this.userPlaces.set(prevPlaces.filter(p => p.id !== place.id))
    }
    // prevPlaces.filter(p => p.id !== place.id)
    return this.httpCLient.delete(`http://localhost:3000/user-places/${place.id}`).pipe(
      catchError((err)=>{
        this.errorService.showError('Place could not be deleted')
        return throwError(()=>{new Error('Place could not be deleted')})
      })
    )
  }

  private fetchData(url:string,errorMessage:string){
    return this.httpCLient.get<{places:Place[]}>(url,{
      // observe:'response'
      //you can also log events
      //observe:'events'
    }).pipe(
      map((resData)=>resData.places),
      catchError((error)=> {
        console.log(error)
        return throwError(()=>{
          new Error(errorMessage)
        })
      })
    )
  }
}
