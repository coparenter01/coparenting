import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';
import { formatCurrency } from '@core/expenses/expenses.utils';

@Component({
  selector: 'pp-running-balance',
  imports: [RouterLink],
  templateUrl: './running-balance.page.html',
  styleUrl: './running-balance.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunningBalancePage {
  private readonly expensesService = inject(ExpensesService);

  readonly balance = this.expensesService.runningBalance;
  readonly requests = this.expensesService.reimbursementRequests;
  readonly payments = this.expensesService.childSupportPayments;

  readonly netAmountFormatted = computed<string>(() => {
    return formatCurrency(this.balance().netBalanceCents);
  });

  readonly parentAOwedFormatted = computed<string>(() => {
    return formatCurrency(this.balance().parentAOwedCents);
  });

  readonly parentBOwedFormatted = computed<string>(() => {
    return formatCurrency(this.balance().parentBOwedCents);
  });

  formatCents(cents: number): string {
    return formatCurrency(cents);
  }
}
