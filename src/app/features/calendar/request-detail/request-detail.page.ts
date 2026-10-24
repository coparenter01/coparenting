import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CalendarService } from '@core/calendar/calendar.service';
import type { ScheduleChangeRequestModel } from '@core/calendar/calendar.types';

@Component({
  selector: 'pp-request-detail',
  imports: [FormsModule, RouterLink],
  templateUrl: './request-detail.page.html',
  styleUrl: './request-detail.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestDetailPage {
  private readonly calendarService = inject(CalendarService);
  private readonly route = inject(ActivatedRoute);

  readonly declineReason = signal<string>('');
  readonly showConfirmDialog = signal<boolean>(false);
  private readonly timerRemainingSeconds = signal<number>(581); // ~9m 41s

  readonly request = computed<ScheduleChangeRequestModel | undefined>(() => {
    const id = this.route.snapshot.paramMap.get('id') ?? 'req-1';
    return (
      this.calendarService.requests().find((r) => r.id === id) ?? this.calendarService.requests()[0]
    );
  });

  readonly isRequester = computed<boolean>(() => {
    return this.request()?.requestedBy === 'user-1';
  });

  readonly undoTimeRemaining = computed<string>(() => {
    const totalSec = this.timerRemainingSeconds();
    const mm = Math.floor(totalSec / 60);
    const ss = totalSec % 60;
    return String(mm) + ':' + (ss < 10 ? '0' : '') + String(ss);
  });

  formatPeriod(start?: string, end?: string): string {
    if (!start || !end) return '—';
    const s = new Date(start).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
    });
    const e = new Date(end).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
    });
    return s + ' → ' + e;
  }

  formatDateTime(iso?: string): string {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  openConfirmDialog(): void {
    this.showConfirmDialog.set(true);
  }

  cancelConfirmDialog(): void {
    this.showConfirmDialog.set(false);
  }

  confirmApproval(): void {
    const req = this.request();
    if (req) {
      this.calendarService.approveRequest(req.id, 'user-1');
      this.showConfirmDialog.set(false);
    }
  }

  undoApproval(): void {
    const req = this.request();
    if (req) {
      this.calendarService.undoApproval(req.id);
    }
  }

  decline(): void {
    const req = this.request();
    if (req) {
      this.calendarService.declineRequest(req.id, 'user-1', this.declineReason() || undefined);
    }
  }

  withdraw(): void {
    const req = this.request();
    if (req) {
      this.calendarService.withdrawRequest(req.id);
    }
  }
}
