import {Directive, HostListener, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

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

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _location: Location,
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
}
