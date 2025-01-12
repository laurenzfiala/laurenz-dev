import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CvEntryComponent } from './cv-entry/cv-entry.component';
import { HeadingComponent } from '../ui-heading';
import { TimelineGroupDirective } from '../ui-timeline';
import { RouterOutlet } from '@angular/router';
import { OverlayComponent } from '../ui-overlay';

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
