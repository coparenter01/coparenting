import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChildrenService } from '@core/children/children.service';
import { DocumentsService, MAX_STORAGE_LIMIT_BYTES } from '@core/documents/documents.service';
import { HouseholdService } from '@core/household/household.service';

@Component({
  selector: 'pp-documents-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './documents-list.page.html',
  styleUrl: './documents-list.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsListPage implements OnInit {
  private readonly documentsService = inject(DocumentsService);
  private readonly childrenService = inject(ChildrenService);
  private readonly householdService = inject(HouseholdService);

  public readonly documents = this.documentsService.documents;
  public readonly children = this.childrenService.children;
  public readonly totalStorageUsed = this.documentsService.totalStorageUsed;

  public readonly selectedCategory = signal<string | null>(null);
  public readonly selectedChildId = signal<string | null>(null);

  public readonly storagePercent = computed(() => {
    const bytes = this.totalStorageUsed();
    return Math.min(100, Math.round((bytes / MAX_STORAGE_LIMIT_BYTES) * 100));
  });

  public readonly storageUsedMb = computed(() => {
    return (this.totalStorageUsed() / (1024 * 1024)).toFixed(1);
  });

  public readonly filteredDocuments = computed(() => {
    const cat = this.selectedCategory();
    const cid = this.selectedChildId();
    return this.documents().filter((d) => {
      const matchCat = !cat || d.category === cat;
      const matchChild = !cid || d.child_id === cid;
      return matchCat && matchChild;
    });
  });

  public ngOnInit(): void {
    void this.initData();
  }

  private async initData(): Promise<void> {
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    await this.childrenService.loadChildren(hid);
    await this.documentsService.loadDocuments(hid);
  }

  public onCategoryChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedCategory.set(val || null);
  }

  public onChildChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedChildId.set(val || null);
  }

  public getChildName(childId: string | null): string {
    if (!childId) return '—';
    const c = this.children().find((item) => item.id === childId);
    return c ? `${c.first_name} ${c.last_name}`.trim() : 'Child';
  }

  public formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${String(bytes)} B`;
    if (bytes < 1024 * 1024) return `${String(Math.round(bytes / 1024))} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
