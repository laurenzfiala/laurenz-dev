import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { bug } from '../../utils/error.util';

export interface InputRange {
  from: string | Date;
  to: string | Date;
}

interface DateRange {
  from: Date;
  to: Date;
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

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent implements OnChanges {
  @Input({ required: true }) ranges!: InputRange[];

  protected _ranges: UIRange[] = [];
  protected _years: UIYear[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ranges']) {
      this.recalcState();
    }
  }

  private recalcState() {
    const ranges = this.ranges.map((r) => {
      return { from: new Date(r.from), to: new Date(r.to) } as DateRange;
    });

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
    const yearRangeMs = rangesEndYearEnd.getTime() - rangesStartYearStart.getTime();

    const uiRanges = ranges.map((range) => {
      const leftPercent =
        ((range.from.getTime() - rangesStartYearStart.getTime()) / yearRangeMs) * 100;
      const widthPercent = ((range.to.getTime() - range.from.getTime()) / yearRangeMs) * 100;

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

    this._ranges = uiRanges;
    this._years = uiYears;
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
