import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SafetyModeService } from '@core/safety/safety-mode.service';

@Component({
  selector: 'pp-exit-confirmation',
  imports: [RouterLink],
  templateUrl: './exit-confirmation.page.html',
  styleUrl: './exit-confirmation.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExitConfirmationPage {
  private readonly _safety = inject(SafetyModeService);

  public onLeaveNow(): void {
    this._safety.exitNow();
  }
}
