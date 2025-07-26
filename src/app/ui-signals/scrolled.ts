import {
  DestroyRef,
  DOCUMENT,
  ElementRef,
  inject,
  Renderer2,
  type Signal,
  signal,
} from '@angular/core';

/**
 * Call this to receive a {@link Signal} that changes after the given
 * element is scrolled (`scrollend`-event).
 *
 * This function must be called within an injection context.
 *
 * You can use this to react to these events in your `effect()`
 * functions:
 * ```typescript
 * constructor() {
 *   const _scrolled = scrolled();
 *   effect(() => {
 *     _scrolled();
 *     console.log('The body element was scrolled');
 *   });
 * }
 * ```
 * @param scrollElement scroll element to observe; if omitted, `body` is observed
 */
export const scrolled = (scrollElement?: ElementRef) => {
  const scrollEl = scrollElement?.nativeElement ?? inject(DOCUMENT).defaultView;
  const counter = signal(0);

  const unlistenFn = inject(Renderer2).listen(scrollEl, 'scrollend', () => {
    counter.update((v) => v + 1);
  });

  inject(DestroyRef).onDestroy(() => {
    unlistenFn();
  });

  return counter.asReadonly();
};
