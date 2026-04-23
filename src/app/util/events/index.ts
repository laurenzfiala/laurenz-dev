import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { PassiveEventManagerPlugin } from './passive-event-manager-plugin';

export * from './resized';
export * from './visibility-changed';
export * from './throttle';
export * from './window-resized';

export function provideEvents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: EVENT_MANAGER_PLUGINS,
      useClass: PassiveEventManagerPlugin,
      multi: true,
    },
  ]);
}
