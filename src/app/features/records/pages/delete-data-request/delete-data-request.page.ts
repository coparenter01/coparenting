import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecordsService } from '@core/records/records.service';

@Component({
  selector: 'pp-delete-data-request',
  imports: [RouterLink, DatePipe],
  templateUrl: './delete-data-request.page.html',
  styleUrls: ['./delete-data-request.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDataRequestPage {
  private readonly recordsService = inject(RecordsService);

  readonly deletionRequests = this.recordsService.deletionRequests;
  readonly activeLegalHold = this.recordsService.activeLegalHold;

  readonly confirmed = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  toggleConfirmed(): void {
    this.confirmed.update((v) => !v);
  }

  async submitDeletion(): Promise<void> {
    if (!this.confirmed() || this.isSubmitting()) return;
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    try {
      await this.recordsService.requestDeletion();
      this.confirmed.set(false);
    } catch (err) {
      this.errorMessage.set(
        err instanceof Error ? err.message : 'Failed to submit deletion request.',
      );
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
