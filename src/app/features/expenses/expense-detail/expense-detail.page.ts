import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';
import type { ExpenseModel } from '@core/expenses/expenses.types';
import { formatCurrency } from '@core/expenses/expenses.utils';

@Component({
  selector: 'pp-expense-detail',
  imports: [RouterLink, SlicePipe],
  templateUrl: './expense-detail.page.html',
  styleUrl: './expense-detail.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseDetailPage {
  private readonly expensesService = inject(ExpensesService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly showVoidModal = signal<boolean>(false);
  readonly showShareModal = signal<boolean>(false);
  readonly actionMessage = signal<string | null>(null);

  readonly expense = computed<ExpenseModel | undefined>(() => {
    const id = this.route.snapshot.paramMap.get('id') ?? 'exp-1';
    return (
      this.expensesService.expenses().find((e) => e.id === id) ?? this.expensesService.expenses()[0]
    );
  });

  readonly formattedAmount = computed<string>(() => {
    const exp = this.expense();
    return exp ? formatCurrency(exp.amountCents) : '$0.00';
  });

  formatCents(cents: number): string {
    return formatCurrency(cents);
  }

  openVoidModal(): void {
    this.showVoidModal.set(true);
  }

  closeVoidModal(): void {
    this.showVoidModal.set(false);
  }

  confirmVoid(): void {
    const exp = this.expense();
    if (!exp) return;

    const ok = this.expensesService.voidExpense(exp.id);
    this.showVoidModal.set(false);
    if (ok) {
      this.actionMessage.set('Expense marked as Voided. It remains in audit records.');
    } else {
      this.actionMessage.set('Cannot void an expense with an active reimbursement request.');
    }
  }

  openShareModal(): void {
    this.showShareModal.set(true);
  }

  closeShareModal(): void {
    this.showShareModal.set(false);
  }

  confirmShare(): void {
    const exp = this.expense();
    if (!exp) return;

    this.expensesService.shareExpense(exp.id);
    this.showShareModal.set(false);
    this.actionMessage.set('Expense is now Shared with your co-parent.');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const exp = this.expense();
    if (!input.files || input.files.length === 0 || !exp) return;

    const file = input.files[0];
    if (file) {
      this.expensesService.addAttachment(exp.id, file.name, file.size, file.type);
      this.actionMessage.set('Receipt attached successfully.');
    }
  }
}
