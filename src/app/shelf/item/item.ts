import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ShelfItem } from '../types';

@Component({
  selector: 'x-item',
  imports: [],
  templateUrl: './item.html',
  styleUrl: './item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.selected]': 'selected()',
  },
})
export class Item {
  readonly item = input.required<ShelfItem>();
  readonly selected = input.required<boolean>();
  readonly action = output();
}
