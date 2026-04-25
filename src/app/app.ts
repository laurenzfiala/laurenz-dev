import { Component, inject, ViewContainerRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HistoryService } from './util/back';
import { map } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { Footer } from './ui/footer';
import { SwipeNavigateDirective } from './util/swipe';
import { Nav } from './ui/nav';
import { RouteData } from './util/router';

@Component({
  selector: 'x-root',
  imports: [RouterOutlet, Footer, SwipeNavigateDirective, Nav],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
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

  public readonly viewContainerRef = inject(ViewContainerRef);
}
