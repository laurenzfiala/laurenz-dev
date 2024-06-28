import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transforms a given file path to just the filename
 * (excluding file ending).
 */
@Pipe({
  name: 'filename',
  standalone: true,
})
export class FilenamePipe implements PipeTransform {
  transform(filepath: string): string {
    const withEnding = filepath.substring(filepath.lastIndexOf('/') + 1);
    return withEnding.slice(0, withEnding.indexOf('.'));
  }
}
