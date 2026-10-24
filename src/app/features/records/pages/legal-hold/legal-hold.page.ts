import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RecordsService } from '@core/records/records.service';

@Component({
  selector: 'pp-legal-hold',
  imports: [RouterLink, DatePipe, ReactiveFormsModule],
  templateUrl: './legal-hold.page.html',
  styleUrls: ['./legal-hold.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalHoldPage {
  private readonly fb = inject(FormBuilder);
  private readonly recordsService = inject(RecordsService);

  readonly activeLegalHold = this.recordsService.activeLegalHold;
  readonly legalHolds = this.recordsService.legalHolds;

  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly holdForm = this.fb.group({
    caseNumber: ['', [Validators.required, Validators.maxLength(50)]],
    reason: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
  });

  async placeHold(): Promise<void> {
    if (this.holdForm.invalid || this.isSubmitting()) {
      this.holdForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      const val = this.holdForm.getRawValue();
      await this.recordsService.placeLegalHold(val.caseNumber ?? '', val.reason ?? '');
      this.holdForm.reset();
    } catch (err) {
      this.errorMessage.set(err instanceof Error ? err.message : 'Failed to place legal hold.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  async releaseHold(holdId: string): Promise<void> {
    if (this.isSubmitting()) return;
    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      await this.recordsService.releaseLegalHold(holdId);
    } catch (err) {
      this.errorMessage.set(err instanceof Error ? err.message : 'Failed to release legal hold.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
