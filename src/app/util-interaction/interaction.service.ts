import { DOCUMENT, Inject, Injectable } from '@angular/core';

/**
 * Modifies/toggles user interactions with the page.
 */
@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  private static readonly CLASS_PREFIX = 'interaction-disable';
  private static readonly SELECTION_CLASS = `${InteractionService.CLASS_PREFIX}-user-select`;
  private static readonly SCROLL_CLASS = `${InteractionService.CLASS_PREFIX}-scroll`;

  constructor(@Inject(DOCUMENT) private _document: Document) {}

  preventSelection() {
    this._document.body.classList.add(InteractionService.SELECTION_CLASS);
  }

  allowSelection() {
    this._document.body.classList.remove(InteractionService.SELECTION_CLASS);
  }

  preventScroll() {
    this._document.body.classList.add(InteractionService.SCROLL_CLASS);
  }

  allowScroll() {
    this._document.body.classList.remove(InteractionService.SCROLL_CLASS);
  }
}
