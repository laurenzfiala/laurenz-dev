import {
  DestroyRef,
  ElementRef,
  inject,
  Renderer2,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

let resizedS: WritableSignal<number> | null;

/**
 * Call this to receive a {@link Signal} that changes whenever the window
 * is resized.
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
 * @param observeElement element to observe; if omitted, `body` is observed
 */
export const windowResized = () => {
  if (!resizedS) {
    resizedS = signal(0);
    inject(DOCUMENT).defaultView?.addEventListener('resize', () => resizedS!.update((v) => v + 1));
  }

  return resizedS.asReadonly();
};
