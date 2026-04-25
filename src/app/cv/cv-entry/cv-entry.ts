import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { InputRange, Timeline } from '../../ui/timeline';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { scrollPosition } from '../../util/signals';

@Component({
  selector: 'x-cv-entry',
  imports: [Timeline, NgTemplateOutlet, RouterLink],
  templateUrl: './cv-entry.html',
  styleUrl: './cv-entry.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvEntry {
  readonly link = input<string>();
  readonly workRole = input.required<string>();
  readonly at = input.required<string>();
  readonly ranges = input.required<InputRange[]>();
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly muted = input(false, { transform: booleanAttribute });

  private readonly _elRef = inject(ElementRef, { self: true });

  private _scrollPosition = scrollPosition();
  protected _overlayHints = computed(() => {
    this._scrollPosition();
    return {
      overlayOffset: (this._elRef.nativeElement as HTMLElement).getBoundingClientRect().top,
    };
  });

  protected readonly Timeline = Timeline;
}
