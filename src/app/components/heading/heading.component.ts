import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HeadingElement } from '../../interfaces/content.interface';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class HeadingComponent {
  @Input() level: 1 | 2 = 1;
  @Input() text?: string;
  @Input() showDivider = true;
  @Input() showSticky = false;
  @Input() content?: HeadingElement;
}
