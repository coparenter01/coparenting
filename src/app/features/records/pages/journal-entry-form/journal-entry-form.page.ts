import { ChangeDetectionStrategy, Component, inject, signal, type OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecordsService } from '@core/records/records.service';
import type { JournalType } from '@core/records/records.types';

@Component({
  selector: 'pp-journal-entry-form',
  imports: [RouterLink],
  templateUrl: './journal-entry-form.page.html',
  styleUrls: ['./journal-entry-form.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JournalEntryFormPage implements OnInit {
  private readonly recordsService = inject(RecordsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly isEditMode = signal<boolean>(false);
  readonly entryId = signal<string | null>(null);

  readonly entryType = signal<JournalType>('incident');
  readonly title = signal<string>('');
  readonly happenedAt = signal<string>(new Date().toISOString().slice(0, 16));
  readonly details = signal<string>('');
  readonly selectedChildren = signal<Set<string>>(new Set());
  readonly files = signal<File[]>([]);

  readonly availableChildren = signal<{ id: string; name: string }[]>([
    { id: 'ch-001', name: 'Emma' },
    { id: 'ch-002', name: 'Liam' },
  ]);

  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.entryId.set(id);
      this.isEditMode.set(true);
      const existing = this.recordsService.journalEntries().find((e) => e.entryId === id);
      if (existing) {
        this.entryType.set(existing.entryType);
        this.title.set(existing.title);
        this.happenedAt.set(existing.happenedAt.slice(0, 16));
        this.details.set(existing.details);
        this.selectedChildren.set(new Set(existing.children));
      }
    }
  }

  setEntryType(type: JournalType): void {
    this.entryType.set(type);
  }

  onTitleChange(e: Event): void {
    this.title.set((e.target as HTMLInputElement).value);
  }

  onHappenedAtChange(e: Event): void {
    this.happenedAt.set((e.target as HTMLInputElement).value);
  }

  onDetailsChange(e: Event): void {
    this.details.set((e.target as HTMLTextAreaElement).value);
  }

  isChildSelected(id: string): boolean {
    return this.selectedChildren().has(id);
  }

  toggleChild(id: string): void {
    const s = new Set(this.selectedChildren());
    if (s.has(id)) s.delete(id);
    else s.add(id);
    this.selectedChildren.set(s);
  }

  onFilesSelected(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this.files.set(Array.from(input.files).slice(0, 5));
    }
  }

  async onSubmit(): Promise<void> {
    this.errorMessage.set(null);
    this.isSubmitting.set(true);

    try {
      const currentId = this.entryId();
      if (this.isEditMode() && currentId) {
        await this.recordsService.updateJournalEntry(currentId, {
          title: this.title(),
          happenedAt: new Date(this.happenedAt()).toISOString(),
          details: this.details(),
        });
        await this.router.navigate(['/records/journal', currentId]);
      } else {
        await this.recordsService.addJournalEntry({
          entryType: this.entryType(),
          title: this.title(),
          happenedAt: new Date(this.happenedAt()).toISOString(),
          details: this.details(),
          children: Array.from(this.selectedChildren()),
          files: this.files(),
        });
        await this.router.navigate(['/records/journal']);
      }
    } catch (err: unknown) {
      this.errorMessage.set(err instanceof Error ? err.message : 'Error saving entry.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
