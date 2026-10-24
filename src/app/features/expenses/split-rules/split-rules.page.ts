import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';
import type { ExpenseCategory } from '@core/expenses/expenses.types';
import { EXPENSE_CATEGORIES } from '@core/expenses/expenses.utils';

@Component({
  selector: 'pp-split-rules',
  imports: [FormsModule, RouterLink],
  templateUrl: './split-rules.page.html',
  styleUrl: './split-rules.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitRulesPage {
  private readonly expensesService = inject(ExpensesService);

  readonly categories = EXPENSE_CATEGORIES;
  readonly splitRules = this.expensesService.splitRules;

  readonly showAddModal = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  newCategory: ExpenseCategory = 'Childcare';
  parentAPercentage = 50;
  parentBPercentage = 50;
  effectiveDate = new Date().toISOString().slice(0, 10);

  openAddModal(): void {
    this.showAddModal.set(true);
    this.errorMessage.set(null);
  }

  closeAddModal(): void {
    this.showAddModal.set(false);
  }

  onParentAChange(): void {
    const a = Math.max(0, Math.min(100, this.parentAPercentage));
    this.parentAPercentage = a;
    this.parentBPercentage = 100 - a;
  }

  saveRule(): void {
    if (this.parentAPercentage + this.parentBPercentage !== 100) {
      this.errorMessage.set('Percentages must sum exactly to 100%.');
      return;
    }

    this.expensesService.createSplitRule({
      householdId: 'hh-1',
      category: this.newCategory,
      parentAPercentage: this.parentAPercentage,
      parentBPercentage: this.parentBPercentage,
      effectiveDate: this.effectiveDate,
    });

    this.showAddModal.set(false);
  }
}
