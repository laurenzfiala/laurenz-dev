import { Directive, output } from '@angular/core';

export type SwipeAxis = 'horizontal' | 'vertical';
export type SwipeDirection = 'up' | 'right' | 'down' | 'left';

export interface SwipeEvent {
  /**
   * Axis to which the swipe is locked.
   * The axis can never change during a swipe.
   */
  axis: SwipeAxis;

  /**
   * Direction between the first and the latest
   * registered touch event.
   */
  direction: SwipeDirection;

  /**
   * Distance in pixels on the swipe axis.
   * Positive means right/down,
   * negative means left/up.
   */
  distance: number;

  /**
   * True if the event is caused by a `touchend` event,
   * which means the swipe is over.
   */
  ended: boolean;
}

/**
 * Screen location during a swipe
 * (caused by touchstart or touchmove event).
 */
interface Touch {
  x: number;
  y: number;
}

/**
 * Distance in pixels between two touches.
 */
interface TouchDistance {
  x: number;
  y: number;
}

/**
 * Tracks swipes across the host element and
 * reports them via the `(swipe)` and `(swipeEnd)`.
 *
 * @see `(swipe)`
 * @see `(swipeEnd)`
 */
@Directive({
  selector: '[appSwipe]',
  host: {
    '(touchstart)': 'touchstart($event)',
    '(touchmove)': 'touchmove($event)',
    '(touchend)': 'touchend()',
  },
})
export class SwipeDirective {
  /**
   * Emits when the user is swiping.
   * Emits `null` if the swipe is aborted.
   */
  swipe = output<SwipeEvent | null>();

  /**
   * Emits when the swipe finishes successfully.
   */
  swipeEnd = output<SwipeEvent>();

  private _touchEvents: Touch[] = [];

  protected touchstart(event: TouchEvent) {
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      this._touchEvents = [{ x: touch.clientX, y: touch.clientY }];
    }
  }

  protected touchmove(event: TouchEvent) {
    if (event.touches.length !== 1 || this._touchEvents.length === 0) {
      return;
    }

    const eventTouch = event.touches[0];
    const touch = { x: eventTouch.clientX, y: eventTouch.clientY };

    this._touchEvents.push(touch);

    const e = eventFromList(this._touchEvents, false);
    this.swipe.emit(e);
  }

  protected touchend() {
    const e = eventFromList(this._touchEvents, true);
    if (e) {
      this.swipeEnd.emit(e);
    }

    this._touchEvents.splice(0, Number.POSITIVE_INFINITY);
  }
}

function eventFromList(touches: Touch[], ended: boolean): SwipeEvent | null {
  if (touches.length < 2) {
    return null;
  }

  const firstTouch = touches.at(0)!;
  const lastTouch = touches.at(-1)!;
  const swipeAxis: SwipeAxis | null = axis(firstTouch, lastTouch);

  for (let touch of touches) {
    const isOnSwipeAxis = axis(firstTouch, touch) === swipeAxis;

    if (!isOnSwipeAxis) {
      return null;
    }
  }

  const totalDistance = distance(firstTouch, lastTouch);
  const axisAlignedDistance = swipeAxis === 'horizontal' ? totalDistance.x : totalDistance.y;
  return {
    axis: swipeAxis,
    direction:
      swipeAxis === 'horizontal'
        ? axisAlignedDistance > 1
          ? 'left'
          : 'right'
        : axisAlignedDistance > 1
          ? 'down'
          : 'up',
    distance: axisAlignedDistance,
    ended,
  };
}

function distance(a: Touch, b: Touch): TouchDistance {
  return {
    x: b.x - a.x,
    y: b.y - a.y,
  };
}

function axis(a: Touch, b: Touch): SwipeAxis {
  const { x, y } = distance(a, b);
  return Math.abs(x) < Math.abs(y) ? 'vertical' : 'horizontal';
}
