import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { take, takeUntil, takeWhile, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class NavComponent implements AfterViewInit {
  private _cdRef = inject(ChangeDetectorRef);
  private _destroyRef = inject(DestroyRef);

  protected _linkActivationCount = 0;
  protected _allowAnim = false;
  protected _previousLinkIndex: number | null = null;
  protected _activeLinkIndex: number | null = null;
  protected _hintActive = true;
  protected _hintLinkIndex: number | null = null;
  protected _hintDirection: 'left' | 'right' = 'left';

  ngAfterViewInit() {
    timer(2000)
      .pipe(
        take(1),
        takeWhile(() => this._hintActive),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => {
        if (this._activeLinkIndex !== null) {
          this._hintLinkIndex = this._activeLinkIndex > 0 ? 0 : 1;
          this._hintDirection = this._activeLinkIndex < this._hintLinkIndex ? 'right' : 'left';
          this._cdRef.markForCheck();
        }
      });
  }

  protected activeChange(index: number, isBeingActivated: boolean) {
    if (!isBeingActivated) {
      // we only need activation events
      return;
    } else if (!this._allowAnim && ++this._linkActivationCount > 1) {
      this._allowAnim = true;
      this._hintActive = false;
    }
    this._previousLinkIndex = this._activeLinkIndex;
    this._activeLinkIndex = index;
  }

  protected activeClass(index: number) {
    const toRight = (this._activeLinkIndex ?? 0) >= (this._previousLinkIndex ?? 0);
    if (!this._allowAnim) {
      return this._activeLinkIndex === index ? 'active' : '';
    }
    if (this._previousLinkIndex === index) {
      return `outro-${toRight ? 'right' : 'left'}`;
    } else if (this._activeLinkIndex === index) {
      return `active intro-${toRight ? 'right' : 'left'}`;
    }
    return '';
  }
}
