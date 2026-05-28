import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'x-pill',
  imports: [],
  templateUrl: './pill.html',
  styleUrl: './pill.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pill {}
