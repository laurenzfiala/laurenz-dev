import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core';

import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { scrollPosition } from '../../util/signals';

@Component({
  selector: 'x-project-link',
  templateUrl: './project-link.html',
  styleUrls: ['./project-link.scss'],
  imports: [RouterLink, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectLink {
  readonly thumbnailSrc = input<string>();
  readonly link = input<string>();
  readonly heading = input.required<string>();
  readonly subheading = input.required<string>();
  readonly current = input(false, { transform: booleanAttribute });

  private _elRef = inject(ElementRef, { self: true });
  private _scrollPosition = scrollPosition();
  private _navigated = toSignal(
    inject(Router).events.pipe(filter((e) => e instanceof NavigationEnd)),
  );

  protected _overlayHints = computed(() => {
    this._scrollPosition();
    this._navigated();
    return {
      overlayOffset: (this._elRef.nativeElement as HTMLElement).getBoundingClientRect().top,
    };
  });
}
