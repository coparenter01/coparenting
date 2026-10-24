import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SafetyModeService } from '@core/safety/safety-mode.service';

@Component({
  selector: 'pp-safety-resources',
  imports: [RouterLink],
  templateUrl: './safety-resources.page.html',
  styleUrl: './safety-resources.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafetyResourcesPage {
  private readonly _safety = inject(SafetyModeService);

  public onExitNow(): void {
    this._safety.exitNow();
  }
}
