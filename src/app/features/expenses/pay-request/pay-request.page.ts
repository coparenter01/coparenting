import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';
import type { PaymentMethod, ReimbursementRequestModel } from '@core/expenses/expenses.types';
import { formatCurrency } from '@core/expenses/expenses.utils';

@Component({
  selector: 'pp-pay-request',
  imports: [FormsModule, RouterLink],
  templateUrl: './pay-request.page.html',
  styleUrl: './pay-request.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayRequestPage {
  private readonly expensesService = inject(ExpensesService);
  private readonly route = inject(ActivatedRoute);

  paymentMethod: PaymentMethod = 'Bank transfer (ACH)';
  readonly isProcessing = signal<boolean>(false);
  readonly isCompleted = signal<boolean>(false);
  readonly transactionRef = signal<string | null>(null);

  readonly request = computed<ReimbursementRequestModel | undefined>(() => {
    const id = this.route.snapshot.paramMap.get('id') ?? 'req-1';
    return (
      this.expensesService.reimbursementRequests().find((r) => r.id === id) ??
      this.expensesService.reimbursementRequests()[0]
    );
  });

  readonly formattedAmount = computed<string>(() => {
    const req = this.request();
    return req ? formatCurrency(req.amountCents) : '$0.00';
  });

  executePayment(): void {
    const req = this.request();
    if (!req) return;

    this.isProcessing.set(true);

    setTimeout(() => {
      const payment = this.expensesService.payRequest(req.id, this.paymentMethod);
      this.isProcessing.set(false);
      this.isCompleted.set(true);
      this.transactionRef.set(payment.transactionRef);
    }, 600);
  }
}
