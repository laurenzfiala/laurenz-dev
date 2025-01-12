import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RedirectCommand, ResolveFn, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HistoryService } from './history.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Route, RouteData } from '../util-router';
import { bug } from '../util-error';

/**
 * Navigates the user back to the previous page.
 * If the user came from off-site, this falls back to a navigation by URL.
 *
 * Use will never end up back outside the app.
 */
@Directive({
  selector: '[appBack]',
  host: {
    role: 'link',
    tabindex: '0',
  },
  exportAs: 'back',
  standalone: true,
})
export class BackDirective implements OnInit {
  /**
   * Set a URL (that may be relative or absolute)
   * where to go if the previous page was not within the application.
   */
  @Input({ required: true }) appBack!: string;

  /**
   * Set when we can use Location to go back, undefined
   * when the user came from off-site.
   * @private
   */
  private _targetUrl?: string;

  private _targetPageTitle?: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _location: Location,
    private _backService: HistoryService,
  ) {}

  @HostListener('click')
  @HostListener('keydown.enter')
  private onClick() {
    if (this.canGoBack()) {
      this._location.back();
    } else {
      void this._router.navigate([this._targetUrl ?? this.appBack], { relativeTo: this._route });
    }
  }

  ngOnInit() {
    this._targetUrl =
      this._router.lastSuccessfulNavigation?.previousNavigation?.finalUrl?.toString();

    let previousRoute = this._backService.previousRoute();
    const currentRouteUrl = this._route.snapshot.url.join('/');
    if (previousRoute?.url.join('/').startsWith(currentRouteUrl)) {
      // if previous route was a child route -> ignore
      previousRoute = undefined;
    }

    void (async () => {
      const targetPageTitle = await this.resolveTitle(
        (previousRoute?.data as RouteData | undefined)?.title ??
          this.findParentRoute()?.data?.title ??
          bug(),
      );

      if (targetPageTitle instanceof RedirectCommand) {
        bug('redirect command is not supported for back button titles');
      }

      this._targetPageTitle = targetPageTitle;
    })();
  }

  /**
   * Finds the route associated with the `parentPageId` of the activated route data.
   * @returns the parent route of null if none was found or no parent was specified
   * @private
   */
  private findParentRoute(): Route | null {
    const data = this._route.snapshot.data as RouteData;
    const parentPageId = data.parentPageId;

    if (parentPageId === undefined) {
      return null;
    }

    // TODO check all routes
    return (
      (this._router.config.at(0)!.children as Route[]).find((route) => {
        return route.data?.pageId && route.data.pageId === parentPageId;
      }) ?? null
    );
  }

  private async resolveTitle(
    title: string | ResolveFn<string | undefined>,
  ): Promise<string | RedirectCommand | undefined> {
    const route = this._route.snapshot;
    const routerState = this._router.routerState.snapshot;

    if (typeof title === 'string') {
      return title;
    }
    const result = title(route, routerState);

    if (typeof result === 'string') {
      return Promise.resolve(result);
    } else if (result instanceof Observable) {
      return firstValueFrom(result);
    } else {
      return result;
    }
  }

  /**
   * Determines whether we can go back using Location.back().
   * Going back may only happen if (1) there is
   * @returns `true` if a subsequent call to Location.back() would navigate to a parent page within the app.
   *          `false` if going back would navigate outside the app or to a sub-route.
   * @private
   */
  private canGoBack() {
    // URL of the last navigation known to the Angular router
    const lastNavigationUrl =
      this._router.lastSuccessfulNavigation?.previousNavigation?.finalUrl?.toString();

    // URL of the activated route (where this directive resides)
    const activatedRouteUrl = `/${this._route.snapshot.url.join('/')}`;

    return !!lastNavigationUrl && !lastNavigationUrl.startsWith(activatedRouteUrl);
  }

  get targetPageTitle() {
    return this._targetPageTitle;
  }
}
