import { computed, effect, Injectable, signal } from '@angular/core';
import { InteractionService } from '../services/interaction.service';

let nextId = 0;

/**
 * Handles orchestration of global overlays.
 * Only one global overlay may be open at a time.
 */
@Injectable({ providedIn: 'root' })
export class OverlayService {
  private readonly _openOverlayId = signal<number | null>(null);
  private readonly _anyOverlayOpen = computed(() => this._openOverlayId() !== null);

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
    };
  }

  /**
   * Notify when the given overlay was opened.
   * @param overlayId overlay id
   */
  private opened(overlayId: number) {
    if (this._anyOverlayOpen() && this._openOverlayId() !== overlayId) {
      throw new Error('Another overlay is already open');
    }
    this._openOverlayId.set(overlayId);
  }

  /**
   * Notify when the given overlay was closed.
   * @param overlayId overlay id
   */
  private closed(overlayId: number) {
    if (this._anyOverlayOpen() && this._openOverlayId() !== overlayId) {
      throw new Error('Another overlay is already open');
    }
    this._openOverlayId.set(null);
  }

  /**
   * Whether any overlay is currently open.
   */
  get anyOpen() {
    return this._anyOverlayOpen;
  }
}
