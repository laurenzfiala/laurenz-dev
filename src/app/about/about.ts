import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Heading } from '../ui/heading';
import { sendMail } from '../util/contact';
import { QrCode } from '../ui/qr-code';
import { InfoBox } from '../ui/info-box';
import { NgOptimizedImage } from '@angular/common';
import { Shelf } from '../shelf/shelf';

@Component({
  selector: 'x-about',
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
  imports: [Heading, QrCode, InfoBox, NgOptimizedImage, Shelf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  protected _activeQr = signal<'email' | 'telegram' | 'linkedin' | null>(null);
  protected _showQrCodes = signal(false);
  protected readonly sendMail = sendMail;
  protected readonly _portraitMask = `url('/imgs/about/portrait-masks/${Math.floor(Math.random() * 7) + 1}.svg')`;
}
