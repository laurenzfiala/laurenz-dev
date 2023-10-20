import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';
import { RouteData } from './app-routing.module';
import { HistoryService } from './services/history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
