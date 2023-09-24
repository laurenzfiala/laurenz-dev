import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.page.html',
  styleUrls: ['./cv.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvPage {}
