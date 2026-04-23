import { Component, computed, input } from '@angular/core';
import { File } from './file/file';
import { splitSections } from './content.utils';
import { Heading } from '../ui/heading';
import { Timeline } from '../ui/timeline';
import { Carousel } from '../ui/carousel';
import { Content } from './content.interface';

@Component({
  selector: 'x-content',
  templateUrl: './content.html',
  styleUrls: ['./content.scss'],
  imports: [Heading, File, Timeline, Carousel],
})
export class ContentComponent {
  readonly content = input.required<Content>();

  protected _contentSections = computed(() => splitSections(this.content()));
}
