import { Component, effect, inject, input, OnDestroy, signal, untracked } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { OverlayService } from '../overlay.service';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OverlayHints } from '../hints';
import { Overlay, WriteableOverlay } from '../overlay.provider';
import { routePath } from '../../util-routes';

/**
 * Overlay component wrapping a {@link RouterOutlet}.
 * When the outlet is activated, the overlay is automatically opened.
 * When it is deactivated, the overlay is closed.
 *
 * If you want the overlay to have a custom offset to the top of the screen,
 * attach `info: {overlayOffset: ...}` - see {@link OverlayHints}.
 *
 * Example:
 * ```html
 * <app-overlay [outlet]="outlet">
 *   <router-outlet #outlet="outlet" />
 * </app-overlay>
 * ```
 */
@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.css',
  exportAs: 'overlay',
  imports: [CdkTrapFocus],
  providers: [
    {
      provide: Overlay,
      useFactory: () => new WriteableOverlay(),
    },
  ],
  host: {
    '(document:keydown.esc)': 'close($event)',
    '[style.--overlay-offset]': '_overlayOffset',
    '[class.disable-scroll]': '!_isPrimaryOverlay()',
  },
})
export class OverlayComponent implements OnDestroy {
  /**
   * Outlet triggering open/close of this overlay.
   */
  readonly outlet = input.required<RouterOutlet>();

  protected readonly _open = signal(false);
  protected _overlayOffset = '25vh';
  protected _preventClose?: Event;

  private readonly _overlayServiceRef = inject(OverlayService).register();
  private readonly _overlay = inject(Overlay, { self: true }) as WriteableOverlay;
  protected readonly _isPrimaryOverlay = this._overlayServiceRef.isPrimary;

  constructor(private _router: Router) {
    this._overlay.setCloseHandler(() => this.close());

    effect((onCleanup) => {
      const outlet = this.outlet();

      this._open.set(outlet.isActivated);

      const activateSub = outlet.activateEvents.subscribe(() => this._open.set(true));
      const deactivateSub = outlet.deactivateEvents.subscribe(() => this._open.set(false));

      onCleanup(() => {
        activateSub.unsubscribe();
        deactivateSub.unsubscribe();
      });
    });

    effect(() => {
      const open = this._open();
      untracked(() => {
        this._overlay.setOpen(open);
        if (open) {
          this._overlayServiceRef.opened();
        } else {
          this._overlayServiceRef.closed();
        }
      });
    });

    this._router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        const offset = (
          this._router.lastSuccessfulNavigation?.extras.info as OverlayHints | undefined
        )?.overlayOffset;

        if (offset !== undefined) {
          this._overlayOffset = `${offset}px`;
        }
      });
  }

  /**
   * Close the overlay by navigating to the router outlet's
   * parent route.
   * @param triggerEvent event that triggered this close action
   */
  close(triggerEvent?: Event) {
    if (!this._open() || !this._overlayServiceRef.isPrimary()) {
      return;
    } else if (triggerEvent !== undefined && this._preventClose === triggerEvent) {
      return;
    }

    void this._router.navigateByUrl(
      routePath(this.outlet().activatedRoute.parent ?? this._router.routerState.root),
    );
  }

  ngOnDestroy() {
    this._overlayServiceRef.destroy();
  }

  /**
   * Whether the overlay is currently open.
   */
  get open() {
    return this._open.asReadonly();
  }
}
