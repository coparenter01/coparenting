import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';
import type { ExpenseModel } from '@core/expenses/expenses.types';
import { EXPENSE_CATEGORIES, formatCurrency } from '@core/expenses/expenses.utils';

@Component({
  selector: 'pp-expense-log',
  imports: [FormsModule, RouterLink],
  templateUrl: './expense-log.page.html',
  styleUrl: './expense-log.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseLogPage {
  private readonly expensesService = inject(ExpensesService);

  readonly categories = EXPENSE_CATEGORIES;
  selectedCategory = 'All';
  selectedChild = 'All';
  selectedStatus = 'Active';

  readonly allExpenses = this.expensesService.expenses;
  readonly runningBalance = this.expensesService.runningBalance;

  readonly filteredExpenses = computed<ExpenseModel[]>(() => {
    let list = this.allExpenses();

    if (this.selectedStatus !== 'All') {
      list = list.filter((e) => e.status === this.selectedStatus);
    }
    if (this.selectedCategory !== 'All') {
      list = list.filter((e) => e.category === this.selectedCategory);
    }
    if (this.selectedChild !== 'All') {
      list = list.filter((e) => e.children.some((c) => c.name === this.selectedChild));
    }

    return [...list].sort(
      (a, b) => new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime(),
    );
  });

  readonly totalActiveAmountFormatted = computed<string>(() => {
    const totalCents = this.filteredExpenses()
      .filter((e) => e.status === 'Active')
      .reduce((sum, e) => sum + e.amountCents, 0);
    return formatCurrency(totalCents);
  });

  formatAmount(cents: number): string {
    return formatCurrency(cents);
  }

  applyFilter(): void {
    // Computed automatically updates with signal change
  }

  clearFilters(): void {
    this.selectedCategory = 'All';
    this.selectedChild = 'All';
    this.selectedStatus = 'Active';
  }
}
