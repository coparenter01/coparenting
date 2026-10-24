import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChildrenService } from '@core/children/children.service';
import { DocumentsService } from '@core/documents/documents.service';
import { HouseholdService } from '@core/household/household.service';
import type { ChildSection } from '@core/supabase/models.types';

@Component({
  selector: 'pp-child-information',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './child-information.page.html',
  styleUrl: './child-information.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildInformationPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly childrenService = inject(ChildrenService);
  private readonly documentsService = inject(DocumentsService);
  private readonly householdService = inject(HouseholdService);

  public readonly sections: readonly ChildSection[] = [
    'Medical',
    'School',
    'Contacts',
    'Activities',
    'Other',
  ];
  public readonly selectedSection = signal<ChildSection>('Medical');
  public readonly selectedChildId = signal<string | null>(null);

  public readonly children = this.childrenService.children;
  public readonly selectedChild = computed(() => {
    const id = this.selectedChildId();
    return this.children().find((c) => c.id === id) ?? null;
  });

  public readonly entries = this.childrenService.entries;
  public readonly documents = this.documentsService.documents;

  public readonly filteredEntries = computed(() => {
    const sec = this.selectedSection();
    const cid = this.selectedChildId();
    return this.entries().filter((e) => {
      const matchSec = e.section === sec;
      const matchChild = !cid || e.child_id === cid || !e.child_id;
      return matchSec && matchChild;
    });
  });

  public ngOnInit(): void {
    void this.initData();
  }

  private async initData(): Promise<void> {
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    await this.childrenService.loadChildren(hid);
    await this.childrenService.loadInformationEntries(hid);
    await this.documentsService.loadDocuments(hid);

    const queryChildId = this.route.snapshot.queryParamMap.get('childId');
    if (queryChildId) {
      this.selectedChildId.set(queryChildId);
    } else if (this.children().length > 0) {
      this.selectedChildId.set(this.children()[0]?.id ?? null);
    }
  }

  public setSection(section: ChildSection): void {
    this.selectedSection.set(section);
  }

  public onChildFilterChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedChildId.set(val || null);
  }

  public getChildName(childId: string | null): string {
    if (!childId) return 'All children';
    const c = this.children().find((item) => item.id === childId);
    return c ? `${c.first_name} ${c.last_name}`.trim() : 'Child';
  }
}
