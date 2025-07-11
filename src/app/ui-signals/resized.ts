import { DestroyRef, ElementRef, inject, Signal, signal, DOCUMENT } from '@angular/core';


/**
 * Call this to receive a {@link Signal} that changes whenever the given
 * element is resized.
 *
 * This function must be called within an injection context.
 *
 * You can use this to react to these events in your `effect()`
 * functions:
 * ```typescript
 * constructor() {
 *   const _resized = resized();
 *   effect(() => {
 *     _resized();
 *     console.log('The body element was resized');
 *   });
 * }
 * ```
 * @param observeElement element to observe; if omitted, `body` is observed
 */
export const resized = (observeElement?: ElementRef) => {
  const observeEl = observeElement?.nativeElement ?? inject(DOCUMENT).body;
  const counter = signal(0);

  const resizeObserver = new ResizeObserver(() => {
    counter.update((v) => v + 1);
  });

  resizeObserver.observe(observeEl);

  inject(DestroyRef).onDestroy(() => {
    resizeObserver.disconnect();
  });

  return counter.asReadonly();
};
