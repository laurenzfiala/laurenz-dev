import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import EmblaCarousel, { EmblaCarouselType } from 'embla-carousel';
import { Item } from './item/item';
import { ShelfItem } from './types';
import { Details } from './details/details';
import { id } from './helpers';
import { NoSwipeDirective } from '../util/swipe';

@Component({
  selector: 'x-shelf',
  imports: [Item, Details, NoSwipeDirective],
  templateUrl: './shelf.html',
  styleUrl: './shelf.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shelf {
  protected readonly _items = signal<ShelfItem[]>([]);
  protected readonly _selectedItem = signal<ShelfItem | undefined>(undefined);

  protected readonly _emblaViewport = viewChild.required<ElementRef<HTMLElement>>('emblaViewport');

  private _embla: EmblaCarouselType | undefined;
  private readonly _destroyRef = inject(DestroyRef);

  constructor() {
    void this.load();

    afterNextRender(() => {
      this._embla = EmblaCarousel(this._emblaViewport().nativeElement, {
        axis: 'x',
        align: (_, snapSize) => snapSize / 2,
      });
      this._destroyRef.onDestroy(() => this._embla?.destroy());
    });
  }

  private async load() {
    try {
      const { default: items } = await import('../../content/shelf/items');
      this._items.set(items);
    } catch (err) {
      console.error('Failed to load shelf items', err);
    }
  }

  protected select(item: ShelfItem, index: number) {
    this._selectedItem.set(item);
    this._embla?.goTo(index);
  }

  protected readonly id = id;
}
