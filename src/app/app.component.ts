import { Component, inject, ViewContainerRef } from '@angular/core';
import { map } from 'rxjs';
import { HistoryService } from './util-back';
import { FooterComponent } from './ui-footer';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './ui-nav';
import { RouteData } from './util-router';
import { SwipeNavigateDirective } from './util-swipe';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NavComponent, RouterOutlet, FooterComponent, SwipeNavigateDirective]
})
export class AppComponent {
  protected _showNav = toSignal(
    inject(HistoryService).route$.pipe(
      map((route) => route.data as RouteData),
      map((data) => data === undefined || data.nav === undefined || data.nav),
    ),
  );
  protected _showBackground = toSignal(
    inject(HistoryService).route$.pipe(
      map((route) => route.data as RouteData),
      map((data) => data === undefined || data.nav === undefined || data.nav),
    ),
  );

  constructor(public readonly viewContainerRef: ViewContainerRef) {}
}
