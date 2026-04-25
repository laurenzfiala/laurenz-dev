import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectLink } from './project-link/project-link';
import { Heading } from '../ui/heading';
import { OverlayComponent } from '../ui/overlay';
import { RouterOutlet } from '@angular/router';

import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'x-dev',
  templateUrl: './dev.html',
  styleUrls: ['./dev.scss'],
  imports: [
    Heading,
    ProjectLink,
    OverlayComponent,
    RouterOutlet,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dev {}
