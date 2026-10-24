import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChildSupportService } from '@core/child-support/child-support.service';
import { SafetyModeService } from '@core/safety/safety-mode.service';

@Component({
  selector: 'pp-safety-offer',
  imports: [RouterLink],
  templateUrl: './safety-offer.page.html',
  styleUrls: ['./safety-offer.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafetyOfferPage {
  private readonly cssService = inject(ChildSupportService);
  private readonly safetyModeService = inject(SafetyModeService);
  private readonly router = inject(Router);

  readonly isProcessing = signal<boolean>(false);

  async onAccept(): Promise<void> {
    this.isProcessing.set(true);
    try {
      this.safetyModeService.enableSafetyMode();
      await this.cssService.decideSafetyOffer(true);
      await this.router.navigate(['/safety']);
    } finally {
      this.isProcessing.set(false);
    }
  }

  async onDecline(): Promise<void> {
    this.isProcessing.set(true);
    try {
      await this.cssService.decideSafetyOffer(false);
      await this.router.navigate(['/child-support']);
    } finally {
      this.isProcessing.set(false);
    }
  }
}
