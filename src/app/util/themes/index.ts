import {
  afterNextRender,
  EnvironmentProviders,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';

export function provideThemes(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      // TODO move to function or service
      afterNextRender(() => {
        // June
        if (new Date().getMonth() === 5) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'pride.css';
          document.head.appendChild(link);
        }
      });
    }),
  ]);
}
