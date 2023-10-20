import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transforms a given file path to just the filename
 * (including file ending).
 */
@Pipe({
  name: 'filename',
})
export class FilenamePipe implements PipeTransform {
  transform(filepath: string): string {
    return filepath.substring(filepath.lastIndexOf('/') + 1);
  }
}
