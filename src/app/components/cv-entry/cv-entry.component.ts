import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { InputRange, TimelineComponent } from '../timeline/timeline.component';
import { NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { bug } from '../../utils/error.util';
import { OverlayHints } from '../../ui-overlay';

@Component({
  selector: 'app-cv-entry',
  standalone: true,
  imports: [TimelineComponent, NgTemplateOutlet, RouterLink],
  templateUrl: './cv-entry.component.html',
  styleUrl: './cv-entry.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvEntryComponent {
  readonly link = input<string>();
  readonly workRole = input.required<string>();
  readonly at = input.required<string>();
  readonly ranges = input.required<InputRange[]>();
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly muted = input(false, { transform: booleanAttribute });

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _elRef: ElementRef,
  ) {}

  protected navigate() {
    const link = this.link() ?? bug('expected link');
    const info = {
      overlayOffset: (this._elRef.nativeElement as HTMLElement).getBoundingClientRect().top,
    } as OverlayHints;

    void this._router.navigate([link], { relativeTo: this._route, info });
  }
}
