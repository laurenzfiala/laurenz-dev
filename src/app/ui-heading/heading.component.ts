import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HeadingElement } from '../feature-content';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
})
export class HeadingComponent {
  @Input() level: 1 | 2 = 1;
  @Input() text?: string;
  @Input() showDivider = true;
  @Input() content?: HeadingElement;
}
