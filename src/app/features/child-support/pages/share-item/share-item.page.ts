import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChildSupportService } from '@core/child-support/child-support.service';
import type { SharedItemType } from '@core/supabase/database.types';

@Component({
  selector: 'pp-share-item',
  imports: [RouterLink],
  templateUrl: './share-item.page.html',
  styleUrls: ['./share-item.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareItemPage {
  private readonly cssService = inject(ChildSupportService);
  private readonly router = inject(Router);

  readonly selectedType = signal<SharedItemType>('hearing');
  readonly itemTitle = signal<string>('Annual Support Review (Nov 12, 2026)');
  readonly recipient = signal<string>('Alex Smith (Co-parent)');
  readonly note = signal<string>('');
  readonly isSharing = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  onTypeChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value as SharedItemType;
    this.selectedType.set(val);
    if (val === 'hearing') {
      this.itemTitle.set('Annual Support Review (Nov 12, 2026)');
    } else if (val === 'payment_receipt') {
      this.itemTitle.set('Disbursement Notice ($350.00)');
    } else {
      this.itemTitle.set('Official Order Summary');
    }
  }

  onTitleChange(event: Event): void {
    this.itemTitle.set((event.target as HTMLInputElement).value);
  }

  onNoteChange(event: Event): void {
    this.note.set((event.target as HTMLTextAreaElement).value);
  }

  async onShare(): Promise<void> {
    if (!this.itemTitle()) {
      this.errorMessage.set('Please provide a title for the shared item.');
      return;
    }

    this.isSharing.set(true);
    try {
      await this.cssService.shareItem(
        this.selectedType(),
        `item-${String(Date.now())}`,
        this.itemTitle(),
        { note: this.note(), sharedWith: this.recipient() },
      );
      await this.router.navigate(['/child-support/shared-items']);
    } catch {
      this.errorMessage.set('Failed to share item with co-parent.');
    } finally {
      this.isSharing.set(false);
    }
  }
}
