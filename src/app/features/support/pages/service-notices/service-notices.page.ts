import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupportService } from '@core/support/support.service';
import type { ServiceNotice, ServiceNoticeStatus } from '@core/support/support.types';

@Component({
  selector: 'pp-service-notices',
  imports: [RouterLink, SlicePipe],
  templateUrl: './service-notices.page.html',
  styleUrls: ['./service-notices.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceNoticesPage {
  private readonly support = inject(SupportService);

  readonly notices = this.support.serviceNotices;

  readonly noticeText = signal<string>('');
  readonly startTime = signal<string>('2026-10-25T02:00');
  readonly endTime = signal<string>('2026-10-25T04:00');
  readonly noticeStatus = signal<ServiceNoticeStatus>('draft');
  readonly errorMessage = signal<string | null>(null);

  onTextInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.noticeText.set(target.value);
  }

  onStartChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.startTime.set(target.value);
  }

  onEndChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.endTime.set(target.value);
  }

  onStatusSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.noticeStatus.set(target.value as ServiceNoticeStatus);
  }

  onTogglePublish(notice: ServiceNotice, publish: boolean): void {
    this.support.saveServiceNotice({
      ...notice,
      status: publish ? 'published' : 'unpublished',
    });
  }

  onSaveNotice(event: Event, publishNow: boolean): void {
    event.preventDefault();
    this.errorMessage.set(null);

    const text = this.noticeText().trim();
    if (!text || text.length > 500) {
      this.errorMessage.set('ERR-11: The notice must be between 1 and 500 characters.');
      return;
    }

    const start = new Date(this.startTime()).getTime();
    const end = new Date(this.endTime()).getTime();
    if (isNaN(start) || isNaN(end) || end <= start) {
      this.errorMessage.set('ERR-11: The end time must be after the start time.');
      return;
    }

    this.support.saveServiceNotice({
      text,
      startsAt: new Date(this.startTime()).toISOString(),
      endsAt: new Date(this.endTime()).toISOString(),
      status: publishNow ? 'published' : this.noticeStatus(),
    });

    this.noticeText.set('');
  }
}
