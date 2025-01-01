import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core';

import { RouterLink } from '@angular/router';
import { navigated, scrolled } from '../../ui-signals';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-project-link',
  templateUrl: './project-link.component.html',
  styleUrls: ['./project-link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
})
export class ProjectLinkComponent {
  thumbnailSrc = input<string>();
  link = input<string>();
  heading = input.required<string>();
  subheading = input.required<string>();
  current = input(false, { transform: booleanAttribute });

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
