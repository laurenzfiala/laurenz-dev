import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QrCodeComponent } from '../../components/qr-code/qr-code.component';

import { RouterLink } from '@angular/router';
import { HeadingComponent } from '../../components/heading/heading.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeadingComponent, RouterLink, QrCodeComponent, InfoBoxComponent],
})
export class AboutPage {
  private static E_MAIL = 'renz.devmail@lau';

  protected _activeQr: 'email' | 'telegram' | null = null;
  protected _showQrCodes = false;

  protected sendMail() {
    location.href = `mailto:${AboutPage.E_MAIL.substring(8)}${AboutPage.E_MAIL.substring(0, 8)}`;
  }
}
