import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FileElement, HeadingElement } from '../../interfaces/content.interface';
import { FilenamePipe } from '../../pipes/filename.pipe';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FilenamePipe],
})
export class FileComponent {
  @Input() src?: string;
  @Input() content?: FileElement;
}
