import { Inject, inject, Injectable, Renderer2 } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ActivationEnd,
  CanActivateChildFn,
  EventType,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter, ReplaySubject, take, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT } from '@angular/common';
import { RouteData } from '../app.routes';

export type RouteScrollConfig = 'always' | 'never' | 'activation' | 'deactivation';

export type PendingScroll = true | 'prevent' | null;

/**
 * Gets the bottom-most child of the given route.
 * This currently only supports routes with one child.
 * @param route route to get bottom-most child from
 */
function child(route: ActivatedRouteSnapshot) {
  let current = route;
  while (!!current.firstChild) {
    current = current.firstChild;
  }

  return current;
}

function scrollDeactivate(scrollOn?: RouteScrollConfig) {
  switch (scrollOn) {
    case 'always':
    case 'deactivation':
      return true;
    case 'never':
      return 'prevent';
    default:
      return null;
  }
}

function scrollActivate(scrollOn?: RouteScrollConfig): PendingScroll {
  switch (scrollOn) {
    case 'always':
    case 'activation':
    case undefined:
      return true;
    case 'never':
      return 'prevent';
    default:
      return null;
  }
}

/**
 * TODO
 */
@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private _scrollLocations = new Map<string, number>();
  private _pendingScroll: PendingScroll = null;
  private _restoreOffset = false;

  constructor(
    router: Router,
    @Inject(DOCUMENT) private _document: Document,
  ) {
    router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      const url = router.url;
      const route = child(router.routerState.snapshot.root);
      const routeData = route.data as RouteData;

      if (event instanceof NavigationStart) {
        this._pendingScroll = scrollDeactivate(routeData.scrollOn);
        if (event.navigationTrigger === 'imperative') {
          // limitation: we don't store offset before popstate
          this._scrollLocations.set(url, _document.documentElement.scrollTop);
        }
        this._restoreOffset = event.navigationTrigger === 'popstate';
      } else if (event instanceof ActivationEnd && this._pendingScroll !== 'prevent') {
        this._pendingScroll = scrollActivate(routeData.scrollOn);

        this.doScroll(url);
      }
    });

    // TODO renderer.listen(_document.documentElement, 'resize', () => this._scrollLocations.clear());
  }

  private doScroll(url: string) {
    const top = this._pendingScroll;

    timer(0)
      .pipe(take(1))
      .subscribe(() => {
        if (top !== null && top !== 'prevent') {
          this._document.documentElement.scrollTo({
            top: this._restoreOffset ? (this._scrollLocations.get(url) ?? 0) : 0,
            behavior: 'instant',
          });
        }
      });
  }
}
