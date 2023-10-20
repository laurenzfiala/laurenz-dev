import { Media } from './media.interface';
import { InputRange } from '../components/timeline/timeline.component';

interface Element {
  type: 'heading' | 'paragraph' | 'file' | 'image' | 'carousel' | 'timeline' | 'new section';
}

export interface HeadingElement extends Element {
  type: 'heading';
  level: 1 | 2;
  text: string;
  showDivider: boolean;
  showSticky: boolean;
}

export interface ParagraphElement extends Element {
  type: 'paragraph';
  styles: ('normal' | 'muted' | 'small')[];
  text: string;
}

export interface FileElement extends Element {
  type: 'file';
  src: string;
}

export interface ImageElement extends Element {
  type: 'image';
  src: string;
  alt: string;
  maxHeightPx?: number;
}

export interface CarouselElement extends Element {
  type: 'carousel';
  media: Media[];
}

export interface TimelineElement extends Element {
  type: 'timeline';
  ranges: InputRange[]; // TODO move
}

export interface NewSectionElement extends Element {
  type: 'new section';
  wide: boolean;
}

type AnyElement =
  | HeadingElement
  | ParagraphElement
  | FileElement
  | ImageElement
  | CarouselElement
  | TimelineElement
  | NewSectionElement;

export type Content = AnyElement[];

export interface Section {
  section: NewSectionElement;
  content: Content;
}
