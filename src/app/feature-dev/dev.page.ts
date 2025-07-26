import { Component } from '@angular/core';
import { ProjectLinkComponent } from './project-link/project-link.component';
import { HeadingComponent } from '../ui-heading';
import { OverlayComponent } from '../ui-overlay';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.page.html',
  styleUrls: ['./dev.page.css'],
  imports: [HeadingComponent, ProjectLinkComponent, OverlayComponent, RouterOutlet],
})
export class DevPage {}
