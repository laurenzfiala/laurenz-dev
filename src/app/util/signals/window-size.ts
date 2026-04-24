import { signal, Signal } from '@angular/core';
import { windowResized } from '../events';

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
 *   const _windowSize = windowSize();
 *   effect(() => {
 *     _windowSize();
 *     console.log('The window was resized');
 *   });
 * }
 * ```
 */
export const windowSize = () => {
  const size = signal({
    width: 0,
    height: 0,
  });

  windowResized((newSize) => {
    size.set(newSize);
  });

  return size.asReadonly();
};
