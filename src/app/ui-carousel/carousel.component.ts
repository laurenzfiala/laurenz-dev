import { Component, effect, input } from '@angular/core';
import { FilenamePipe, Media, MediaService } from '../ui-media-fullscreen';
import { RouterLink } from '@angular/router';

import { ScrollComponent } from '../ui-scroll';

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
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  imports: [ScrollComponent, RouterLink, FilenamePipe],
})
export class CarouselComponent {
  media = input.required<Media[]>();

  constructor(private _mediaService: MediaService) {
    effect(() => {
      this._mediaService.media = this.media();
    });
  }
}
