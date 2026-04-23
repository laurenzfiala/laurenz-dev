import {
  afterNextRender,
  DestroyRef,
  ElementRef,
  inject,
  Injector,
  PLATFORM_ID,
  Signal,
} from '@angular/core';
import { watch } from '../signals';
import { isPlatformBrowser } from '@angular/common';

/**
 * TODO doc
 * @param element
 * @param fn
 */
export function resized(
  element: Signal<ElementRef<HTMLElement>>,
  fn: (entries: ResizeObserverEntry[]) => void,
) {
  let resizeObserver: ResizeObserver | undefined;
  const injector = inject(Injector);

  const teardown = () => {
    resizeObserver?.disconnect();
  };

  const setup = () => {
    teardown();
    if (!isPlatformBrowser(injector.get(PLATFORM_ID))) return;

    resizeObserver = new ResizeObserver((entries) => {
      fn(entries);
    });

    resizeObserver.observe(element().nativeElement);
  };

  afterNextRender(setup);
  watch(element, setup);
  inject(DestroyRef).onDestroy(teardown);
}
