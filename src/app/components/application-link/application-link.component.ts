import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

function tagTransform(value: string): string[] {
  return value.split(',').map((v) => v.trim());
}

@Component({
  selector: 'app-application-link',
  templateUrl: './application-link.component.html',
  styleUrls: ['./application-link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationLinkComponent {
  @Input({ required: true }) heading!: string;
  @Input() subheading?: string;
  @Input({ transform: tagTransform }) tags?: string[];
}
