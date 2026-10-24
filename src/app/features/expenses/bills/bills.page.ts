import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';
import type { ExpenseCategory } from '@core/expenses/expenses.types';
import {
  EXPENSE_CATEGORIES,
  formatCurrency,
  parseAmountToCents,
} from '@core/expenses/expenses.utils';

@Component({
  selector: 'pp-bills',
  imports: [FormsModule, RouterLink],
  templateUrl: './bills.page.html',
  styleUrl: './bills.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillsPage {
  private readonly expensesService = inject(ExpensesService);

  readonly categories = EXPENSE_CATEGORIES;
  readonly bills = this.expensesService.bills;
  readonly showAddModal = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  payeeName = '';
  amountStr = '';
  dueDate = new Date(Date.now() + 10 * 24 * 3600 * 1000).toISOString().slice(0, 10);
  category: ExpenseCategory = 'Childcare';
  isSplit = true;

  formatCents(cents: number): string {
    return formatCurrency(cents);
  }

  openAddModal(): void {
    this.showAddModal.set(true);
    this.errorMessage.set(null);
  }

  closeAddModal(): void {
    this.showAddModal.set(false);
  }

  markPaid(id: string): void {
    this.expensesService.markBillPaid(id);
  }

  saveBill(): void {
    const payee = this.payeeName.trim();
    if (!payee) {
      this.errorMessage.set('Payee name is required.');
      return;
    }

    const cents = parseAmountToCents(this.amountStr);
    if (cents === null) {
      this.errorMessage.set('Valid amount is required.');
      return;
    }

    this.expensesService.createBill({
      householdId: 'hh-1',
      payeeName: payee,
      amountCents: cents,
      dueDate: this.dueDate,
      category: this.category,
      isSplit: this.isSplit,
    });

    this.showAddModal.set(false);
  }
}
