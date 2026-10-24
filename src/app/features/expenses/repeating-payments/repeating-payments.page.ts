import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';
import type { RecurringPaymentFrequency } from '@core/expenses/expenses.types';
import { formatCurrency, parseAmountToCents } from '@core/expenses/expenses.utils';

@Component({
  selector: 'pp-repeating-payments',
  imports: [FormsModule, RouterLink],
  templateUrl: './repeating-payments.page.html',
  styleUrl: './repeating-payments.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepeatingPaymentsPage {
  private readonly expensesService = inject(ExpensesService);

  readonly recurringPayments = this.expensesService.recurringPayments;
  readonly showAddModal = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  title = '';
  amountStr = '';
  frequency: RecurringPaymentFrequency = 'Monthly';
  nextDueDate = new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString().slice(0, 10);
  autoPay = true;

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

  toggleStatus(id: string): void {
    this.expensesService.toggleRecurringPayment(id);
  }

  saveRecurring(): void {
    const t = this.title.trim();
    if (!t) {
      this.errorMessage.set('Title is required.');
      return;
    }

    const cents = parseAmountToCents(this.amountStr);
    if (cents === null) {
      this.errorMessage.set('Valid amount is required.');
      return;
    }

    this.expensesService.createRecurringPayment({
      householdId: 'hh-1',
      title: t,
      amountCents: cents,
      frequency: this.frequency,
      nextDueDate: this.nextDueDate,
      autoPay: this.autoPay,
    });

    this.showAddModal.set(false);
  }
}
