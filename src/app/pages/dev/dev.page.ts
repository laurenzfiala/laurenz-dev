import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.page.html',
  styleUrls: ['./dev.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevPage {}
