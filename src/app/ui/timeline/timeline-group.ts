import { Directive, effect, inject, input } from '@angular/core';
import { TimelineService } from './timeline.service';

const dateInput = (value: undefined | number | string | Date) =>
  value === undefined ? undefined : new Date(value);

@Directive({
  selector: '[xTimelineGroup]',
  providers: [TimelineService],
})
export class TimelineGroup {
  readonly min = input(undefined, { transform: dateInput });
  readonly max = input(undefined, { transform: dateInput });

  private readonly _timelineService = inject(TimelineService);

  constructor() {
    effect(() => {
      const min = this.min();
      if (min) {
        this._timelineService.min.set(min);
      }
    });

    effect(() => {
      const max = this.max();
      if (max) {
        this._timelineService.max.set(max);
      }
    });
  }
}
