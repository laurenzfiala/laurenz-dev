import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Media } from '../../interfaces/media.interface';
import { MediaService } from '../../services/media.service';
import { ComponentChanges } from '../../interfaces/component-changes.interface';
import { FilenamePipe } from '../../pipes/filename.pipe';
import { RouterLink } from '@angular/router';

import { ScrollComponent } from '../scroll/scroll.component';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollComponent, RouterLink, FilenamePipe],
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input({ required: true }) media!: Media[];

  constructor(private _mediaService: MediaService) {}

  ngOnInit() {
    this._mediaService.media = this.media;
  }

  ngOnChanges(changes: ComponentChanges<CarouselComponent>) {
    if (changes.media && !changes.media.firstChange) {
      this._mediaService.media = this.media;
    }
  }
}
