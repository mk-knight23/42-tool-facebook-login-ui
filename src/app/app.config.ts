import { ApplicationConfig, provideBrowserGlobalErrorListeners, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GlobalErrorHandler } from './core/handlers/global-error.handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};
