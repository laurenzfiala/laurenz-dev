import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
})
export class NavComponent {
  protected _linkActivationCount = 0;
  protected _allowAnim = signal(false);
  protected _previousLinkIndex: number | null = null;
  protected _activeLinkIndex = signal<number | null>(null);

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
