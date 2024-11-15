import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transforms a given file path to just the filename.
 */
@Pipe({
  name: 'filename',
  standalone: true,
})
export class FilenamePipe implements PipeTransform {
  transform(filepath: string, withFileEnding = false): string {
    const withEnding = filepath.substring(filepath.lastIndexOf('/') + 1);
    return withFileEnding ? withEnding : withEnding.slice(0, withEnding.indexOf('.'));
  }
}
