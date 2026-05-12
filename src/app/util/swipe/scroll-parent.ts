/**
 * Returns the closest scrollable parent element of the given element.
 * @param element element to check for scrollable parent
 */
export function getScrollParent(element: HTMLElement): HTMLElement {
  let currentElement = element;

  while (true) {
    const style = getComputedStyle(currentElement);
    const hasScrollStyle = ['overflow', 'overflow-y', 'overflow-x'].some(
      (property) =>
        style.getPropertyValue(property) === 'auto' ||
        style.getPropertyValue(property) === 'scroll',
    );

    const parentElement = currentElement.parentElement;

    if (hasScrollStyle) {
      return currentElement;
    } else if (!parentElement) {
      break;
    }

    currentElement = parentElement;
  }

  return document.documentElement;
}
