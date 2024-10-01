import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environment';
import { initializeApp } from 'firebase/app';

initializeApp(environment);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
