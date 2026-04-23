import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'x-info-box',
  imports: [],
  templateUrl: './info-box.html',
  styleUrl: './info-box.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoBox {
  readonly heading = input<string>();
}
