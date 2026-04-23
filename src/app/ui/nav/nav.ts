import { Component, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { scrollPosition } from '../../util/signals';

@Component({
  selector: 'x-nav',
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss'],
  imports: [RouterLink, RouterLinkActive, NgClass],
})
export class Nav {
  protected _linkActivationCount = 0;
  protected _allowAnim = signal(false);
  protected _previousLinkIndex: number | null = null;
  protected _activeLinkIndex = signal<number | null>(null);
  protected readonly _scrollPosition = scrollPosition();
  protected readonly _isSticky = computed(() => this._scrollPosition() >= 26);

  protected activeChange(index: number, isBeingActivated: boolean) {
    if (!isBeingActivated) {
      // we only need activation events
      return;
    } else if (!this._allowAnim() && ++this._linkActivationCount > 1) {
      this._allowAnim.set(true);
    }
    this._activeLinkIndex.update((value) => {
      this._previousLinkIndex = value;
      return index;
    });
  }

  protected activeClass(index: number) {
    const activeLinkIndex = this._activeLinkIndex();
    const toRight = (activeLinkIndex ?? 0) >= (this._previousLinkIndex ?? 0);

    if (!this._allowAnim()) {
      return activeLinkIndex === index ? 'active' : '';
    }

    if (this._previousLinkIndex === index) {
      return `outro-${toRight ? 'right' : 'left'}`;
    } else if (activeLinkIndex === index) {
      return `active intro-${toRight ? 'right' : 'left'}`;
    }

    return '';
  }
}
