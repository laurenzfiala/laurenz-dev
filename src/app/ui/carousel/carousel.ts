import { Component, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FilenamePipe, Media, MediaService } from '../media-fullscreen';
import { Scroll } from '../scroll';

/**
 * Shows the given media inside a horizontally-scrollable container.
 * When an item is selected, that item is opened in a full-viewport view.
 *
 * #### CSS variables
 * `--carousel-padding`\
 * Padding for the carousel.
 *
 * @see MediaFullscreenComponent
 */
@Component({
  selector: 'x-carousel',
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css'],
  imports: [Scroll, RouterLink, FilenamePipe],
})
export class Carousel {
  media = input.required<Media[]>();

  private readonly _mediaService = inject(MediaService);

  constructor() {
    effect(() => {
      this._mediaService.media = this.media();
    });
  }
}
