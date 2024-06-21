import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UnfinishedComponent } from '../../components/unfinished/unfinished.component';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.page.html',
  styleUrls: ['./cv.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [UnfinishedComponent],
})
export class CvPage {}
