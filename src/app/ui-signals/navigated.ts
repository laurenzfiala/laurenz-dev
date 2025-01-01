import { DestroyRef, inject, signal, type Signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter } from 'rxjs';

/**
 * Call this to receive a {@link Signal} that changes after every
 * {@link Router} navigation.
 *
 * This function must be called within an injection context.
 *
 * You can use this to react to these events in your `effect()`
 * functions:
 * ```typescript
 * constructor() {
 *   const _navigated = navigated();
 *   effect(() => {
 *     _navigated();
 *     console.log('The user navigated somewhere');
 *   });
 * }
 * ```
 */
export const navigated = () => {
  const counter = signal(0);

  const subscription = inject(Router)
    .events.pipe(
      filter((e) => e instanceof NavigationEnd),
      delay(1),
    )
    .subscribe(() => {
      counter.update((v) => v + 1);
    });

  inject(DestroyRef).onDestroy(() => {
    subscription.unsubscribe();
  });

  return counter.asReadonly();
};
