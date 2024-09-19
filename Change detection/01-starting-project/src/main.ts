import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
// import { provideExperimentalCheckNoChangesForDebug } from '@angular/core';
// do this and remove zone.js from polyfills array in angular.json to go zoneless and revert baack to signals


bootstrapApplication(AppComponent,
    // {providers:[provideExperimentalCheckNoChangesForDebug() ]}
).catch((err) => console.error(err));
