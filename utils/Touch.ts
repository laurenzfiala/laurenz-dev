export class Touch {

  public static isTouchDevice() {
    if ("ontouchstart" in window)
      return true;

    return window.matchMedia( "(pointer: coarse)" ).matches;
  }

}
