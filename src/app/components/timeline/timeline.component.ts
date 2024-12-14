import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  Optional,
  signal,
  untracked,
} from '@angular/core';
import { bug } from '../../utils/error.util';
import { DatePipe, NgStyle } from '@angular/common';
import { TimelineService } from '../timeline-group/timeline.service';

export interface InputRange {
  from: string | Date;
  to: 'ongoing' | string | Date;
}

export interface DateRange {
  from: Date;
  to: Date;
  toLabel?: string;
}

interface UIYear {
  label: string;
  ranges: UIRangeWithinYear[];
}

interface UIRange {
  range: DateRange;
  left: string;
  width: string;
}

interface UIRangeWithinYear {
  start: string;
  end: string;
}

const dateInput = (value: undefined | number | string | Date) =>
  value === undefined ? undefined : new Date(value);

const rangeInput = (ranges: InputRange[]): DateRange[] => {
  return ranges.map((range) => {
    if (range.to === 'ongoing') {
      return {
        from: new Date(range.from),
        to: new Date(),
        toLabel: 'Ongoing',
      };
    }

    return {
      from: new Date(range.from),
      to: new Date(range.to),
    };
  });
};

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgStyle, DatePipe],
  host: {
    '[class]': "'timeline--' + mode()",
  },
})
export class TimelineComponent {
  readonly ranges = input.required({ transform: rangeInput });
  readonly min = input(undefined, { transform: dateInput });
  readonly max = input(undefined, { transform: dateInput });
  readonly mode = input<'default' | 'thin'>('default');

  protected readonly _ranges = signal<UIRange[]>([]);
  protected readonly _years = signal<UIYear[]>([]);

  private readonly _groupMin = this._timelineService?.min ?? signal(null);
  private readonly _groupMax = this._timelineService?.max ?? signal(null);
  private readonly _min = computed(() => this.min() ?? this._groupMin() ?? undefined);
  private readonly _max = computed(() => this.max() ?? this._groupMax() ?? undefined);

  constructor(@Optional() private _timelineService: TimelineService | null) {
    if (_timelineService) {
      effect(() => {
        const ranges = this.ranges();
        untracked(() => _timelineService.register(ranges));
      });
    }

    effect(() => {
      this._min();
      this._max();
      this.mode();
      this.ranges();
      untracked(() => this.recalcState());
    });
  }

  private recalcState() {
    const ranges = this.ranges();

    const rangesStart =
      ranges.sort((a, b) => a.from.getTime() - b.from.getTime()).at(0)?.from ?? bug();
    const rangesEnd = ranges.sort((a, b) => a.to.getTime() - b.to.getTime()).at(-1)?.to ?? bug();

    let yearStart = rangesStart.getFullYear();
    if (rangesStart.getMonth() < 2) {
      yearStart--;
    }

    let spanYears = rangesEnd.getFullYear() - yearStart + 1;
    if (rangesEnd.getMonth() >= 10) {
      spanYears++;
    }

    const years = new Array(spanYears).fill(null).map((_, i) => yearStart + i);

    const rangesStartYearStart = this.dateAtYearStart(years.at(0)!);
    const rangesEndYearEnd = this.dateAtYearStart(years.at(-1)! + 1);

    let timelineStart = rangesStartYearStart;
    let timelineRangeMs = rangesEndYearEnd.getTime() - rangesStartYearStart.getTime();

    const min = this._min();
    const max = this._max();
    if (min !== undefined) {
      timelineStart = new Date(min);
    }
    if (max !== undefined) {
      timelineRangeMs = new Date(max).getTime() - timelineStart.getTime();
    }

    const uiRanges = ranges.map((range) => {
      const leftPercent =
        ((range.from.getTime() - timelineStart.getTime()) / timelineRangeMs) * 100;
      const widthPercent = ((range.to.getTime() - range.from.getTime()) / timelineRangeMs) * 100;

      return {
        range,
        left: `${leftPercent}%`,
        width: `${widthPercent}%`,
      } as UIRange;
    });

    const uiYears = years.map((year) => {
      return {
        label: String(year),
        ranges: this.getRangesForYear(year, ranges),
      } as UIYear;
    });

    this._ranges.set(uiRanges);
    this._years.set(uiYears);
  }

  private getRangesForYear(year: number, ranges: DateRange[]) {
    const yearStart = new Date(`${year}-01-01`);
    const yearStartMs = yearStart.getTime();
    const yearEnd = new Date(`${year + 1}-01-01`);
    const yearEndMs = yearEnd.getTime();
    const yearDurationMs = yearEndMs - yearStartMs;

    return ranges
      .filter(
        (range) =>
          this.isBetween(range.from, yearStart, yearEnd) ||
          this.isBetween(range.to, yearStart, yearEnd) ||
          (this.isBefore(range.from, yearStart) && this.isAfter(range.to, yearEnd)),
      )
      .map((range) => {
        return {
          start: `${this.clamp(
            ((range.from.getTime() - yearStartMs) / yearDurationMs) * 100,
            0,
            100,
          )}%`,
          end: `${this.clamp(
            ((range.to.getTime() - yearStartMs) / yearDurationMs) * 100,
            0,
            100,
          )}%`,
        } as UIRangeWithinYear;
      });
  }

  private dateAtYearStart(year: number) {
    const date = new Date();
    date.setFullYear(year, 0, 1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  }

  private isBetween(target: Date, start: Date, endExclusive: Date) {
    const targetTime = target.getTime();
    const startTime = start.getTime();
    const endTimeExclusive = endExclusive.getTime();
    return targetTime >= startTime && targetTime < endTimeExclusive;
  }

  private isBefore(target: Date, relativeTo: Date) {
    return target.getTime() < relativeTo.getTime();
  }

  private isAfter(target: Date, relativeTo: Date) {
    return target.getTime() > relativeTo.getTime();
  }

  private clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }
}
