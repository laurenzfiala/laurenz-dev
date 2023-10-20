import { Injectable } from '@angular/core';
import { Media } from '../interfaces/media.interface';
import { filter, first, firstValueFrom, Observable, ReplaySubject, Subject } from 'rxjs';

/**
 * Scoped service responsible for transferring media metadata from the page
 * to the media-fullscreen.component.
 */
@Injectable()
export class MediaService {
  private _media$ = new ReplaySubject<Readonly<Media[]>>(1);

  get media$(): Observable<Readonly<Media[]>> {
    return this._media$.pipe(filter((media) => !!media));
  }

  get media(): Promise<Readonly<Media[]>> {
    return firstValueFrom(this._media$.pipe(filter((media) => !!media)));
  }

  set media(media: Readonly<Media[]>) {
    this._media$.next(media);
  }
}
