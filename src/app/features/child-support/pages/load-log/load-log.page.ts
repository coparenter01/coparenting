import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChildSupportService } from '@core/child-support/child-support.service';
import type { OperationsSyncLogEntry } from '@core/child-support/child-support.types';

@Component({
  selector: 'pp-load-log',
  imports: [RouterLink],
  templateUrl: './load-log.page.html',
  styleUrls: ['./load-log.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadLogPage {
  private readonly cssService = inject(ChildSupportService);

  readonly operationsLogs = this.cssService.operationsLogs;
  readonly dateFilter = signal<string>('2026-10-23');
  readonly statusFilter = signal<string>('all');

  readonly filteredLogs = computed<OperationsSyncLogEntry[]>(() => {
    const status = this.statusFilter();
    const list = this.operationsLogs();
    if (status === 'all') return list;
    return list.filter((l) => l.status === status);
  });

  onDateChange(event: Event): void {
    this.dateFilter.set((event.target as HTMLInputElement).value);
  }

  onStatusChange(event: Event): void {
    this.statusFilter.set((event.target as HTMLSelectElement).value);
  }

  formatTime(isoStr: string | null): string {
    if (!isoStr) return '—';
    return new Date(isoStr).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'success':
        return 'badge-success';
      case 'failed':
        return 'badge-failed';
      case 'held_back':
        return 'badge-warning';
      case 'late':
        return 'badge-neutral';
      default:
        return 'badge-neutral';
    }
  }
}
