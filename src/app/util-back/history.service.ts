import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn } from '@angular/router';
import { ReplaySubject } from 'rxjs';

/**
 * Keeps the current and last route by listening to the router.
 * This enables looking up of data from the previous route.
 */
@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private _routeHistory: ActivatedRouteSnapshot[] = [];
  private _route$ = new ReplaySubject<ActivatedRouteSnapshot>(1);

  /**
   * Get the previously visited route, if it exists.
   */
  previousRoute(): ActivatedRouteSnapshot | undefined {
    return this._routeHistory.at(1);
  }

  /**
   * Notifies when the activated route changes.
   */
  get route$() {
    return this._route$;
  }

  private pushRoute(route: ActivatedRouteSnapshot) {
    this._routeHistory.unshift(route);
    this._routeHistory.splice(2);
    this._route$.next(route);
  }

  static canActivateApplicationChild(): CanActivateChildFn {
    return (route: ActivatedRouteSnapshot) => {
      inject(HistoryService).pushRoute(route);
      return true;
    };
  }
}
