import { Injectable, signal } from '@angular/core';
import { DateRange } from './timeline.component';
import { bug } from '../util-error';

/**
 * Allows grouping of multiple timelines,
 * so they all share a common start and end date.
 */
@Injectable()
export class TimelineService {
  /**
   * Start date for all timelines in this group.
   */
  readonly min = signal<Date | null>(null);

  /**
   * End date for all timelines in this group.
   */
  readonly max = signal<Date | null>(null);

  /**
   * Register the date ranges, so the {@link min} and {@link max} values can be updated.
   * @param ranges ranges to be shown by the timeline
   */
  register(ranges: DateRange[]) {
    const rangesStart =
      ranges.sort((a, b) => a.from.getTime() - b.from.getTime()).at(0)?.from ?? bug();
    const rangesEnd = ranges.sort((a, b) => a.to.getTime() - b.to.getTime()).at(-1)?.to ?? bug();

    if ((this.min()?.getTime() ?? Number.MAX_VALUE) > rangesStart.getTime()) {
      this.min.set(rangesStart);
    }

    if ((this.max()?.getTime() ?? 0) < rangesEnd.getTime()) {
      this.max.set(rangesEnd);
    }
  }
}
