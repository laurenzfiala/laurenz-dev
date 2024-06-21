import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickA11y]',
  standalone: true,
})
export class ClickA11yDirective {
  @Output() clickA11y = new EventEmitter<Event>();

  constructor(private _elRef: ElementRef) {}

  @HostListener('click', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  click(event: Event) {
    this.clickA11y.next(event);
  }
}
