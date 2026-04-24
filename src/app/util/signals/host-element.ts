import { afterNextRender, ElementRef, inject, signal, Signal } from '@angular/core';

/**
 * TODO doc
 */
export function hostElement(): Signal<HTMLElement | undefined> {
  const hostElement = signal<HTMLElement | undefined>(undefined);
  const elementRef = inject(ElementRef);

  afterNextRender(() => {
    hostElement.set(elementRef.nativeElement);
  });

  return hostElement;
}
