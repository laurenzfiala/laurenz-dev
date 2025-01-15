import { Directive, effect, input, Self, untracked, ViewContainerRef } from '@angular/core';
import { SwipeDirective, SwipeEvent } from './swipe.directive';
import { OverlayService } from '../ui-overlay';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * Allows for horizontal swiping between the given paths.
 * Listens for swipes on the host element and transforms
 * it based on the current swipe position.
 *
 * Note: Make sure a parent of the host element has
 * `overflow: hidden` to avoid overflow suring swiping.
 */
@Directive({
  selector: '[appSwipeNavigation]',
  hostDirectives: [
    {
      directive: SwipeDirective,
      outputs: ['swipe', 'swipeEnd'],
    },
  ],
  host: {
    '(swipe)': 'swipe($event)',
    '(swipeEnd)': 'swipe($event)',
  },
})
export class SwipeNavigateDirective {
  paths = input.required<string[], string>({
    alias: 'appSwipeNavigation',
    transform: (v: unknown) => String(v).split(','),
  });

  private _hostElement = this._viewContainerRef.element.nativeElement;
  private _activePath = 0;
  private _routerUrl = toSignal(
    this._router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => e.url),
    ),
  );

  constructor(
    private readonly _overlayService: OverlayService,
    private readonly _router: Router,
    @Self() private readonly _viewContainerRef: ViewContainerRef,
  ) {
    effect(() => {
      this._activePath = this.paths().findIndex((e) => this._routerUrl() === e);
    });
  }

  protected swipe(event: SwipeEvent | null) {
    if (this._overlayService.anyOpen()) {
      return;
    }

    const element = this._hostElement;
    const minDistanceToNavigate = 40;

    if (!event) {
      element.style.transform = 'none';
      element.style.opacity = '1';
      return;
    } else if (!this.canSwipe(event)) {
      return;
    }

    if (event.ended) {
      if (Math.abs(event.distance) >= minDistanceToNavigate) {
        this.navigate(event.direction === 'left' ? 'left' : 'right');
      }
      element.style.transform = 'none';
      element.style.opacity = '1';
    } else {
      element.style.transform = 'translateX(' + event.distance + 'px)';
      element.style.opacity = String(this.opacityForSwipeDistance(event.distance));
      element.classList.remove('swipe-right', 'swipe-left');
    }
  }

  private canSwipe(event: SwipeEvent) {
    if (event.axis === 'vertical') {
      return false;
    } else if (event.direction === 'left' && this._activePath === 0) {
      return false;
    } else if (event.direction === 'right' && this._activePath === this.paths().length - 1) {
      return false;
    }
    return true;
  }

  private opacityForSwipeDistance(distance: number) {
    const swipeFadeWidth = window.innerWidth / 2;

    return (
      (swipeFadeWidth - Math.max(0, Math.min(Math.abs(distance), swipeFadeWidth))) / swipeFadeWidth
    );
  }

  private navigate(direction: 'left' | 'right') {
    void this._router.navigate([
      this.paths()[direction === 'right' ? this._activePath + 1 : this._activePath - 1],
    ]);

    this._hostElement.classList.add(direction === 'right' ? 'swipe-right' : 'swipe-left');
  }
}
