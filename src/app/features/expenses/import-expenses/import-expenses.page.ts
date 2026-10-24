import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';
import type { CsvImportRow } from '@core/expenses/expenses.types';
import { formatCents, parseCsvContent } from '@core/expenses/expenses.utils';

const SAMPLE_CSV = `Date,Description,Amount,Category
2026-10-15,Pediatric Dental Checkup,180.00,Dental
2026-10-18,Soccer Cleats and Shin Guards,74.50,Activities
2026-10-20,Fall Term School Textbooks,120.00,School`;

@Component({
  selector: 'pp-import-expenses',
  imports: [RouterLink],
  templateUrl: './import-expenses.page.html',
  styleUrl: './import-expenses.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportExpensesPage {
  private readonly router = inject(Router);
  private readonly expensesService = inject(ExpensesService);

  readonly selectedFormat = signal<'CSV' | 'OFX' | 'QFX'>('CSV');
  readonly parsedRows = signal<CsvImportRow[]>([]);
  readonly importSuccessCount = signal<number | null>(null);
  readonly errorMessage = signal<string | null>(null);
  readonly fileName = signal<string>('');

  formatMoney(cents: number): string {
    return formatCents(cents);
  }

  loadSampleCsv(): void {
    this.errorMessage.set(null);
    this.importSuccessCount.set(null);
    this.fileName.set('sample_expenses.csv');
    const rows = parseCsvContent(SAMPLE_CSV);
    this.parsedRows.set(rows);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.fileName.set(file.name);
    this.errorMessage.set(null);
    this.importSuccessCount.set(null);

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const rows = parseCsvContent(text);
      if (rows.length === 0) {
        this.errorMessage.set('The file did not contain any valid data rows.');
      }
      this.parsedRows.set(rows);
    };
    reader.onerror = () => {
      this.errorMessage.set('Failed to read the file.');
    };
    reader.readAsText(file);
  }

  onFormatChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value as 'CSV' | 'OFX' | 'QFX';
    this.selectedFormat.set(val);
  }

  importAll(): void {
    const validRows = this.parsedRows().filter((r) => r.isValid);
    if (validRows.length === 0) {
      this.errorMessage.set('No valid rows available to import.');
      return;
    }

    let count = 0;
    for (const row of validRows) {
      this.expensesService.createExpense({
        householdId: 'hh-1',
        description: row.description,
        category: row.category,
        expenseDate: row.date,
        amountCents: row.amountCents,
        note: `Imported via CSV: ${this.fileName() || 'file'}`,
      });
      count++;
    }

    this.importSuccessCount.set(count);
    this.parsedRows.set([]);
  }

  cancel(): void {
    if (this.parsedRows().length > 0) {
      this.parsedRows.set([]);
      this.fileName.set('');
    } else {
      void this.router.navigate(['/expenses']);
    }
  }
}
