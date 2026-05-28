import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Item } from './item/item';
import { ShelfItem } from './types';
import { Details } from './details/details';
import { id } from './helpers';

const SWIPE_MIN_DISTANCE = 10;
const WHEEL_DEBOUNCE_MS = 150;
const SCROLL_OFFSET = 40;

@Component({
  selector: 'x-shelf',
  imports: [Item, Details],
  templateUrl: './shelf.html',
  styleUrl: './shelf.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shelf {
  protected readonly _items = signal<ShelfItem[]>([]);
  protected readonly _selectedItem = signal<ShelfItem | undefined>(undefined);
  protected readonly _currentIndex = signal(0);
  protected readonly _itemCount = computed(() => this._items().length);

  protected _itemList = viewChild.required<ElementRef<HTMLElement>>('itemList');

  private _touchStartX = 0;
  private _touchStartY = 0;
  private _wheelTimeout: ReturnType<typeof setTimeout> | undefined;

  private readonly _destroyRef = inject(DestroyRef);

  constructor() {
    void this.load();

    afterNextRender(() => {
      const el = this._itemList().nativeElement;
      const onWheel = (e: WheelEvent) => this._onWheel(e);
      el.addEventListener('wheel', onWheel, { passive: false });
      this._destroyRef.onDestroy(() => {
        el.removeEventListener('wheel', onWheel);
        if (this._wheelTimeout !== undefined) clearTimeout(this._wheelTimeout);
      });
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

  protected select(item: ShelfItem, itemEl: HTMLElement) {
    this._selectedItem.set(item);
    const index = this._items().indexOf(item);
    if (index >= 0) this.scrollToIndex(index);
    else this.scrollToElement(itemEl);
  }

  protected scrollToIndex(index: number) {
    const count = this._itemCount();
    if (count === 0) return;
    const clamped = Math.max(0, Math.min(count - 1, index));
    this._currentIndex.set(clamped);

    const items = this._itemList().nativeElement.querySelectorAll<HTMLElement>('.item');
    const target = items[clamped];
    if (target) this.scrollToElement(target);
  }

  private scrollToElement(el: HTMLElement) {
    this._itemList().nativeElement.scroll({
      left: el.offsetLeft - SCROLL_OFFSET,
      behavior: 'smooth',
    });
  }

  protected _onTouchStart(e: TouchEvent) {
    const t = e.touches[0];
    if (!t) return;
    this._touchStartX = t.clientX;
    this._touchStartY = t.clientY;
  }

  protected _onTouchEnd(e: TouchEvent) {
    const t = e.changedTouches[0];
    if (!t) return;
    const dx = t.clientX - this._touchStartX;
    const dy = t.clientY - this._touchStartY;
    if (Math.abs(dx) < SWIPE_MIN_DISTANCE) return;
    if (Math.abs(dx) < Math.abs(dy)) return;
    this.scrollToIndex(this._currentIndex() + (dx < 0 ? 1 : -1));
  }

  private _onWheel(e: WheelEvent) {
    e.preventDefault();
    if (this._wheelTimeout !== undefined) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (delta === 0) return;
    this.scrollToIndex(this._currentIndex() + (delta > 0 ? 1 : -1));
    this._wheelTimeout = setTimeout(() => {
      this._wheelTimeout = undefined;
    }, WHEEL_DEBOUNCE_MS);
  }

  protected readonly id = id;
}
