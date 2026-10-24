import { ChangeDetectionStrategy, Component, inject, signal, type OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecordsService } from '@core/records/records.service';
import type { AffidavitDelivery } from '@core/records/records.types';
import { formatRecordId } from '@core/records/records.utils';

@Component({
  selector: 'pp-request-affidavit',
  imports: [RouterLink],
  templateUrl: './request-affidavit.page.html',
  styleUrls: ['./request-affidavit.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestAffidavitPage implements OnInit {
  private readonly recordsService = inject(RecordsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly recordId = signal<string>('');
  readonly delivery = signal<AffidavitDelivery>('electronic');
  readonly mailingAddress = signal<string>('');
  readonly courtDate = signal<string>('');
  readonly note = signal<string>('');

  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    const qId = this.route.snapshot.queryParamMap.get('recordId');
    if (qId) {
      this.recordId.set(qId);
    }
  }

  onRecordIdChange(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    this.recordId.set(formatRecordId(raw));
  }

  setDelivery(d: AffidavitDelivery): void {
    this.delivery.set(d);
  }

  onAddressChange(event: Event): void {
    this.mailingAddress.set((event.target as HTMLTextAreaElement).value);
  }

  onCourtDateChange(event: Event): void {
    this.courtDate.set((event.target as HTMLInputElement).value);
  }

  onNoteChange(event: Event): void {
    this.note.set((event.target as HTMLTextAreaElement).value);
  }

  async onSubmit(): Promise<void> {
    this.errorMessage.set(null);
    this.isSubmitting.set(true);

    try {
      await this.recordsService.requestAffidavit({
        recordId: this.recordId(),
        delivery: this.delivery(),
        mailingAddress: this.mailingAddress(),
        courtDate: this.courtDate() || undefined,
        note: this.note() || undefined,
      });
      await this.router.navigate(['/records/affidavit']);
    } catch (err: unknown) {
      this.errorMessage.set(err instanceof Error ? err.message : 'Error sending request.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
