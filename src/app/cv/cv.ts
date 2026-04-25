import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CvEntry } from './cv-entry/cv-entry';
import { Heading } from '../ui/heading';
import { TimelineGroup } from '../ui/timeline';
import { RouterOutlet } from '@angular/router';
import { OverlayComponent } from '../ui/overlay';

@Component({
  selector: 'x-cv',
  templateUrl: './cv.html',
  styleUrl: './cv.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CvEntry, Heading, TimelineGroup, RouterOutlet, OverlayComponent],
})
export class Cv {
  protected _now = new Date();
  protected readonly Heading = Heading;
  protected readonly TimelineGroup = TimelineGroup;
  protected readonly OverlayComponent = OverlayComponent;

  constructor() {
    console.log(this.Heading, this.TimelineGroup, this.OverlayComponent);
  }
}
