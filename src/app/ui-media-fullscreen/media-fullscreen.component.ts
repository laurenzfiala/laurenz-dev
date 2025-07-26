import {
  Component,
  DestroyRef,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
  TemplateRef,
  untracked,
  viewChild,
} from '@angular/core';
import { Media } from './media.interface';
import { MediaService } from './media.service';
import { FilenamePipe } from './filename.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { OverlayService } from '../ui-overlay';
import { routePath } from '../util-routes';
import { AppComponent } from '../app.component';
import { bug } from '../util-error';

/**
 * Shows the given media in a navigable full-viewport overlay.
 */
@Component({
  selector: 'app-media-fullscreen',
  templateUrl: './media-fullscreen.component.html',
  styleUrls: ['./media-fullscreen.component.css'],
  exportAs: 'mediaFullscreen',
  imports: [NgClass, AsyncPipe, CdkTrapFocus],
  host: {
    '(window:keydown.escape)': 'hide($event)',
    '(window:keydown.arrowLeft)': 'previous()',
    '(window:keydown.arrowRight)': 'next()',
  },
})
export class MediaFullscreenComponent {
  readonly mediaId = input<string>();

  protected readonly _template = viewChild<TemplateRef<unknown>>('template');
  protected readonly _imageEl = viewChild<ElementRef<HTMLImageElement>>('imageEl');
  protected readonly _videoEl = viewChild<ElementRef<HTMLVideoElement>>('videoEl');

  protected readonly _show = signal(false);
  protected _isLoading = false;
  protected _preventClose?: Event;
  protected readonly _allMedia = signal<readonly Media[]>([]);
  protected _selectedMediaIndex: number = 0;
  protected _selectedMedia = new ReplaySubject<Media | null>(1);

  private readonly _overlayServiceRef = inject(OverlayService).register();
  private readonly _rootViewContainerRef = inject(AppComponent).viewContainerRef;

  constructor(
    private _mediaService: MediaService,
    private _router: Router,
    private _route: ActivatedRoute,
    destroyRef: DestroyRef,
  ) {
    effect(() => {
      const mediaId = this.mediaId() ?? bug('expected media id');
      untracked(() => void this.show(mediaId));
    });
    effect(() => {
      this._imageEl();
      this._videoEl();
      untracked(() => void this.updateMediaConstraint());
    });
    effect((onCleanup) => {
      const template = this._template() ?? bug('expected template');
      const insertedView = this._rootViewContainerRef.createEmbeddedView(template);

      onCleanup(() => insertedView.destroy());
    });

    destroyRef.onDestroy(() => this._overlayServiceRef.destroy());
  }

  hide(event?: Event) {
    if (!this._show() || !this._overlayServiceRef.isPrimary()) {
      return;
    } else if (event && event === this._preventClose) {
      return;
    }

    this._show.set(false);
    this._overlayServiceRef.closed();

    const parentRoute = this._route.snapshot.parent ?? bug('no parent route');
    const targetPath = routePath(parentRoute);

    void this._router.navigateByUrl(targetPath);
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

    if (!this._show()) {
      this._show.set(true);
      this._overlayServiceRef.opened();
    }

    const mediaArray = await this.media;
    let selectedMediaIndex = 0;
    const selectedMedia = mediaArray.find((m, i) => {
      if (m === media) {
        selectedMediaIndex = i;
        return true;
      }
      return false;
    });

    this._allMedia.set(mediaArray);
    this._selectedMediaIndex = selectedMediaIndex;
    this._selectedMedia.next(selectedMedia ?? bug());
    this._isLoading = true;
  }

  async next() {
    void this.seek(1);
  }

  async previous() {
    void this.seek(-1);
  }

  // TODO use animation frame
  @HostListener('window:resize')
  protected updateMediaConstraint() {
    const el = this._imageEl()?.nativeElement ?? this._videoEl()?.nativeElement;
    if (!el) {
      return;
    }

    // '80' is 16 * 5 rem (which is the vertical offset of the image)
    const viewportAspect = window.innerWidth / (window.innerHeight - 80 * window.devicePixelRatio);
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

  protected async seek(offset: number) {
    const media = await this.media;
    this._selectedMediaIndex += offset;
    if (this._selectedMediaIndex >= media.length) {
      this._selectedMediaIndex = 0;
    } else if (this._selectedMediaIndex < 0) {
      this._selectedMediaIndex = media.length - 1;
    }

    this._isLoading = true;

    const selectedMedia = media.at(this._selectedMediaIndex) ?? bug();

    const mediaId = new FilenamePipe().transform(selectedMedia.src);
    this._selectedMedia.next(selectedMedia);

    void this._router.navigate(['..', mediaId], {
      replaceUrl: true,
      relativeTo: this._route,
    });
  }

  get media() {
    return this._mediaService.media;
  }
}
