import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CalendarService } from '@core/calendar/calendar.service';
import type { ScheduleChangeRequestModel } from '@core/calendar/calendar.types';

export interface AuditVersionViewModel {
  id: string;
  changeTime: string;
  actor: string;
  changeDescription: string;
  device: string;
  result: string;
}

@Component({
  selector: 'pp-entry-history',
  imports: [FormsModule, RouterLink],
  templateUrl: './entry-history.page.html',
  styleUrl: './entry-history.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryHistoryPage {
  private readonly calendarService = inject(CalendarService);

  readonly selectedStatus = signal<string>('All');

  readonly filteredRequests = computed<ScheduleChangeRequestModel[]>(() => {
    const all = this.calendarService.requests();
    const status = this.selectedStatus();
    if (status === 'All') return all;
    return all.filter((r) => r.status === status);
  });

  readonly auditVersions: AuditVersionViewModel[] = [
    {
      id: 'ver-1',
      changeTime: 'Oct 22, 2026, 9:15 AM',
      actor: 'Elena Rivera',
      changeDescription: 'Created',
      device: 'Mobile Safari · iOS 19',
      result: 'Success',
    },
    {
      id: 'ver-2',
      changeTime: 'Oct 22, 2026, 11:30 AM',
      actor: 'Elena Rivera',
      changeDescription: 'Time changed: 09:30 → 10:00',
      device: 'Chrome · macOS',
      result: 'Success',
    },
    {
      id: 'ver-3',
      changeTime: 'Oct 23, 2026, 8:00 AM',
      actor: 'Elena Rivera',
      changeDescription: 'Notes updated',
      device: 'Mobile Safari · iOS 19',
      result: 'Success',
    },
  ];

  setStatusFilter(status: string): void {
    this.selectedStatus.set(status);
  }

  formatPeriod(start?: string, end?: string): string {
    if (!start || !end) return '—';
    const s = new Date(start).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    const e = new Date(end).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    return s + ' → ' + e;
  }

  formatDateTime(iso?: string): string {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}
