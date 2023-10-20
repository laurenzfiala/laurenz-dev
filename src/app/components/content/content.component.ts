import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Content, Section } from '../../interfaces/content.interface';
import { ComponentChanges } from '../../interfaces/component-changes.interface';
import { splitSections } from '../../utils/content.utils';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
