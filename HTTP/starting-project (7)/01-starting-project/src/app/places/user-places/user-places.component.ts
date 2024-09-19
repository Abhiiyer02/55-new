import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { HttpClient } from '@angular/common/http';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit{
  isFetching = signal(false)
  errorMessage = signal('')
  private placesService = inject(PlacesService)
  private destroyRef = inject(DestroyRef)
  places = this.placesService.loadedUserPlaces ;
  

  ngOnInit(): void {
      this.isFetching.set(true)
      const subscription = this.placesService.loadUserPlaces().subscribe({
        
        // next:(places)=>{
        //   console.log(places)
        //   this.places.set(places)  
        // },
        complete: ()=>{
          this.isFetching.set(false)  
        },
        error:(error:Error)=>{
          this.errorMessage.set(error.message)
          this.isFetching.set(false)
        }
      })

      this.destroyRef.onDestroy(()=>{
        subscription.unsubscribe();
      })
  }
  onSelectPlace(selectedPlace:Place){
    this.placesService.removeUserPlace(selectedPlace).subscribe({
      next: (resData)=>{console.log(resData)}
    })
  }
}
