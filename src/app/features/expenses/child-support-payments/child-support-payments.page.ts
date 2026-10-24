import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';
import { formatCurrency } from '@core/expenses/expenses.utils';

@Component({
  selector: 'pp-child-support-payments',
  imports: [RouterLink],
  templateUrl: './child-support-payments.page.html',
  styleUrl: './child-support-payments.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildSupportPaymentsPage {
  private readonly expensesService = inject(ExpensesService);

  readonly payments = this.expensesService.childSupportPayments;

  readonly totalPaidYearFormatted = computed<string>(() => {
    const totalCents = this.payments().reduce((sum, p) => sum + p.amountCents, 0);
    return formatCurrency(totalCents);
  });

  formatCents(cents: number): string {
    return formatCurrency(cents);
  }
}
