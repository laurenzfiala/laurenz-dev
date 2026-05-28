export type BookItemType = 'book';
export type MovieItemType = 'blu-ray' | 'dvd' | 'cinema-movie';
export type ShelfItem = BookItem | MovieItem<MovieItemType>;

interface IShelfItem {
  type: BookItemType | MovieItemType;
}

export interface BookItem extends IShelfItem {
  type: BookItemType;
  title: string;
  author: string;
  isbn13: string;
  coverPath: string;
  reading: boolean;
  nsfw?: boolean;
  worthReading: boolean;
  review?: string;
}

export interface MovieItem<Type extends MovieItemType> extends IShelfItem {
  type: Type;
  title: string;
  yearOfRelease: string;
  imdbId: string;
  coverPath: string;
  rating: number;
  watchedOn: `${number}-${number}-${number}`;
  worthWatching: boolean;
  review?: string;
}
