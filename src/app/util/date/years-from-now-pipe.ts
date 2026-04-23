import { Pipe, PipeTransform } from '@angular/core';
import { default as dayjs } from 'dayjs';

/**
 * Turns date input or a parseable date string
 * into an amount of years since now.
 * The result is always positive.
 * Only full years are counted.
 *
 * @example called in year 2026:
 * {{ '2000' | yearsFromNow }} => 26
 * @example called on 2014/01/01:
 * {{ '2010-05-01' | yearsFromNow }} => 3
 */
@Pipe({
  name: 'yearsFromNow',
  pure: true,
})
export class YearsFromNowPipe implements PipeTransform {
  transform(date: string | Date): number {
    return Math.abs(dayjs(date).diff(dayjs(), 'years'));
  }
}
