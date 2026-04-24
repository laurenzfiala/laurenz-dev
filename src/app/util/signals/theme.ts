import { inject, signal } from '@angular/core';
import { browserProvider } from '../browser-provider';

type Theme = 'dark' | 'light';

const THEME = browserProvider(() => {
  const value = signal<Theme>('dark');

  return {
    value: value.asReadonly(),
    inBrowserSetup: () => {
      const darkThemeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
      value.set(themeFromMatcher(darkThemeMatcher));

      darkThemeMatcher.onchange = (ev) => {
        value.set(themeFromMatcher(ev));
      };
    },
  };
});

export const theme = () => inject(THEME);

function themeFromMatcher(mediaQuery: MediaQueryList | MediaQueryListEvent) {
  return mediaQuery.matches ? 'dark' : 'light';
}
