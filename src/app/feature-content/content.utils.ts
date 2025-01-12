import {
  CarouselElement,
  Content,
  FileElement,
  HeadingElement,
  ImageElement,
  NewSectionElement,
  ParagraphElement,
  Section,
  TimelineElement,
} from './content.interface';
import { ImageMedia, Media, VideoMedia } from '../ui-media-fullscreen';
import { InputRange } from '../ui-timeline';
import { bug } from '../util-error';

export function heading(text: string): HeadingElement {
  return {
    type: 'heading',
    level: 1,
    text: text,
    showDivider: true,
  };
}

export function subheading(text: string): HeadingElement {
  return {
    type: 'heading',
    level: 2,
    text: text,
    showDivider: false,
  };
}

export function paragraph(text: string): ParagraphElement {
  return {
    type: 'paragraph',
    styles: ['normal'],
    text: text.trim(),
  };
}

export function file(src: string): FileElement {
  return {
    type: 'file',
    src,
  };
}

export function image(src: string, alt: string): ImageElement {
  return {
    type: 'image',
    src,
    alt,
  };
}

export function carousel(...media: Media[]): CarouselElement {
  return {
    type: 'carousel',
    media,
  };
}

export function mediaImage(src: string, alt: string, caption?: string): ImageMedia {
  return {
    type: 'image',
    src,
    alt,
    caption,
  };
}

export function mediaVideo(thumbSrc: string, src: string, caption?: string): VideoMedia {
  return {
    type: 'video',
    thumbnailSrc: thumbSrc,
    src,
    caption,
  };
}

export function timeline(...ranges: InputRange[]): TimelineElement {
  return {
    type: 'timeline',
    ranges,
  };
}

export function section(wide = false): NewSectionElement {
  return {
    type: 'new section',
    wide,
  };
}

export function splitSections(content: Content): Section[] {
  const sections: Section[] = [];
  if ((content.at(0)?.type ?? bug()) !== 'new section') {
    sections.push({
      section: {
        type: 'new section',
        wide: false,
      },
      content: [],
    });
  }

  for (const element of content) {
    if (element.type === 'new section') {
      sections.push({
        section: element,
        content: [],
      });
    } else {
      (sections.at(-1) ?? bug()).content.push(element);
    }
  }

  return sections;
}

/**
 * Get the first heading of a content.
 * @param content content to search
 */
export function firstHeading(content: Content): HeadingElement | undefined {
  return content.find((element) => element.type === 'heading' && element.level === 1) as
    | HeadingElement
    | undefined;
}
