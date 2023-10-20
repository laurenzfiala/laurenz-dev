import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HeadingElement } from '../../interfaces/content.interface';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingComponent {
  @Input() level: 1 | 2 = 1;
  @Input() text?: string;
  @Input() showDivider = true;
  @Input() showSticky = false;
  @Input() content?: HeadingElement;
}
