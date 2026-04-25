import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import items from '../../content/shelf/items';
import { Item } from './item/item';
import { ShelfItem } from './types';

@Component({
  selector: 'x-shelf',
  imports: [Item],
  templateUrl: './shelf.html',
  styleUrl: './shelf.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shelf {
  // TODO import asynchonously
  protected readonly _items = signal(items);
  protected readonly _selectedItem = signal<ShelfItem | undefined>(undefined);
}
