import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SafetyModeService } from '@core/safety/safety-mode.service';
import type { AiAuditEntry } from '@core/safety/safety.types';

@Component({
  selector: 'pp-ai-use-log',
  imports: [RouterLink, DatePipe],
  templateUrl: './ai-use-log.page.html',
  styleUrl: './ai-use-log.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiUseLogPage {
  private readonly _safety = inject(SafetyModeService);

  public readonly selectedFeature = signal<string>('ALL');

  public readonly entries = this._safety.aiAuditLog;

  public readonly filteredEntries = computed<AiAuditEntry[]>(() => {
    const feature = this.selectedFeature();
    const all = this.entries();
    if (feature === 'ALL') {
      return all;
    }
    return all.filter((e) => e.featureName === feature);
  });

  public onFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      this.selectedFeature.set(target.value);
    }
  }
}
