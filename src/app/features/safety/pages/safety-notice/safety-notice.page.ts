import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SafetyModeService } from '@core/safety/safety-mode.service';

@Component({
  selector: 'pp-safety-notice',
  imports: [RouterLink],
  templateUrl: './safety-notice.page.html',
  styleUrl: './safety-notice.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafetyNoticePage {
  private readonly _safety = inject(SafetyModeService);
  private readonly _router = inject(Router);

  public onConfirmTurnOn(): void {
    this._safety.enableSafetyMode();
    void this._router.navigate(['/safety']);
  }
}
