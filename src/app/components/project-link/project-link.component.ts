import { booleanAttribute, ChangeDetectionStrategy, Component, input, Input } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-link',
  templateUrl: './project-link.component.html',
  styleUrls: ['./project-link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
})
export class ProjectLinkComponent {
  @Input() thumbnailSrc?: string;
  @Input({ required: true }) link!: string;
  @Input({ required: true }) heading!: string;
  @Input({ required: true }) subheading!: string;
  disabled = input(false, { transform: booleanAttribute });
}
