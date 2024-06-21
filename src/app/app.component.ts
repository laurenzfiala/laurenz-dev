import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';
import { RouteData } from './app.routes';
import { HistoryService } from './services/history.service';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NavComponent, RouterOutlet, FooterComponent, AsyncPipe],
})
export class AppComponent {
  constructor(private _backService: HistoryService) {}

  get showNav$() {
    return this._backService.route$.pipe(
      map((route) => route.data as RouteData),
      map((data) => data === undefined || data.nav === undefined || data.nav),
    );
  }
}
