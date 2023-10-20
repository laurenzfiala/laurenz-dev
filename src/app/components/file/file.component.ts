import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FileElement, HeadingElement } from '../../interfaces/content.interface';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileComponent {
  @Input() src?: string;
  @Input() content?: FileElement;
}
