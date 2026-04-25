import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideEvents } from './util/events';
import { ScrollService } from './util/interaction';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideAppInitializer(() => {
      inject(ScrollService);
    }),
    provideEvents(),
  ],
};
