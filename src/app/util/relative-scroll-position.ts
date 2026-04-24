import { booleanAttribute, computed, Directive, input } from '@angular/core';
import { elementSize, hostElement, scrollPosition } from './signals';

/**
 * Sets the relative scroll position as `--relative-scroll-position` CSS
 * variable on the host element.
 * Relative scroll positions is given in amount of container height.
 * E.g. '-2' =~ (scroll position) + 2*(element height) = (element offsetTop)
 *
 * Note: currently this does not support host elements that change size.
 */
@Directive({
  selector: '[xRelativeScrollPosition]',
  host: {
    '[style.--relative-scroll-position]': '_relativeScrollPosition()',
  },
})
export class RelativeScrollPosition {
  /**
   * True to only allow output values of 0 pixels and greater.
   */
  readonly positiveOnly = input(false, { transform: booleanAttribute });

  protected readonly _element = hostElement();
  protected readonly _scrollPositionPx = scrollPosition();
  protected readonly _bodySize = elementSize();
  protected readonly _relativeScrollPosition = computed(() => {
    const elementPositionPx = this._element()?.offsetTop ?? 0;
    const relativePositionPx = this._scrollPositionPx() - elementPositionPx;
    const bodyHeight = this._bodySize().height;
    const elementHeightPx = this._element()?.getBoundingClientRect().height ?? 0;

    if (elementHeightPx === 0) return 0;

    const relativePosition = +(
      (relativePositionPx - elementHeightPx / 2 + bodyHeight / 2) /
      bodyHeight
    ).toFixed(3);

    if (this.positiveOnly()) {
      return Math.max(relativePosition, 0);
    }

    return relativePosition;
  });
}
