import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FileElement } from '../content.interface';
import { FilenamePipe } from '../../ui/media-fullscreen';

@Component({
  selector: 'x-file',
  templateUrl: './file.html',
  styleUrls: ['./file.css'],
  imports: [FilenamePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class File {
  @Input() src?: string;
  @Input() content?: FileElement;
}
