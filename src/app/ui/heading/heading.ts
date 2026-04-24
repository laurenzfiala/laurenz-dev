import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HeadingElement } from '../../content';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'x-heading',
  templateUrl: './heading.html',
  styleUrls: ['./heading.css'],
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Heading {
  readonly level = input<1 | 2>(1);
  readonly text = input<string | undefined>(undefined);
  readonly showDivider = input<boolean>(true);
  readonly content = input<HeadingElement | undefined>(undefined);

  protected readonly currentLevel = computed(() => this.content()?.level ?? this.level());
  protected readonly currentShowDivider = computed(
    () => this.content()?.showDivider ?? this.showDivider(),
  );
  protected readonly currentText = computed(() => this.content()?.text ?? this.text() ?? '');
}
