import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SafetyModeService } from '@core/safety/safety-mode.service';

@Component({
  selector: 'pp-alerts-warning',
  imports: [RouterLink],
  templateUrl: './alerts-warning.page.html',
  styleUrl: './alerts-warning.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsWarningPage {
  private readonly _safety = inject(SafetyModeService);
  private readonly _router = inject(Router);

  public onConfirm(): void {
    this._safety.setAlertPreviewLevel('name_and_text');
    void this._router.navigate(['/safety/alerts-images']);
  }
}
