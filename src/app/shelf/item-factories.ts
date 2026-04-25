import { BookItem, MovieItem } from './types';

export function book(options: Omit<BookItem, 'type'>): BookItem {
  return {
    ...options,
    type: 'book',
  };
}

export function bluRay(options: Parameters<typeof movie>[1]) {
  return movie('blu-ray', options);
}

export function dvd(options: Parameters<typeof movie>[1]) {
  return movie('dvd', options);
}

export function cinemaMovie(options: Parameters<typeof movie>[1]) {
  return movie('cinema-movie', options);
}

function movie<T extends 'blu-ray' | 'dvd' | 'cinema-movie'>(
  type: T,
  options: Omit<MovieItem<never>, 'type'>,
): MovieItem<T> {
  return {
    ...options,
    type,
  };
}
