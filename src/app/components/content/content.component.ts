import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Content, Section } from '../../interfaces/content.interface';
import { ComponentChanges } from '../../interfaces/component-changes.interface';
import { splitSections } from '../../utils/content.utils';
import { CarouselComponent } from '../carousel/carousel.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { FileComponent } from '../file/file.component';
import { HeadingComponent } from '../heading/heading.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, HeadingComponent, FileComponent, TimelineComponent, CarouselComponent],
})
export class ContentComponent implements OnChanges {
  @Input({ required: true }) content!: Content;

  protected _contentSections?: Section[];

  ngOnChanges(changes: ComponentChanges<ContentComponent>) {
    if (changes.content) {
      this._contentSections = splitSections(this.content);
    }
  }
}
