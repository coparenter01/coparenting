import { DatePipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecordsService } from '@core/records/records.service';
import type { JournalEntry } from '@core/records/records.types';

@Component({
  selector: 'pp-journal-detail',
  imports: [RouterLink, DatePipe, TitleCasePipe],
  templateUrl: './journal-detail.page.html',
  styleUrls: ['./journal-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalDetailPage {
  private readonly recordsService = inject(RecordsService);
  private readonly route = inject(ActivatedRoute);

  readonly entryId = signal<string>(this.route.snapshot.paramMap.get('id') ?? '');

  readonly entry = computed<JournalEntry | null>(() => {
    const id = this.entryId();
    return this.recordsService.journalEntries().find((e) => e.entryId === id) ?? null;
  });

  async onVoidEntry(): Promise<void> {
    const confirmed = window.confirm(
      'Are you sure you want to void this note? It will remain in your audit history but cannot be modified further.',
    );
    if (!confirmed) return;

    await this.recordsService.voidJournalEntry(this.entryId());
  }

  openFile(fileName: string): void {
    window.alert(`Downloading file attachment: ${fileName}`);
  }
}
