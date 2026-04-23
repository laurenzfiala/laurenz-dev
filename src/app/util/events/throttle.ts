type ThrottleFn = () => void;

/**
 * Throttle execution of the given function so it's
 * executed every x milliseconds at most.
 * Call the returned function to trigger the given function.
 * @param ms milliseconds to wait after the given function has been called
 * @param fn function to run throttled
 */
export function throttle(ms: number, fn: ThrottleFn) {
  let ticking = false;

  return () => {
    if (!ticking) {
      setTimeout(() => {
        fn();
        ticking = false;
      }, ms);

      ticking = true;
    }
  };
}

/**
 * Throttle a scroll event.
 * @see throttle
 */
export const throttleScroll = (fn: ThrottleFn) => throttle(50, fn);
