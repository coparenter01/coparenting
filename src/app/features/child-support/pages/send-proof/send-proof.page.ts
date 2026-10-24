import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChildSupportService } from '@core/child-support/child-support.service';
import type { ProofPaymentMethod } from '@core/supabase/database.types';

@Component({
  selector: 'pp-send-proof',
  imports: [RouterLink],
  templateUrl: './send-proof.page.html',
  styleUrls: ['./send-proof.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendProofPage {
  private readonly cssService = inject(ChildSupportService);
  private readonly router = inject(Router);

  readonly paymentDate = signal<string>('2026-10-23');
  readonly amountDollars = signal<string>('350.00');
  readonly method = signal<ProofPaymentMethod>('bank_transfer');
  readonly referenceNumber = signal<string>('TX-882190');
  readonly fileName = signal<string>('bank_transfer_receipt_oct2026.pdf');
  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  onDateChange(event: Event): void {
    this.paymentDate.set((event.target as HTMLInputElement).value);
  }

  onAmountChange(event: Event): void {
    this.amountDollars.set((event.target as HTMLInputElement).value);
  }

  onMethodChange(event: Event): void {
    this.method.set((event.target as HTMLSelectElement).value as ProofPaymentMethod);
  }

  onRefChange(event: Event): void {
    this.referenceNumber.set((event.target as HTMLInputElement).value);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileName.set(input.files[0]?.name ?? 'uploaded_receipt.pdf');
    }
  }

  async onSubmit(): Promise<void> {
    const parsedAmount = Math.round(parseFloat(this.amountDollars() || '0') * 100);
    if (parsedAmount <= 0) {
      this.errorMessage.set('Please specify a valid payment amount.');
      return;
    }

    this.isSubmitting.set(true);
    try {
      await this.cssService.submitProof({
        paymentDate: this.paymentDate(),
        amountCents: parsedAmount,
        paymentMethod: this.method(),
        referenceNumber: this.referenceNumber(),
        fileUrl: `/documents/${this.fileName()}`,
      });
      await this.router.navigate(['/child-support/proof-package']);
    } catch {
      this.errorMessage.set('Failed to submit proof package.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
