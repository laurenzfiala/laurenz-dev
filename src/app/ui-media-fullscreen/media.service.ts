import { Injectable } from '@angular/core';
import { Media } from './media.interface';
import { filter, firstValueFrom, Observable, ReplaySubject } from 'rxjs';

/**
 * Scoped service responsible for transferring media metadata from the page
 * to the media-fullscreen.component.
 */
@Injectable()
export class MediaService {
  private _media$ = new ReplaySubject<readonly Media[]>(1);

  get media$(): Observable<readonly Media[]> {
    return this._media$.pipe(filter((media) => !!media));
  }

  get media(): Promise<readonly Media[]> {
    return firstValueFrom(this._media$.pipe(filter((media) => !!media)));
  }

  set media(media: readonly Media[]) {
    this._media$.next(media);
  }
}
