import { booleanAttribute, Component, computed, ElementRef, input } from '@angular/core';
import { InputRange, TimelineComponent } from '../../ui-timeline';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { navigated, scrolled } from '../../ui-signals';

@Component({
  selector: 'app-cv-entry',
  imports: [TimelineComponent, NgTemplateOutlet, RouterLink],
  templateUrl: './cv-entry.component.html',
  styleUrl: './cv-entry.component.css',
})
export class CvEntryComponent {
  readonly link = input<string>();
  readonly workRole = input.required<string>();
  readonly at = input.required<string>();
  readonly ranges = input.required<InputRange[]>();
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly muted = input(false, { transform: booleanAttribute });

  private _scrolled = scrolled();
  private _navigated = navigated();
  protected _overlayHints = computed(() => {
    this._scrolled();
    this._navigated();
    return {
      overlayOffset: (this._elRef.nativeElement as HTMLElement).getBoundingClientRect().top,
    };
  });

  constructor(private _elRef: ElementRef) {}
}
