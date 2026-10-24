import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChildSupportService } from '@core/child-support/child-support.service';
import type { TimelineEvent } from '@core/child-support/child-support.types';

@Component({
  selector: 'pp-timeline',
  imports: [RouterLink],
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelinePage {
  private readonly cssService = inject(ChildSupportService);

  readonly timelineEvents = this.cssService.timeline;
  readonly filterType = signal<string>('all');

  readonly filteredEvents = computed<TimelineEvent[]>(() => {
    const f = this.filterType();
    const list = this.timelineEvents();
    if (f === 'all') return list;
    return list.filter((e) => e.eventType === f);
  });

  onFilterChange(event: Event): void {
    this.filterType.set((event.target as HTMLSelectElement).value);
  }

  formatDate(ts: string): string {
    return new Date(ts).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }
}
