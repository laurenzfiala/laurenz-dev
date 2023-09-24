import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent {
  @Input() thumbnailSrc?: string;
  @Input({ required: true }) heading!: string;
  @Input({ required: true }) subheading!: string;
}
