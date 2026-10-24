import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';
import type { ExpenseModel } from '@core/expenses/expenses.types';
import { calculateSplit, formatCurrency } from '@core/expenses/expenses.utils';

@Component({
  selector: 'pp-reimbursement-request',
  imports: [FormsModule, RouterLink],
  templateUrl: './reimbursement-request.page.html',
  styleUrl: './reimbursement-request.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReimbursementRequestPage {
  private readonly expensesService = inject(ExpensesService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  splitPercentage = 50;
  dueDate = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().slice(0, 10);
  note = '';

  readonly errorMessage = signal<string | null>(null);

  readonly expense = computed<ExpenseModel | undefined>(() => {
    const id = this.route.snapshot.paramMap.get('id') ?? 'exp-1';
    return (
      this.expensesService.expenses().find((e) => e.id === id) ?? this.expensesService.expenses()[0]
    );
  });

  readonly calculatedShareFormatted = computed<string>(() => {
    const exp = this.expense();
    if (!exp) return '$0.00';
    const cents = calculateSplit(exp.amountCents, this.splitPercentage);
    return formatCurrency(cents);
  });

  setPresetPercentage(pct: number): void {
    this.splitPercentage = pct;
  }

  sendRequest(): void {
    this.errorMessage.set(null);
    const exp = this.expense();
    if (!exp) {
      this.errorMessage.set('Expense could not be found.');
      return;
    }

    if (this.splitPercentage <= 0 || this.splitPercentage > 100) {
      this.errorMessage.set('Split percentage must be between 1% and 100%.');
      return;
    }

    const todayStr = new Date().toISOString().slice(0, 10);
    if (this.dueDate < todayStr) {
      this.errorMessage.set('Due date cannot be in the past.');
      return;
    }

    const req = this.expensesService.createReimbursementRequest({
      householdId: exp.householdId,
      expenseId: exp.id,
      splitPercentage: this.splitPercentage,
      dueDate: this.dueDate,
      note: this.note,
    });

    void this.router.navigate(['/expenses/requests', req.id]);
  }
}
