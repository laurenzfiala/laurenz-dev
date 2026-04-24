import { afterNextRender, inject, InjectionToken, Injector, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type InitFn<T> = () => { value: T; inBrowserSetup: () => void };

/**
 * TODO doc
 */
export const browserProvider = <T>(initFn: InitFn<T>) =>
  new InjectionToken<T>('', {
    providedIn: 'root',
    factory: () => {
      const init = initFn();
      const injector = inject(Injector);
      let isSetUp = false;

      const setup = () => {
        if (isSetUp || !isPlatformBrowser(injector.get(PLATFORM_ID))) return;
        isSetUp = true;

        init.inBrowserSetup();
      };

      setup();
      afterNextRender(setup);

      return init.value;
    },
  });
