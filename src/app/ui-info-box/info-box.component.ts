import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-info-box',
  imports: [],
  templateUrl: './info-box.component.html',
  styleUrl: './info-box.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBoxComponent {
  readonly heading = input<string>();
}
