import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';
import type { ExpenseCategory, OcrReceiptResult } from '@core/expenses/expenses.types';
import {
  EXPENSE_CATEGORIES,
  parseAmountToCents,
  simulateOcrReceipt,
} from '@core/expenses/expenses.utils';

@Component({
  selector: 'pp-ai-expense-entry',
  imports: [FormsModule, RouterLink],
  templateUrl: './ai-expense-entry.page.html',
  styleUrl: './ai-expense-entry.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiExpenseEntryPage {
  private readonly expensesService = inject(ExpensesService);
  private readonly router = inject(Router);

  readonly categories = EXPENSE_CATEGORIES;
  readonly isAnalyzing = signal<boolean>(false);
  readonly ocrResult = signal<OcrReceiptResult | null>(null);
  readonly errorMessage = signal<string | null>(null);

  fileName = 'sample-pharmacy-receipt.jpg';
  merchantName = '';
  expenseDate = new Date().toISOString().slice(0, 10);
  amountStr = '';
  category: ExpenseCategory = 'Medical';
  note = '';

  analyzeReceipt(name?: string): void {
    const targetFile = name ?? this.fileName;
    this.isAnalyzing.set(true);
    this.errorMessage.set(null);

    setTimeout(() => {
      const res = simulateOcrReceipt(targetFile);
      this.ocrResult.set(res);
      this.merchantName = res.merchantName;
      this.expenseDate = res.date;
      this.amountStr = (res.amountCents / 100).toFixed(2);
      this.category = res.suggestedCategory;
      this.note = `Auto-extracted via OCR (${(res.confidenceScore * 100).toFixed(0)}% confidence)`;
      this.isAnalyzing.set(false);
    }, 450);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    if (file) {
      this.fileName = file.name;
      this.analyzeReceipt(file.name);
    }
  }

  saveVerifiedExpense(): void {
    this.errorMessage.set(null);
    const desc = this.merchantName.trim();
    if (!desc) {
      this.errorMessage.set('Description/Merchant is required.');
      return;
    }

    const cents = parseAmountToCents(this.amountStr);
    if (cents === null) {
      this.errorMessage.set('Valid amount is required.');
      return;
    }

    const created = this.expensesService.createExpense({
      householdId: 'hh-1',
      description: desc,
      category: this.category,
      expenseDate: this.expenseDate,
      amountCents: cents,
      note: this.note,
    });

    this.expensesService.addAttachment(created.id, this.fileName, 128000, 'image/jpeg');

    void this.router.navigate(['/expenses', created.id]);
  }
}
