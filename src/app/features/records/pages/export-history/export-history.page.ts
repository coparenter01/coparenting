import { DatePipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecordsService } from '@core/records/records.service';
import type { ExportItem, RecordTypeOption } from '@core/records/records.types';
import { getRecordTypeLabel } from '@core/records/records.utils';

@Component({
  selector: 'pp-export-history',
  imports: [RouterLink, DatePipe, TitleCasePipe],
  templateUrl: './export-history.page.html',
  styleUrls: ['./export-history.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportHistoryPage {
  private readonly recordsService = inject(RecordsService);

  readonly exports = this.recordsService.exports;
  readonly filterFormat = signal<string>('all');

  readonly filteredExports = computed(() => {
    const list = this.exports();
    const filter = this.filterFormat();
    if (filter === 'all') return list;
    return list.filter((item) => item.format === filter);
  });

  onFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filterFormat.set(target.value);
  }

  formatRecordTypes(types: RecordTypeOption[]): string {
    return types.map((t) => getRecordTypeLabel(t)).join(', ');
  }

  download(item: ExportItem): void {
    const link = document.createElement('a');
    link.href = item.downloadUrl ?? '#';
    link.download = item.fileName ?? 'export.pdf';
    link.click();
  }
}
