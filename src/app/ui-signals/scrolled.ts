import { DestroyRef, ElementRef, inject, Renderer2, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * TODO doc
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

  return counter;
};
