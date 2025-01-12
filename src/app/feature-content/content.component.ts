import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Content } from './content.interface';
import { CarouselComponent } from '../ui-carousel';
import { TimelineComponent } from '../ui-timeline';
import { FileComponent } from './file/file.component';
import { HeadingComponent } from '../ui-heading';
import { NgClass } from '@angular/common';
import { splitSections } from './content.utils';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, HeadingComponent, FileComponent, TimelineComponent, CarouselComponent],
})
export class ContentComponent {
  content = input.required<Content>();

  protected _contentSections = computed(() => splitSections(this.content()));
}
