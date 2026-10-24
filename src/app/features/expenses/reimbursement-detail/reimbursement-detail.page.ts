import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';
import type { ReimbursementRequestModel } from '@core/expenses/expenses.types';
import { formatCurrency } from '@core/expenses/expenses.utils';

@Component({
  selector: 'pp-reimbursement-detail',
  imports: [FormsModule, RouterLink, SlicePipe],
  templateUrl: './reimbursement-detail.page.html',
  styleUrl: './reimbursement-detail.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReimbursementDetailPage {
  private readonly expensesService = inject(ExpensesService);
  private readonly route = inject(ActivatedRoute);

  readonly showDeclineModal = signal<boolean>(false);
  readonly declineReason = signal<string>('');
  readonly actionMessage = signal<string | null>(null);

  readonly request = computed<ReimbursementRequestModel | undefined>(() => {
    const id = this.route.snapshot.paramMap.get('id') ?? 'req-1';
    return (
      this.expensesService.reimbursementRequests().find((r) => r.id === id) ??
      this.expensesService.reimbursementRequests()[0]
    );
  });

  readonly isRequester = computed<boolean>(() => {
    return this.request()?.requestedBy === 'user-1';
  });

  readonly formattedAmount = computed<string>(() => {
    const req = this.request();
    return req ? formatCurrency(req.amountCents) : '$0.00';
  });

  readonly formattedTotal = computed<string>(() => {
    const req = this.request();
    return req ? formatCurrency(req.expenseTotalCents) : '$0.00';
  });

  acceptRequest(): void {
    const req = this.request();
    if (!req) return;
    this.expensesService.answerReimbursementRequest(req.id, 'Accepted');
    this.actionMessage.set('Request accepted. Added to running balance.');
  }

  openDeclineModal(): void {
    this.showDeclineModal.set(true);
  }

  closeDeclineModal(): void {
    this.showDeclineModal.set(false);
  }

  confirmDecline(): void {
    const req = this.request();
    const reason = this.declineReason().trim();
    if (!req || !reason) return;

    this.expensesService.answerReimbursementRequest(req.id, 'Declined', reason);
    this.showDeclineModal.set(false);
    this.actionMessage.set('Request marked as declined with your reason.');
  }

  markPaid(): void {
    const req = this.request();
    if (!req) return;
    this.expensesService.answerReimbursementRequest(req.id, 'Paid');
    this.actionMessage.set('Marked as paid.');
  }

  withdrawRequest(): void {
    const req = this.request();
    if (!req) return;
    this.expensesService.answerReimbursementRequest(req.id, 'Withdrawn');
    this.actionMessage.set('Request withdrawn.');
  }
}
