import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'x-qr-code',
  templateUrl: './qr-code.html',
  styleUrl: './qr-code.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrCode {
  readonly active = input.required<boolean>();
  readonly cloak = input(false);
  readonly overlayUrl = input.required<string>();
  readonly qrUrl = input.required<string>();
  readonly action = output<void>();
}
