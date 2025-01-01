import { computed, effect, Injectable, signal } from '@angular/core';
import { InteractionService } from '../services/interaction.service';

let nextId = 0;

/**
 * Handles orchestration of global overlays.
 * Only one global overlay may be open at a time.
 */
@Injectable({ providedIn: 'root' })
export class OverlayService {
  private readonly _openOverlayIds = signal<readonly number[]>([]);
  private readonly _primaryOpenOverlayId = computed(() => this._openOverlayIds().at(-1));
  private readonly _anyOverlayOpen = computed(() => this._openOverlayIds().length > 0);

  constructor(interactionService: InteractionService) {
    effect(() => {
      if (this._anyOverlayOpen()) {
        interactionService.preventScroll();
      } else {
        interactionService.allowScroll();
      }
    });
  }

  /**
   * Register a new global overlay.
   */
  register() {
    const id = nextId++;

    return {
      id,
      opened: () => this.opened(id),
      closed: () => this.closed(id),
      destroy: () => this.closed(id),
      isPrimary: computed(() => this._primaryOpenOverlayId() === id),
    };
  }

  /**
   * Notify when the given overlay was opened.
   * @param overlayId overlay id
   */
  private opened(overlayId: number) {
    const givenOverlayAlreadyOpen =
      this._openOverlayIds().find((id) => id === overlayId) !== undefined;
    if (this._anyOverlayOpen() && givenOverlayAlreadyOpen) {
      throw new Error('The overlay is already open');
    }

    this._openOverlayIds.update((ids) => [...ids, overlayId]);
  }

  /**
   * Notify when the given overlay was closed.
   * @param overlayId overlay id
   */
  private closed(overlayId: number) {
    this._openOverlayIds.update((ids) => ids.filter((id) => id !== overlayId));
  }

  /**
   * Whether any overlay is currently open.
   */
  get anyOpen() {
    return this._anyOverlayOpen;
  }
}
