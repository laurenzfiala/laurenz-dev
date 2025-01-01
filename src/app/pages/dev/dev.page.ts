import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectLinkComponent } from '../../components/project-link/project-link.component';
import { HeadingComponent } from '../../components/heading/heading.component';
import { OverlayComponent } from '../../ui-overlay';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.page.html',
  styleUrls: ['./dev.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HeadingComponent, ProjectLinkComponent, OverlayComponent, RouterOutlet],
})
export class DevPage {}
