import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { InteractionService } from '../../util/interaction';

/**
 * Wraps the content in a horizontally-scrollable container with a custom scrollbar.
 *
 * #### CSS variables
 * `--scrollbar-margin-block-start`\
 * Margin top for the scrollbar. Use a negative value to move up into the scroll container.
 */
@Component({
  selector: 'x-scroll',
  templateUrl: './scroll.html',
  styleUrls: ['./scroll.scss'],
  standalone: true,
  host: {
    '(document:mouseup)': 'endScroll($event)',
    '(document:mousemove)': 'scroll($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Scroll {
  protected readonly _scrollContainer =
    viewChild.required<ElementRef<HTMLElement>>('scrollContainer');
  protected readonly _scrollbarHandle =
    viewChild.required<ElementRef<HTMLElement>>('scrollbarHandle');
  protected readonly _scrollbarContainer =
    viewChild.required<ElementRef<HTMLElement>>('scrollbarContainer');

  protected readonly _scroll = signal(false);

  private readonly _interactionService = inject(InteractionService);

  startScroll(event: MouseEvent) {
    this._scroll.set(true);
    this._interactionService.preventSelection();
    this.scroll(event);
  }

  protected onScroll() {
    requestAnimationFrame(() => {
      if (this._scroll()) {
        return;
      }
      const scrollLeft = this.nativeScrollContainer.scrollLeft;
      const scrollLeftMax = this.scrollLeftMax(this.nativeScrollContainer);
      const handleLeftMax = this.nativeScrollbar.clientWidth - this.nativeHandle.clientWidth;
      const position = scrollLeft / scrollLeftMax;

      this.nativeHandle.style.left = `${position * handleLeftMax}px`;
    });
  }

  protected endScroll(event: MouseEvent) {
    this.scroll(event);
    this._interactionService.allowSelection();
    this._scroll.set(false);
  }

  protected scroll(event: MouseEvent) {
    if (!this._scroll() || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const deadzone = this.nativeHandle.clientWidth / 2;
    const scrollbarContainerWidth = this.nativeScrollbar.clientWidth;
    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
    const position = clamp(
      (event.clientX - deadzone - this.nativeScrollbar.getBoundingClientRect().x) /
        (scrollbarContainerWidth - deadzone * 2),
      0,
      1,
    );

    this.nativeScrollContainer.scrollLeft =
      position * this.scrollLeftMax(this.nativeScrollContainer);
    this.nativeHandle.style.left = `${
      position * (this.nativeScrollbar.clientWidth - this.nativeHandle.clientWidth)
    }px`;
  }

  private scrollLeftMax(element: HTMLElement) {
    return element.scrollWidth - element.clientWidth;
  }

  private get nativeScrollContainer() {
    return this._scrollContainer().nativeElement;
  }

  private get nativeScrollbar() {
    return this._scrollbarContainer().nativeElement;
  }

  private get nativeHandle() {
    return this._scrollbarHandle().nativeElement;
  }
}
