import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrCodeComponent {
  @Input({ required: true }) active = false;
  @Input() subtle = false;
  @Input({ required: true }) overlayUrl!: string;
  @Input({ required: true }) qrUrl!: string;
  @Output() action = new EventEmitter<void>();
}
