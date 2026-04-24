import { Injectable, signal } from '@angular/core';

/**
 * Context provider to be used to access info about the parent
 * overlay from inside of it.
 */
@Injectable()
export class Overlay {
  protected readonly _open = signal(false);
  protected _closeHandler = () => {};

  /**
   * Close the overlay.
   */
  close() {
    this._closeHandler();
  }

  /**
   * Whether the overlay is currently open.
   */
  get open() {
    return this._open.asReadonly();
  }
}

export class WriteableOverlay extends Overlay {
  setCloseHandler(closeHandler: () => void) {
    this._closeHandler = closeHandler;
  }

  setOpen(isOpen: boolean) {
    this._open.set(isOpen);
  }
}
