import { DOCUMENT, inject, signal, Signal, WritableSignal } from '@angular/core';
import { throttleScroll } from '../events/throttle';

let scrolledS: WritableSignal<number> | null;

/**
 * Returns a {@link Signal} that changes whenever the window scroll
 * position changes.
 *
 * This function must be called within an injection context.
 *
 * You can use this to react to these events in your `effect()`
 * functions:
 * ```typescript
 * constructor() {
 *   const _windowResized = windowResized();
 *   effect(() => {
 *     _windowResized();
 *     console.log('The window was resized');
 *   });
 * }
 * ```
 */
export const scrollPosition = () => {
  const updateFn = throttleScroll(() => scrolledS?.set(window.scrollY));

  if (!scrolledS) {
    scrolledS = signal(inject(DOCUMENT).defaultView?.scrollY ?? 0);
    inject(DOCUMENT).defaultView?.addEventListener('scroll', updateFn, {
      passive: true,
    });
  }

  return scrolledS.asReadonly();
};
