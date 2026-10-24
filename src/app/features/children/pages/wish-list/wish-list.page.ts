import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChildrenService } from '@core/children/children.service';
import { DocumentsService } from '@core/documents/documents.service';
import { HouseholdService } from '@core/household/household.service';

@Component({
  selector: 'pp-wish-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './wish-list.page.html',
  styleUrl: './wish-list.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishListPage implements OnInit {
  private readonly documentsService = inject(DocumentsService);
  private readonly childrenService = inject(ChildrenService);
  private readonly householdService = inject(HouseholdService);

  public readonly items = this.documentsService.wishItems;
  public readonly children = this.childrenService.children;

  public readonly showAddForm = signal<boolean>(false);
  public readonly newTitle = signal<string>('');
  public readonly newNotes = signal<string>('');
  public readonly newUrl = signal<string>('');
  public readonly newCost = signal<string>('');
  public readonly selectedChildId = signal<string>('');

  public ngOnInit(): void {
    void this.initData();
  }

  public toggleAddForm(): void {
    this.showAddForm.update((val) => !val);
  }

  public updateField(field: 'title' | 'notes' | 'url' | 'cost', event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    switch (field) {
      case 'title':
        this.newTitle.set(val);
        break;
      case 'notes':
        this.newNotes.set(val);
        break;
      case 'url':
        this.newUrl.set(val);
        break;
      case 'cost':
        this.newCost.set(val);
        break;
    }
  }

  public updateChild(event: Event): void {
    this.selectedChildId.set((event.target as HTMLSelectElement).value);
  }

  public async saveItem(): Promise<void> {
    const title = this.newTitle().trim();
    if (!title) return;
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    const cost = parseFloat(this.newCost());
    await this.documentsService.addWishItem({
      householdId: hid,
      childId: this.selectedChildId() || undefined,
      title,
      notes: this.newNotes() || undefined,
      url: this.newUrl() || undefined,
      estimatedCost: Number.isFinite(cost) ? cost : undefined,
    });

    this.newTitle.set('');
    this.newNotes.set('');
    this.newUrl.set('');
    this.newCost.set('');
    this.showAddForm.set(false);
  }

  public async toggleClaim(itemId: string): Promise<void> {
    await this.documentsService.toggleWishReserved(itemId);
  }

  public getChildName(childId: string | null): string {
    if (!childId) return 'All / Shared';
    const child = this.children().find((c) => c.id === childId);
    return child ? `${child.first_name} ${child.last_name}` : 'Child';
  }

  private async initData(): Promise<void> {
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    await Promise.all([
      this.documentsService.loadWishItems(hid),
      this.childrenService.loadChildren(hid),
    ]);
  }
}
