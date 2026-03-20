import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // Certifique-se que esse arquivo existe
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));