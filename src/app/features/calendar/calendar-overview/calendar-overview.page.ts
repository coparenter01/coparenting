import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CalendarService } from '@core/calendar/calendar.service';
import type { CalendarEntryModel } from '@core/calendar/calendar.types';
import { PageHeaderComponent } from '@shared/ui/page-header/page-header.component';

export interface CalendarDayViewModel {
  date: string;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
  custodyParent: string;
  isParentA: boolean;
  events: (CalendarEntryModel & {
    timeDisplay: string;
  })[];
}

@Component({
  selector: 'pp-calendar-overview',
  imports: [RouterLink, PageHeaderComponent],
  templateUrl: './calendar-overview.page.html',
  styleUrl: './calendar-overview.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarOverviewPage {
  private readonly calendarService = inject(CalendarService);

  readonly weekOffset = signal<number>(0);
  readonly selectedView = signal<'day' | 'week' | 'month'>('week');

  readonly baseWeekStart = computed(() => {
    const now = new Date();
    const day = now.getDay(); // 0 is Sun
    const diff = now.getDate() - day + this.weekOffset() * 7;
    const start = new Date(now.setDate(diff));
    start.setHours(0, 0, 0, 0);
    return start;
  });

  readonly currentWeekTitle = computed(() => {
    const start = this.baseWeekStart();
    const end = new Date(start.getTime() + 6 * 24 * 3600 * 1000);
    const startStr = start.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    const endStr = end.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return 'Week of ' + startStr + ' – ' + endStr;
  });

  readonly weekDays = computed<CalendarDayViewModel[]>(() => {
    const start = this.baseWeekStart();
    const allEntries = this.calendarService.entries();
    const days: CalendarDayViewModel[] = [];
    const todayStr = new Date().toISOString().slice(0, 10);

    for (let i = 0; i < 7; i++) {
      const d = new Date(start.getTime() + i * 24 * 3600 * 1000);
      const isoDate = d.toISOString().slice(0, 10);
      const isParentA = i % 2 === 0;

      const dayEvents = allEntries
        .filter((e) => e.startAt.startsWith(isoDate))
        .map((e) => {
          const s = new Date(e.startAt).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          });
          const endT = new Date(e.endAt).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          });
          return {
            ...e,
            timeDisplay: s + ' – ' + endT,
          };
        });

      days.push({
        date: isoDate,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: d.getDate(),
        isToday: isoDate === todayStr,
        custodyParent: isParentA ? 'Elena Rivera' : 'David Chen',
        isParentA,
        events: dayEvents,
      });
    }

    return days;
  });

  prevWeek(): void {
    this.weekOffset.update((o) => o - 1);
  }

  nextWeek(): void {
    this.weekOffset.update((o) => o + 1);
  }

  setView(view: 'day' | 'week' | 'month'): void {
    this.selectedView.set(view);
  }
}
