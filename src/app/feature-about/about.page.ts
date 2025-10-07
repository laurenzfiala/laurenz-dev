import { Component, signal } from '@angular/core';
import { QrCodeComponent } from '../ui-qr-code';
import { HeadingComponent } from '../ui-heading';
import { InfoBoxComponent } from '../ui-info-box';
import { NgOptimizedImage } from '@angular/common';
import { sendMail } from '../util-contact';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.css'],
  imports: [HeadingComponent, QrCodeComponent, InfoBoxComponent, NgOptimizedImage],
})
export class AboutPage {
  protected _activeQr = signal<'email' | 'telegram' | 'linkedin' | null>(null);
  protected _showQrCodes = signal(false);
  protected readonly sendMail = sendMail;
}
