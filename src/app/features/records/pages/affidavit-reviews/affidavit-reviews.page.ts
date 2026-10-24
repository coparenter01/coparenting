import { DatePipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecordsService } from '@core/records/records.service';
import type { AffidavitRequestItem, RecordTypeOption } from '@core/records/records.types';
import { getRecordTypeLabel } from '@core/records/records.utils';

@Component({
  selector: 'pp-affidavit-reviews',
  imports: [RouterLink, DatePipe, TitleCasePipe],
  templateUrl: './affidavit-reviews.page.html',
  styleUrls: ['./affidavit-reviews.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AffidavitReviewsPage {
  private readonly recordsService = inject(RecordsService);

  readonly affidavitRequests = this.recordsService.affidavitRequests;
  readonly selectedRequest = signal<AffidavitRequestItem | null>(null);

  readonly isDeclining = signal<boolean>(false);
  readonly declineReason = signal<string>('');

  selectRequest(item: AffidavitRequestItem): void {
    this.selectedRequest.set(item);
    this.isDeclining.set(false);
  }

  formatRecordTypes(types: RecordTypeOption[]): string {
    return types.map((t) => getRecordTypeLabel(t)).join(', ');
  }

  async onApprove(): Promise<void> {
    const selected = this.selectedRequest();
    if (!selected) return;
    const updated = await this.recordsService.reviewAffidavit(selected.requestId, 'approve');
    this.selectedRequest.set(updated);
  }

  startDecline(): void {
    this.isDeclining.set(true);
    this.declineReason.set('');
  }

  cancelDecline(): void {
    this.isDeclining.set(false);
  }

  onReasonChange(event: Event): void {
    this.declineReason.set((event.target as HTMLTextAreaElement).value);
  }

  async confirmDecline(): Promise<void> {
    const selected = this.selectedRequest();
    if (!selected) return;
    const reason = this.declineReason().trim() || 'Declined by operations staff.';
    const updated = await this.recordsService.reviewAffidavit(
      selected.requestId,
      'decline',
      reason,
    );
    this.selectedRequest.set(updated);
    this.isDeclining.set(false);
  }
}
