import { DOCUMENT, ElementRef, inject, signal, Signal } from '@angular/core';
import { resized } from '../events/resized';

/**
 * TODO update doc
 * Call this to receive a {@link Signal} that changes whenever the given
 * element is resized.
 *
 * This function must be called within an injection context.
 *
 * You can use this to react to these events in your `effect()`
 * functions:
 * ```typescript
 * constructor() {
 *   const _elementSize = elementSize();
 *   effect(() => {
 *     _elementSize();
 *     console.log('The body element was resized');
 *   });
 * }
 * ```
 * @param element element to observe; if omitted, the document root `html` is observed
 */
export const elementSize = (element?: Signal<ElementRef<HTMLElement>>) => {
  const size = signal({
    width: 0,
    height: 0,
  });

  resized(element ?? signal(new ElementRef(inject(DOCUMENT).documentElement)), (entries) => {
    const element = entries?.at(0)?.target;

    size.set({
      width: element?.clientWidth ?? 0,
      height: element?.clientHeight ?? 0,
    });
  });

  return size.asReadonly();
};
