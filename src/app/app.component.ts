import { ChangeDetectionStrategy, Component, ViewContainerRef } from '@angular/core';
import { map } from 'rxjs';
import { HistoryService } from './util-back';
import { FooterComponent } from './ui-footer';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './ui-nav';
import { AsyncPipe } from '@angular/common';
import { RouteData } from './util-router';
import { SwipeNavigateDirective } from './util-swipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavComponent, RouterOutlet, FooterComponent, AsyncPipe, SwipeNavigateDirective],
})
export class AppComponent {
  constructor(
    private readonly _backService: HistoryService,
    public readonly viewContainerRef: ViewContainerRef,
  ) {}

  get showNav$() {
    return this._backService.route$.pipe(
      map((route) => route.data as RouteData),
      map((data) => data === undefined || data.nav === undefined || data.nav),
    );
  }
}
