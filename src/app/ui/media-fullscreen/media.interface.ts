export type Media = ImageMedia | VideoMedia;

export interface ImageMedia {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export interface VideoMedia {
  type: 'video';
  thumbnailSrc?: string;
  src: string;
  caption?: string;
}
