import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CalendarService } from '@core/calendar/calendar.service';
import type { ScheduleChangeRequestType } from '@core/calendar/calendar.types';

@Component({
  selector: 'pp-schedule-change-request',
  imports: [FormsModule, RouterLink],
  templateUrl: './schedule-change-request.page.html',
  styleUrl: './schedule-change-request.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleChangeRequestPage {
  private readonly calendarService = inject(CalendarService);
  private readonly router = inject(Router);

  requestType: ScheduleChangeRequestType = 'Swap days';
  changeStart = new Date(Date.now() + 72 * 3600 * 1000).toISOString().slice(0, 16);
  changeEnd = new Date(Date.now() + 96 * 3600 * 1000).toISOString().slice(0, 16);
  tradeStart = new Date(Date.now() + 144 * 3600 * 1000).toISOString().slice(0, 16);
  tradeEnd = new Date(Date.now() + 168 * 3600 * 1000).toISOString().slice(0, 16);
  reason = '';
  // Default respondBy to 48 hours in future (satisfies >= 24h requirement)
  respondBy = new Date(Date.now() + 48 * 3600 * 1000).toISOString().slice(0, 16);

  readonly errorMessage = signal<string | null>(null);
  readonly selectedChildren = signal<{ id: string; name: string }[]>([
    { id: 'child-1', name: 'Maya Rivera' },
    { id: 'child-2', name: 'Leo Rivera' },
  ]);

  isChildSelected(id: string): boolean {
    return this.selectedChildren().some((c) => c.id === id);
  }

  toggleChild(id: string, name: string): void {
    this.selectedChildren.update((list) => {
      const exists = list.some((c) => c.id === id);
      if (exists) return list.filter((c) => c.id !== id);
      return [...list, { id, name }];
    });
  }

  sendRequest(): void {
    this.errorMessage.set(null);
    if (!this.reason.trim()) {
      this.errorMessage.set('A brief reason is required for the request.');
      return;
    }

    const respondByTime = new Date(this.respondBy).getTime();
    const minRespondBy = Date.now() + 24 * 60 * 60 * 1000;

    if (respondByTime < minRespondBy) {
      this.errorMessage.set('“Respond by” must be at least 24 hours ahead (ERR-05).');
      return;
    }

    const created = this.calendarService.createChangeRequest({
      householdId: 'hh-1',
      requestType: this.requestType,
      requestedBy: 'user-1',
      requestedByName: 'Elena Rivera',
      changeStartAt: new Date(this.changeStart).toISOString(),
      changeEndAt: new Date(this.changeEnd).toISOString(),
      tradeStartAt:
        this.requestType === 'Swap days' ? new Date(this.tradeStart).toISOString() : undefined,
      tradeEndAt:
        this.requestType === 'Swap days' ? new Date(this.tradeEnd).toISOString() : undefined,
      reason: this.reason.trim(),
      respondByAt: new Date(this.respondBy).toISOString(),
      childIds: this.selectedChildren().map((c) => c.id),
      childNames: this.selectedChildren().map((c) => c.name),
    });

    void this.router.navigate(['/calendar/request-detail', created.id]);
  }
}
