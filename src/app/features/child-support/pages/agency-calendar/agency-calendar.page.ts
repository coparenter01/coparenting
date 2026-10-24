import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChildSupportService } from '@core/child-support/child-support.service';
import type { AgencyHearingItem } from '@core/child-support/child-support.types';

@Component({
  selector: 'pp-agency-calendar',
  imports: [RouterLink],
  templateUrl: './agency-calendar.page.html',
  styleUrls: ['./agency-calendar.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgencyCalendarPage {
  private readonly cssService = inject(ChildSupportService);

  readonly hearings = this.cssService.hearings;
  readonly filterStatus = signal<string>('all');
  readonly addedToCalendar = signal<Set<string>>(new Set());

  readonly filteredHearings = computed<AgencyHearingItem[]>(() => {
    const filter = this.filterStatus();
    const list = this.hearings();
    if (filter === 'all') return list;
    return list.filter((h) => h.status === filter);
  });

  onFilterChange(event: Event): void {
    this.filterStatus.set((event.target as HTMLSelectElement).value);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  addToCalendar(hearingId: string): void {
    const updated = new Set(this.addedToCalendar());
    updated.add(hearingId);
    this.addedToCalendar.set(updated);
  }

  isAdded(hearingId: string): boolean {
    return this.addedToCalendar().has(hearingId);
  }
}
