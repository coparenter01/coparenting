import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SafetyModeService } from '@core/safety/safety-mode.service';
import { StatusChipComponent } from '@shared/ui';

@Component({
  selector: 'pp-safety-settings',
  imports: [RouterLink, StatusChipComponent],
  templateUrl: './safety-settings.page.html',
  styleUrl: './safety-settings.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafetySettingsPage {
  private readonly _safety = inject(SafetyModeService);
  private readonly _router = inject(Router);

  public readonly safetyModeActive = this._safety.safetyModeActive;

  public onToggleClick(): void {
    if (this.safetyModeActive()) {
      void this._router.navigate(['/safety/turn-off']);
    } else {
      void this._router.navigate(['/safety/turn-on']);
    }
  }
}
