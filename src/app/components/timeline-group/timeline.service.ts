import { Injectable, signal } from '@angular/core';
import { DateRange } from '../timeline/timeline.component';
import { bug } from '../../utils/error.util';

/**
 * TODO doc
 */
@Injectable()
export class TimelineService {
  readonly min = signal<Date | null>(null);
  readonly max = signal<Date | null>(null);

  /**
   * TODO doc
   * @param ranges
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
