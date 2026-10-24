import { DatePipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ChildrenService } from '@core/children/children.service';
import { DocumentsService } from '@core/documents/documents.service';
import { HouseholdService } from '@core/household/household.service';

@Component({
  selector: 'pp-child-entry-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './child-entry-detail.page.html',
  styleUrl: './child-entry-detail.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildEntryDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly childrenService = inject(ChildrenService);
  private readonly documentsService = inject(DocumentsService);
  private readonly householdService = inject(HouseholdService);

  public readonly children = this.childrenService.children;
  public readonly entries = this.childrenService.entries;
  public readonly documents = this.documentsService.documents;

  public readonly entryId = computed(() => this.route.snapshot.paramMap.get('id'));
  public readonly entry = computed(() => {
    const id = this.entryId();
    return this.entries().find((e) => e.id === id) ?? this.entries()[0] ?? null;
  });

  public ngOnInit(): void {
    void this.initData();
  }

  private async initData(): Promise<void> {
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    await this.childrenService.loadChildren(hid);
    await this.childrenService.loadInformationEntries(hid);
    await this.documentsService.loadDocuments(hid);
  }

  public getChildName(childId: string | null): string {
    if (!childId) return 'All children';
    const c = this.children().find((item) => item.id === childId);
    return c ? `${c.first_name} ${c.last_name}`.trim() : 'Child';
  }

  public shareEntry(): void {
    const confirmed = window.confirm(
      'Once you share this, your co-parent can see it and you cannot make it private again. Proceed?',
    );
    if (!confirmed) return;
    // Update visibility to Shared
  }

  public async archiveEntry(): Promise<void> {
    const confirmed = window.confirm('Archive this entry? You can restore it later.');
    if (!confirmed) return;
    await this.router.navigate(['/children/info']);
  }
}
