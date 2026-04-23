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

export interface VisibilityInfo {
  visible: boolean;
  visibleRatio: number;
}

/**
 * TODO doc
 * @param element
 * @param fn
 */
export function visibilityChanged(
  element: Signal<ElementRef<HTMLElement>>,
  fn: (visibilityInfo: VisibilityInfo) => void,
) {
  let intersectionObserver: IntersectionObserver | undefined;
  const injector = inject(Injector);

  const teardown = () => {
    intersectionObserver?.disconnect();
  };

  const setup = () => {
    teardown();
    if (!isPlatformBrowser(injector.get(PLATFORM_ID))) return;

    intersectionObserver = new IntersectionObserver((entries) => {
      const entry = entries?.at(0);

      fn({
        visible: !!entry?.isIntersecting,
        visibleRatio: entry?.intersectionRatio ?? 0,
      });
    });

    intersectionObserver.observe(element().nativeElement);
  };

  afterNextRender(setup);
  watch(element, setup);
  inject(DestroyRef).onDestroy(teardown);
}
