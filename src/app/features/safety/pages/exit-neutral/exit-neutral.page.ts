import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SafetyModeService } from '@core/safety/safety-mode.service';

@Component({
  selector: 'pp-exit-neutral',
  imports: [RouterLink],
  templateUrl: './exit-neutral.page.html',
  styleUrl: './exit-neutral.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExitNeutralPage {
  private readonly _safety = inject(SafetyModeService);

  public readonly neutralEscapeUrl = this._safety.neutralEscapeUrl;
}
