import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';
import { Routes } from './app.routes';
import { ScrollService } from './services/scroll.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(Routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => undefined,
      multi: true,
      deps: [ScrollService],
    },
  ],
};
