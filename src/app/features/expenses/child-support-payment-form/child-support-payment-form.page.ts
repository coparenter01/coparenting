import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';
import type { PaymentMethod } from '@core/expenses/expenses.types';
import { parseAmountToCents } from '@core/expenses/expenses.utils';

@Component({
  selector: 'pp-child-support-payment-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './child-support-payment-form.page.html',
  styleUrl: './child-support-payment-form.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildSupportPaymentFormPage {
  private readonly expensesService = inject(ExpensesService);
  private readonly router = inject(Router);

  amountStr = '';
  paymentDate = new Date().toISOString().slice(0, 10);
  paymentMethod: PaymentMethod = 'Bank transfer (ACH)';
  referenceNumber = '';
  note = '';

  readonly errorMessage = signal<string | null>(null);

  recordPayment(): void {
    this.errorMessage.set(null);

    const parsedCents = parseAmountToCents(this.amountStr);
    if (parsedCents === null) {
      this.errorMessage.set('Please enter a valid payment amount.');
      return;
    }

    const todayStr = new Date().toISOString().slice(0, 10);
    if (this.paymentDate > todayStr) {
      this.errorMessage.set('Payment date cannot be in the future.');
      return;
    }

    this.expensesService.recordChildSupportPayment({
      householdId: 'hh-1',
      amountCents: parsedCents,
      paymentDate: this.paymentDate,
      paymentMethod: this.paymentMethod,
      referenceNumber: this.referenceNumber,
      note: this.note,
    });

    void this.router.navigate(['/expenses/child-support']);
  }
}
