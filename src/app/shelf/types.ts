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
  isbn13: string; // https://www.goodreads.com/search?q=9780470185483
  coverPath: string;
  reading: boolean;
  nsfw?: boolean;
}

export interface MovieItem<Type extends MovieItemType> extends IShelfItem {
  type: Type;
  title: string;
  imdbId: string; // https://www.imdb.com/title/tt12042730/
  coverPath: string;
  rating: number;
  watchedOn: `${number}-${number}-${number}`;
}
