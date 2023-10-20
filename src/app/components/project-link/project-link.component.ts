import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-link',
  templateUrl: './project-link.component.html',
  styleUrls: ['./project-link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectLinkComponent {
  @Input() thumbnailSrc?: string;
  @Input({ required: true }) link!: string;
  @Input({ required: true }) heading!: string;
  @Input({ required: true }) subheading!: string;
}
