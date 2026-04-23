import {
  afterNextRender,
  DestroyRef,
  DOCUMENT,
  inject,
  Injector,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * TODO doc
 * @param element
 * @param fn
 */
export function windowResized(fn: (size: { width: number; height: number }) => void) {
  const injector = inject(Injector);
  const onResize = () => fn({ width: window.innerWidth, height: window.innerHeight });
  const view = inject(DOCUMENT).defaultView!;

  const teardown = () => view.removeEventListener('resize', onResize);

  const setup = () => {
    teardown();
    if (!isPlatformBrowser(injector.get(PLATFORM_ID))) return;

    view.addEventListener('resize', onResize);
  };

  afterNextRender(setup);
  inject(DestroyRef).onDestroy(teardown);
}
