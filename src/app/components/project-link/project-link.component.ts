import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  Input,
  signal,
} from '@angular/core';

import { RouterLink } from '@angular/router';
import { OverlayHints } from '../../ui-overlay';
import { scrolled } from '../../ui-signals';

@Component({
  selector: 'app-project-link',
  templateUrl: './project-link.component.html',
  styleUrls: ['./project-link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
})
export class ProjectLinkComponent {
  thumbnailSrc = input<string>();
  link = input.required<string>();
  heading = input.required<string>();
  subheading = input.required<string>();
  disabled = input(false, { transform: booleanAttribute });

  private _scrolled = scrolled();
  protected _overlayHints = computed(() => {
    this._scrolled();
    return {
      overlayOffset: (this._elRef.nativeElement as HTMLElement).getBoundingClientRect().top,
    };
  });

  constructor(private _elRef: ElementRef) {}
}
