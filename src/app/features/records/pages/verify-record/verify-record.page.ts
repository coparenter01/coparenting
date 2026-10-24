import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, type OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecordsService } from '@core/records/records.service';
import type { RecordTypeOption, VerificationLookupResult } from '@core/records/records.types';
import { formatRecordId, getRecordTypeLabel } from '@core/records/records.utils';

@Component({
  selector: 'pp-verify-record',
  imports: [RouterLink, DatePipe],
  templateUrl: './verify-record.page.html',
  styleUrls: ['./verify-record.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyRecordPage implements OnInit {
  private readonly recordsService = inject(RecordsService);
  private readonly route = inject(ActivatedRoute);

  readonly recordIdInput = signal<string>('');
  readonly isCheckingId = signal<boolean>(false);
  readonly idLookupResult = signal<VerificationLookupResult | null>(null);

  readonly selectedFile = signal<File | null>(null);
  readonly isComparingFile = signal<boolean>(false);
  readonly fileComparisonResult = signal<VerificationLookupResult | null>(null);
  readonly fileValidationError = signal<string | null>(null);

  ngOnInit(): void {
    const qId = this.route.snapshot.queryParamMap.get('recordId');
    if (qId) {
      this.recordIdInput.set(qId);
      void this.verifyId();
    }
  }

  onRecordIdChange(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    this.recordIdInput.set(formatRecordId(raw));
  }

  async verifyId(): Promise<void> {
    const id = this.recordIdInput().trim();
    if (!id) return;

    this.isCheckingId.set(true);
    this.idLookupResult.set(null);

    try {
      const res = await this.recordsService.verifyRecord(id);
      this.idLookupResult.set(res);
    } finally {
      this.isCheckingId.set(false);
    }
  }

  onFileSelected(event: Event): void {
    this.fileValidationError.set(null);
    this.fileComparisonResult.set(null);
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (!file) {
      this.selectedFile.set(null);
      return;
    }

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      this.fileValidationError.set('Upload a PDF file of up to 25 MB.');
      this.selectedFile.set(null);
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      this.fileValidationError.set('Upload a PDF file of up to 25 MB.');
      this.selectedFile.set(null);
      return;
    }

    this.selectedFile.set(file);
  }

  async compareFile(): Promise<void> {
    const file = this.selectedFile();
    const id = this.recordIdInput().trim();
    if (!file || !id) return;

    this.isComparingFile.set(true);
    this.fileComparisonResult.set(null);

    try {
      const res = await this.recordsService.verifyRecord(id, file);
      this.fileComparisonResult.set(res);
    } finally {
      this.isComparingFile.set(false);
    }
  }

  formatRecordTypes(types: RecordTypeOption[]): string {
    return types.map((t) => getRecordTypeLabel(t)).join(', ');
  }
}
