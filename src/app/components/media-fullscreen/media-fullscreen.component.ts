import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Media } from '../../interfaces/media.interface';
import { MediaService } from '../../services/media.service';
import { FilenamePipe } from '../../pipes/filename.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { bug } from '../../utils/error.util';
import { ReplaySubject } from 'rxjs';
import { ComponentChanges } from '../../interfaces/component-changes.interface';
import { InteractionService } from '../../services/interaction.service';
import { NgClass, AsyncPipe } from '@angular/common';

/**
 * Shows the given media in a navigable full-viewport overlay.
 */
@Component({
  selector: 'app-media-fullscreen',
  templateUrl: './media-fullscreen.component.html',
  styleUrls: ['./media-fullscreen.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'mediaFullscreen',
  standalone: true,
  imports: [NgClass, AsyncPipe],
})
export class MediaFullscreenComponent implements OnChanges, OnDestroy {
  @Input() mediaId?: string;

  @ViewChild('imageEl') protected _imageEl?: ElementRef<HTMLImageElement>;
  @ViewChild('videoEl') protected _videoEl?: ElementRef<HTMLVideoElement>;

  protected _show = false;
  protected _isLoading = false;
  protected _preventClose?: Event;
  protected _selectedMediaIndex: number = 0;
  protected _selectedMedia = new ReplaySubject<Media | null>(1);

  constructor(
    private _mediaService: MediaService,
    private _interactionService: InteractionService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}

  ngOnChanges(changes: ComponentChanges<MediaFullscreenComponent>) {
    if (changes.mediaId && changes.mediaId.firstChange) {
      void this.show(this.mediaId ?? bug('expected media id'));
    }
  }

  ngOnDestroy() {
    this.hide();
  }

  @HostListener('window:keydown.escape', ['$event'])
  hide(event?: Event) {
    if (event && event === this._preventClose) {
      return;
    }

    this._interactionService.allowScroll();
    this._show = false;

    void this._router.navigateByUrl(
      this._route.snapshot.parent?.url.join('/') ?? bug('no parent route'),
    );
  }

  async show(mediaIdOrMedia: string | Media) {
    let media: Media | undefined;
    if (typeof mediaIdOrMedia === 'string') {
      media = (await this.media).find(
        (m) => new FilenamePipe().transform(m.src) === mediaIdOrMedia,
      );
    } else {
      media = mediaIdOrMedia;
    }

    if (!media) {
      // ignore if media was not found
      return;
    }

    this._interactionService.preventScroll();
    this._show = true;

    const mediaArray = await this.media;
    let selectedMediaIndex = 0;
    const selectedMedia = mediaArray.find((m, i) => {
      if (m === media) {
        selectedMediaIndex = i;
        return true;
      }
      return false;
    });

    this._selectedMediaIndex = selectedMediaIndex;
    this._selectedMedia.next(selectedMedia ?? bug());
    this._isLoading = true;
  }

  @HostListener('window:keydown.arrowRight')
  async next() {
    void this.seek(1);
  }

  @HostListener('window:keydown.arrowLeft')
  async previous() {
    void this.seek(-1);
  }

  // TODO use animation frame
  @HostListener('window:resize')
  protected updateMediaConstraint() {
    const el = this._imageEl?.nativeElement ?? this._videoEl?.nativeElement;
    if (!el) {
      return;
    }

    const viewportAspect = window.innerWidth / window.innerHeight;
    let mediaAspect;
    if (el instanceof HTMLImageElement) {
      mediaAspect = el.naturalWidth / el.naturalHeight;
    } else {
      mediaAspect = el.videoWidth / el.videoHeight;
    }

    if (viewportAspect >= mediaAspect) {
      el.classList.replace('constrain-w', 'constrain-h');
    } else {
      el.classList.replace('constrain-h', 'constrain-w');
    }
  }

  private async seek(offset: number) {
    this._preventClose = event;

    const media = await this.media;
    this._selectedMediaIndex += offset;
    if (this._selectedMediaIndex >= media.length) {
      this._selectedMediaIndex = 0;
    } else if (this._selectedMediaIndex < 0) {
      this._selectedMediaIndex = media.length - 1;
    }

    this._isLoading = true;

    const selectedMedia = media.at(this._selectedMediaIndex) ?? bug();

    this.mediaId = new FilenamePipe().transform(selectedMedia.src);
    this._selectedMedia.next(selectedMedia);

    void this._router.navigate(['..', this.mediaId], {
      replaceUrl: true,
      relativeTo: this._route,
    });
  }

  get media() {
    return this._mediaService.media;
  }
}
