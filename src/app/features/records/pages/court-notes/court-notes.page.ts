import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecordsService } from '@core/records/records.service';
import type { LegalContentItem } from '@core/records/records.types';

@Component({
  selector: 'pp-court-notes',
  imports: [RouterLink, DatePipe],
  templateUrl: './court-notes.page.html',
  styleUrls: ['./court-notes.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourtNotesPage {
  private readonly recordsService = inject(RecordsService);

  readonly availableNotes = this.recordsService.courtNotes;
  readonly selectedState = signal<string>('California');

  readonly currentNote = computed<LegalContentItem | null>(() => {
    const state = this.selectedState();
    return this.availableNotes().find((n) => n.state === state) ?? null;
  });

  onStateChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedState.set(target.value);
  }
}
