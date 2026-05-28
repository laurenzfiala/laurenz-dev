import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Pill } from '../../ui/pill';
import { ShelfItem } from '../types';
import { isBook, isMovie } from '../helpers';

@Component({
  selector: 'x-shelf-item-details',
  imports: [NgOptimizedImage, Pill],
  templateUrl: './details.html',
  styleUrl: './details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Details {
  readonly item = input.required<ShelfItem>();

  protected readonly bookItem = computed(() => {
    const item = this.item();
    return isBook(item)
      ? {
          ...item,
          hrefs: {
            thalia: `https://www.thalia.at/suche?sq=${item.isbn13}`,
            goodreads: `https://www.goodreads.com/search?q=${item.isbn13}`,
          },
        }
      : null;
  });

  protected readonly movieItem = computed(() => {
    const item = this.item();
    return isMovie(item) ? item : null;
  });

  toggle = signal(true);
}
