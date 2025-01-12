import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QrCodeComponent } from '../ui-qr-code';
import { HeadingComponent } from '../ui-heading';
import { InfoBoxComponent } from '../ui-info-box';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeadingComponent, QrCodeComponent, InfoBoxComponent],
})
export class AboutPage {
  private static E_MAIL = 'renz.devmail@lau';

  protected _activeQr: 'email' | 'telegram' | null = null;
  protected _showQrCodes = false;

  protected sendMail() {
    location.href = `mailto:${AboutPage.E_MAIL.substring(8)}${AboutPage.E_MAIL.substring(0, 8)}`;
  }
}
