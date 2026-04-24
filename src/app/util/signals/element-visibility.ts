import { ElementRef, signal, Signal } from '@angular/core';
import { visibilityChanged, VisibilityInfo } from '../events';

/**
 * TODO update doc
 */
export const elementVisibility = (element: Signal<ElementRef<HTMLElement>>) => {
  const value = signal<VisibilityInfo>({
    visible: false,
    visibleRatio: 0,
  });

  visibilityChanged(element, (visibilityInfo) => {
    value.set(visibilityInfo);
  });

  return value.asReadonly();
};
