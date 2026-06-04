import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
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

  readonly _highlightMask = signal(``);

  constructor() {
    effect(() => {
      const selected = this.selected();

      if (selected) {
        this._highlightMask.set(
          `url('/imgs/shelf/item-masks/${Math.floor(Math.random() * 3) + 1}.svg')`,
        );
      }
    });
  }
}
