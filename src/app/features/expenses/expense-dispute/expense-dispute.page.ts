import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';
import type { ExpenseModel } from '@core/expenses/expenses.types';
import { formatCurrency } from '@core/expenses/expenses.utils';

@Component({
  selector: 'pp-expense-dispute',
  imports: [FormsModule, RouterLink],
  templateUrl: './expense-dispute.page.html',
  styleUrl: './expense-dispute.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseDisputePage {
  private readonly expensesService = inject(ExpensesService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  reasonCategory = 'Receipt missing';
  explanation = '';

  readonly errorMessage = signal<string | null>(null);

  readonly expense = computed<ExpenseModel | undefined>(() => {
    const id = this.route.snapshot.paramMap.get('id') ?? 'exp-2';
    return (
      this.expensesService.expenses().find((e) => e.id === id) ?? this.expensesService.expenses()[0]
    );
  });

  readonly formattedAmount = computed<string>(() => {
    const exp = this.expense();
    return exp ? formatCurrency(exp.amountCents) : '$0.00';
  });

  submitDispute(): void {
    this.errorMessage.set(null);
    const exp = this.expense();
    if (!exp) return;

    const expl = this.explanation.trim();
    if (expl.length < 10) {
      this.errorMessage.set('Please provide an explanation of at least 10 characters.');
      return;
    }
    if (expl.length > 500) {
      this.errorMessage.set('Explanation cannot exceed 500 characters.');
      return;
    }

    this.expensesService.createDispute({
      householdId: exp.householdId,
      expenseId: exp.id,
      reasonCategory: this.reasonCategory,
      explanation: expl,
    });

    void this.router.navigate(['/expenses', exp.id]);
  }
}
