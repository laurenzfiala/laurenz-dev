import { computed, effect, Injectable, signal } from '@angular/core';
import { InteractionService } from '../services/interaction.service';

let nextId = 0;

/**
 * TODO doc
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
   * TODO
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
   * TODO
   */
  deregister(overlayId: number) {
    if (this._openOverlayId() === overlayId) {
      this.closed(overlayId);
    }
  }

  /**
   * TODO
   * @param overlayId
   */
  opened(overlayId: number) {
    if (this._anyOverlayOpen() && this._openOverlayId() !== overlayId) {
      throw new Error('Another overlay is already open');
    }
    this._openOverlayId.set(overlayId);
  }

  /**
   * TODO
   */
  closed(overlayId: number) {
    if (this._anyOverlayOpen() && this._openOverlayId() !== overlayId) {
      throw new Error('Another overlay is already open');
    }
    this._openOverlayId.set(null);
  }

  /**
   * TODO
   */
  get anyOpen() {
    return this._anyOverlayOpen;
  }
}
