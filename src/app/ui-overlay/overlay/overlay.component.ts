import { Component, effect, inject, input, OnDestroy, signal, untracked } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { OverlayService } from '../overlay.service';
import { file } from '../../utils/content.utils';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

let nextId = 0;

/**
 * TODO
 */
@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.css',
  standalone: true,
  exportAs: 'overlay',
  imports: [CdkTrapFocus],
  host: {
    '(document:keydown.esc)': 'close($event)',
    '[style.--overlay-offset]': '_overlayOffset',
  },
})
export class OverlayComponent implements OnDestroy {
  readonly outlet = input.required<RouterOutlet>();

  protected readonly _open = signal(false);
  // TODO
  protected _overlayOffset = '25vh';
  protected _preventClose?: Event;

  private readonly _overlayRef = inject(OverlayService).register();

  constructor(private _router: Router) {
    effect(
      (onCleanup) => {
        const outlet = this.outlet();

        this._open.set(outlet.isActivated);

        const activateSub = outlet.activateEvents.subscribe(() => this._open.set(true));
        const deactivateSub = outlet.deactivateEvents.subscribe(() => this._open.set(false));

        onCleanup(() => {
          activateSub.unsubscribe();
          deactivateSub.unsubscribe();
        });
      },
      { allowSignalWrites: true },
    );

    effect(() => {
      const open = this._open();
      untracked(() => {
        if (open) {
          this._overlayRef.opened();
        } else {
          this._overlayRef.closed();
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
          this._router.lastSuccessfulNavigation?.extras.info as
            | { overlayOffset?: number }
            | undefined
        )?.overlayOffset;

        if (offset !== undefined) {
          this._overlayOffset = `${offset}px`;
        }
      });
  }

  /**
   * TODO
   * @param triggerEvent
   */
  close(triggerEvent?: Event) {
    if (!this._open()) {
      return;
    } else if (triggerEvent !== undefined && this._preventClose === triggerEvent) {
      return;
    }

    void this._router.navigateByUrl(
      `/${this.outlet().activatedRoute.parent?.snapshot.url.toString()}`,
    );
  }

  ngOnDestroy() {
    this._overlayRef.destroy();
  }
}
