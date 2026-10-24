import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RecordsService } from '@core/records/records.service';
import type { ExportFormat, RecordTypeOption } from '@core/records/records.types';

@Component({
  selector: 'pp-create-export',
  imports: [RouterLink],
  templateUrl: './create-export.page.html',
  styleUrls: ['./create-export.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateExportPage {
  private readonly recordsService = inject(RecordsService);
  private readonly router = inject(Router);

  readonly format = signal<ExportFormat>('certified_pdf');
  readonly selectedTypes = signal<Set<RecordTypeOption>>(
    new Set(['messages', 'calendar', 'expenses']),
  );
  readonly startDate = signal<string>('2026-01-01');
  readonly endDate = signal<string>('2026-06-30');
  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  setFormat(fmt: ExportFormat): void {
    this.format.set(fmt);
  }

  isTypeSelected(type: RecordTypeOption): boolean {
    return this.selectedTypes().has(type);
  }

  toggleType(type: RecordTypeOption): void {
    const updated = new Set(this.selectedTypes());
    if (updated.has(type)) {
      updated.delete(type);
    } else {
      updated.add(type);
    }
    this.selectedTypes.set(updated);
  }

  onStartDateChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.startDate.set(val);
  }

  onEndDateChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.endDate.set(val);
  }

  async onSubmit(): Promise<void> {
    this.errorMessage.set(null);
    this.isSubmitting.set(true);

    try {
      await this.recordsService.createExport({
        format: this.format(),
        recordTypes: Array.from(this.selectedTypes()),
        dateFrom: this.startDate(),
        dateTo: this.endDate(),
      });
      await this.router.navigate(['/records/history']);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create export.';
      this.errorMessage.set(message);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
