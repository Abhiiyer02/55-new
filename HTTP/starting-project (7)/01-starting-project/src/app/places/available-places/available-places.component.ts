// import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

// import { Place } from '../place.model';
// import { PlacesComponent } from '../places.component';
// import { PlacesContainerComponent } from '../places-container/places-container.component';
// import { HttpClient } from '@angular/common/http';
// import { catchError, map, throwError } from 'rxjs';

// @Component({
//   selector: 'app-available-places',
//   standalone: true,
//   templateUrl: './available-places.component.html',
//   styleUrl: './available-places.component.css',
//   imports: [PlacesComponent, PlacesContainerComponent],
// })
// export class AvailablePlacesComponent implements OnInit{
//   places = signal<Place[] | undefined>(undefined);
//   isFetching = signal(false)
//   errorMessage = signal('')
//   private httpCLient = inject(HttpClient)
//   private destroyRef = inject(DestroyRef)

//   ngOnInit(): void {
//     //get emits an observable and by default emits only one observable but can be made to emit more thn one value by adding objects next tot the  url
//       this.isFetching.set(true)
//       // const subscritpion = this.httpCLient.get<{places:Place[]}>("http://localhost:3000/places"
//       //   ,{  
//       //     observe:'events' // a configration obbject such that the next function is triggered with differet data, now respnse is used, simislarly 'event' can be used to trigger it iwth an HTTP event. Note that if you use 'response', you will have to access places in the boduy of the response i.e, as res.body?.places. also whne you configure next funtion to listen to events, you can see two logs - one for request and one for response}

//       // make the response into the array itself instead of a json containing array as message
//       const subscription = this.httpCLient
//         .get<{ places: Place[] }>('http://localhost:3000/places')
//         .pipe(
//           map((resData) => resData.places),
//           catchError((error) => {
//             console.log(error);
//             return throwError(
//               () =>
//                 new Error(
//                   'Something went wrong fetching the available places. Please try again later.'
//                 )
//             );
//           })
//         )
//         .subscribe({
//           next: (places) => {
//             this.places.set(places);
//           },
//           error: (error: Error) => {
//             this.errorMessage.set(error.message);
//           },
//           complete: () => {
//             this.isFetching.set(false);
//           },
//       })
//       this.destroyRef.onDestroy(()=>{
//         subscription.unsubscribe()
//       })
//   }
//   onSelectPlace(selectedPlace:Place):void{
//     this.httpCLient.put("http://localhost:3000/user-places",{
//       placedId : selectedPlace.id
//     }).subscribe({
//       next: (resData)=>console.log(resData),
//     });
//   }
// }



import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  private placesService = inject(PlacesService)
  private destroyRef = inject(DestroyRef);

  // constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.placesService.loadAvailablePlaces()
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
        error: (error: Error) => {
          this.error.set(error.message);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlace(selectedPlace: Place) {
    const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace)
      .subscribe({
        next: (resData) => console.log(resData),
      });
    
    this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
  }
}