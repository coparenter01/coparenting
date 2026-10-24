import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';
import type { ExpenseCategory, ExpenseVisibility } from '@core/expenses/expenses.types';
import { EXPENSE_CATEGORIES, parseAmountToCents } from '@core/expenses/expenses.utils';

@Component({
  selector: 'pp-expense-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './expense-form.page.html',
  styleUrl: './expense-form.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseFormPage {
  private readonly expensesService = inject(ExpensesService);
  private readonly router = inject(Router);

  readonly categories = EXPENSE_CATEGORIES;

  description = '';
  category: ExpenseCategory | '' = '';
  expenseDate = new Date().toISOString().slice(0, 10);
  amountStr = '';
  note = '';
  visibility: ExpenseVisibility = 'Shared';

  readonly selectedChildren = signal<{ id: string; name: string }[]>([
    { id: 'child-1', name: 'Maya Rivera' },
  ]);

  readonly receiptFiles = signal<{ name: string; size: number; type: string }[]>([]);
  readonly errorMessage = signal<string | null>(null);

  isChildSelected(id: string): boolean {
    return this.selectedChildren().some((c) => c.id === id);
  }

  toggleChild(id: string, name: string): void {
    this.selectedChildren.update((list) => {
      const exists = list.some((c) => c.id === id);
      if (exists) {
        return list.filter((c) => c.id !== id);
      }
      return [...list, { id, name }];
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    if (file) {
      this.receiptFiles.update((list) => [
        ...list,
        { name: file.name, size: file.size, type: file.type },
      ]);
    }
  }

  private validateForm(desc: string, parsedCents: number | null): string | null {
    if (!desc) return 'Description is required (ERR-03).';
    if (desc.length > 100) return 'Description cannot exceed 100 characters (ERR-04).';
    if (!this.category) return 'Category is required (ERR-03).';
    if (!this.expenseDate) return 'Expense date is required (ERR-03).';
    const todayStr = new Date().toISOString().slice(0, 10);
    if (this.expenseDate > todayStr) return 'Expense date cannot be in the future (ERR-02).';
    if (parsedCents === null) {
      return 'Please enter a valid amount between $0.01 and $99,999.99 (ERR-01).';
    }
    if (this.note.length > 500) return 'Note cannot exceed 500 characters (ERR-18).';
    return null;
  }

  saveExpense(): void {
    this.errorMessage.set(null);
    const desc = this.description.trim();
    const parsedCents = parseAmountToCents(this.amountStr);
    const validationError = this.validateForm(desc, parsedCents);
    if (validationError || parsedCents === null || !this.category) {
      this.errorMessage.set(validationError ?? 'Category is required (ERR-03).');
      return;
    }

    const created = this.expensesService.createExpense({
      householdId: 'hh-1',
      description: desc,
      category: this.category,
      expenseDate: this.expenseDate,
      amountCents: parsedCents,
      visibility: this.visibility,
      note: this.note,
      children: this.selectedChildren(),
    });

    for (const file of this.receiptFiles()) {
      this.expensesService.addAttachment(created.id, file.name, file.size, file.type);
    }

    void this.router.navigate(['/expenses', created.id]);
  }
}
