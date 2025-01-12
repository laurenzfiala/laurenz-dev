import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-unfinished',
  templateUrl: './unfinished.component.html',
  styleUrls: ['./unfinished.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class UnfinishedComponent {}
