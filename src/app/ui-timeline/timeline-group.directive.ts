import { Directive, effect, input } from '@angular/core';
import { TimelineService } from './timeline.service';

const dateInput = (value: undefined | number | string | Date) =>
  value === undefined ? undefined : new Date(value);

@Directive({
  selector: '[appTimelineGroup]',
  standalone: true,
  providers: [TimelineService],
})
export class TimelineGroupDirective {
  readonly min = input(undefined, { transform: dateInput });
  readonly max = input(undefined, { transform: dateInput });

  constructor(timelineService: TimelineService) {
    effect(() => {
      const min = this.min();
      if (min) {
        timelineService.min.set(min);
      }
    });

    effect(() => {
      const max = this.max();
      if (max) {
        timelineService.max.set(max);
      }
    });
  }
}
