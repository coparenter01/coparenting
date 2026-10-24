import { DatePipe, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecordsService } from '@core/records/records.service';

@Component({
  selector: 'pp-journal-list',
  imports: [RouterLink, DatePipe, SlicePipe],
  templateUrl: './journal-list.page.html',
  styleUrls: ['./journal-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalListPage {
  private readonly recordsService = inject(RecordsService);

  readonly entries = this.recordsService.journalEntries;
  readonly searchQuery = signal<string>('');
  readonly fromDate = signal<string>('');
  readonly toDate = signal<string>('');

  readonly filteredEntries = computed(() => {
    let list = this.entries();
    const query = this.searchQuery().toLowerCase().trim();
    const from = this.fromDate();
    const to = this.toDate();

    if (query) {
      list = list.filter(
        (e) => e.title.toLowerCase().includes(query) || e.details.toLowerCase().includes(query),
      );
    }

    if (from) {
      const fromTime = new Date(from).getTime();
      list = list.filter((e) => new Date(e.happenedAt).getTime() >= fromTime);
    }

    if (to) {
      const toTime = new Date(to).getTime() + 86400000;
      list = list.filter((e) => new Date(e.happenedAt).getTime() <= toTime);
    }

    return list;
  });

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  onFromDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.fromDate.set(target.value);
  }

  onToDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.toDate.set(target.value);
  }
}
