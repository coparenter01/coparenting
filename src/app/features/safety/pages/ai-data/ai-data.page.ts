import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SafetyModeService } from '@core/safety/safety-mode.service';

@Component({
  selector: 'pp-ai-data',
  imports: [RouterLink],
  templateUrl: './ai-data.page.html',
  styleUrl: './ai-data.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiDataPage {
  private readonly _safety = inject(SafetyModeService);

  public readonly aiFeaturesActive = this._safety.aiFeaturesActive;

  public onToggleAi(): void {
    this._safety.setAiFeaturesActive(!this.aiFeaturesActive());
  }
}
