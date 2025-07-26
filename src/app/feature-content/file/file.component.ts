import { Component, Input } from '@angular/core';
import { FileElement } from '../content.interface';
import { FilenamePipe } from '../../ui-media-fullscreen';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
  imports: [FilenamePipe],
})
export class FileComponent {
  @Input() src?: string;
  @Input() content?: FileElement;
}
