import { BookItem, MovieItem, MovieItemType, ShelfItem } from './types';

export function isBook(item: ShelfItem): item is BookItem {
  return item.type === 'book';
}

export function isMovie(item: ShelfItem): item is MovieItem<MovieItemType> {
  return item.type !== 'book';
}

export function id(item: ShelfItem) {
  return isBook(item) ? item.isbn13 : item.imdbId;
}
