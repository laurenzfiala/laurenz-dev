import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
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
  styleUrls: ['./scroll.css'],
})
export class Scroll {
  @ViewChild('scrollContainer', { static: true })
  protected _scrollContainer!: ElementRef<HTMLElement>;

  @ViewChild('scrollbarHandle', { static: true })
  protected _scrollbarHandle!: ElementRef<HTMLElement>;

  @ViewChild('scrollbarContainer', { static: true })
  protected _scrollbarContainer!: ElementRef<HTMLElement>;

  protected _scroll = false;

  private readonly _interactionService = inject(InteractionService);

  startScroll(event: MouseEvent) {
    this._scroll = true;
    this._interactionService.preventSelection();
    this.scroll(event);
  }

  protected onScroll() {
    requestAnimationFrame(() => {
      if (this._scroll) {
        return;
      }
      const scrollLeft = this._scrollContainer.nativeElement.scrollLeft;
      const scrollLeftMax = this.scrollLeftMax(this._scrollContainer.nativeElement);
      const handleLeftMax = this.nativeScrollbar.clientWidth - this.nativeHandle.clientWidth;
      const position = scrollLeft / scrollLeftMax;

      this._scrollbarHandle.nativeElement.style.left = `${position * handleLeftMax}px`;
    });
  }

  @HostListener('document:mouseup', ['$event'])
  protected endScroll(event: MouseEvent) {
    this.scroll(event);
    this._interactionService.allowSelection();
    this._scroll = false;
  }

  @HostListener('document:mousemove', ['$event'])
  protected scroll(event: MouseEvent) {
    if (!this._scroll || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const deadzone = this._scrollbarHandle.nativeElement.clientWidth / 2;
    const scrollbarContainerWidth = this.nativeScrollbar.clientWidth;
    const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
    const position = clamp(
      (event.clientX - deadzone - this.nativeScrollbar.getBoundingClientRect().x) /
        (scrollbarContainerWidth - deadzone * 2),
      0,
      1,
    );

    this._scrollContainer.nativeElement.scrollLeft =
      position * this.scrollLeftMax(this.nativeScrollContainer);
    this._scrollbarHandle.nativeElement.style.left = `${
      position * (this.nativeScrollbar.clientWidth - this.nativeHandle.clientWidth)
    }px`;
  }

  private scrollLeftMax(element: HTMLElement) {
    return element.scrollWidth - element.clientWidth;
  }

  private get nativeScrollContainer() {
    return this._scrollContainer.nativeElement;
  }

  private get nativeScrollbar() {
    return this._scrollbarContainer.nativeElement;
  }

  private get nativeHandle() {
    return this._scrollbarHandle.nativeElement;
  }
}
