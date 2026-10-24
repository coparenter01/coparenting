import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupportService } from '@core/support/support.service';
import { exportMeasuresReportCsv } from '@core/support/support.utils';

@Component({
  selector: 'pp-support-measures',
  imports: [RouterLink],
  templateUrl: './support-measures.page.html',
  styleUrls: ['./support-measures.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportMeasuresPage {
  private readonly support = inject(SupportService);

  readonly from = signal<string>('2026-10-01');
  readonly to = signal<string>('2026-10-23');
  readonly report = this.support.measuresReport;

  onFromChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.from.set(target.value);
  }

  onToChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.to.set(target.value);
  }

  formatPercent(share: number): string {
    return `${String(Math.round(share * 100))}%`;
  }

  onExportCsv(): void {
    const csv = exportMeasuresReportCsv(this.report());
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `support-measures-${this.from()}-to-${this.to()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
