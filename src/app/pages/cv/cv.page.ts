import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CvEntryComponent } from '../../components/cv-entry/cv-entry.component';
import { HeadingComponent } from '../../components/heading/heading.component';
import { TimelineGroupDirective } from '../../components/timeline-group/timeline-group.directive';
import { RouterOutlet } from '@angular/router';
import { OverlayComponent } from '../../ui-overlay';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CvEntryComponent,
    HeadingComponent,
    TimelineGroupDirective,
    RouterOutlet,
    OverlayComponent,
  ],
})
export class CvPage {
  protected _now = new Date();
}
