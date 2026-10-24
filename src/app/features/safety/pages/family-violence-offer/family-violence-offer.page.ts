import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SafetyModeService } from '@core/safety/safety-mode.service';

@Component({
  selector: 'pp-family-violence-offer',
  imports: [],
  templateUrl: './family-violence-offer.page.html',
  styleUrl: './family-violence-offer.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FamilyViolenceOfferPage {
  private readonly _safety = inject(SafetyModeService);
  private readonly _router = inject(Router);

  public onAccept(): void {
    this._safety.enableSafetyMode();
    void this._router.navigate(['/safety']);
  }

  public onDecline(): void {
    void this._router.navigate(['/home']);
  }
}
