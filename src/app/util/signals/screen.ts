import { computed, inject, InjectionToken, Signal } from '@angular/core';
import { elementSize } from './element-size';

const SCREEN_MIN_WIDTHS = {
  tablet: 768,
  desktop: 1280,
  desktopHd: 1600,
  desktopUhd: 1921,
} as const;

type Breakpoint = keyof typeof SCREEN_MIN_WIDTHS;

class Screen {
  constructor(private readonly widthPx: Signal<number>) {}

  min(breakpoint: Breakpoint) {
    return SCREEN_MIN_WIDTHS[breakpoint] <= this.widthPx();
  }

  max(breakpoint: Breakpoint) {
    return SCREEN_MIN_WIDTHS[breakpoint] > this.widthPx();
  }
}

const SCREEN = new InjectionToken('', {
  providedIn: 'root',
  factory: () => {
    const documentSize = elementSize();

    return new Screen(computed(() => documentSize().width));
  },
});

export const screen = () => inject(SCREEN);
