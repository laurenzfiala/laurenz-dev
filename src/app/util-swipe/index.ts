import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { PassiveEventManagerPlugin } from './passive-event-manager-plugin';

export { SwipeDirective } from './swipe.directive';
export { SwipeNavigateDirective } from './swipe-navigation.directive';

export function provideSwipe(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: EVENT_MANAGER_PLUGINS,
      useClass: PassiveEventManagerPlugin,
      multi: true,
    },
  ]);
}
