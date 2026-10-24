import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SafetyModeService } from '@core/safety/safety-mode.service';
import type { AlertPreviewLevel } from '@core/safety/safety.types';

@Component({
  selector: 'pp-alerts-images-settings',
  imports: [RouterLink],
  templateUrl: './alerts-images-settings.page.html',
  styleUrl: './alerts-images-settings.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsImagesSettingsPage {
  private readonly _safety = inject(SafetyModeService);
  private readonly _router = inject(Router);

  public readonly previewLevel = this._safety.alertPreviewLevel;
  public readonly maskImages = this._safety.maskImages;

  public onSelectLevel(level: AlertPreviewLevel): void {
    if (level === 'name_and_text') {
      void this._router.navigate(['/safety/alerts-warning']);
    } else {
      this._safety.setAlertPreviewLevel(level);
    }
  }

  public onToggleMaskImages(): void {
    this._safety.setMaskImages(!this.maskImages());
  }
}
