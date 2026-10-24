import { DatePipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocumentsService } from '@core/documents/documents.service';
import type { ShareLinkRow } from '@core/documents/documents.types';
import { HouseholdService } from '@core/household/household.service';

@Component({
  selector: 'pp-share-links',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './share-links.page.html',
  styleUrl: './share-links.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareLinksPage implements OnInit {
  private readonly documentsService = inject(DocumentsService);
  private readonly householdService = inject(HouseholdService);

  public readonly documents = this.documentsService.documents;
  public readonly links = this.documentsService.shareLinks;

  public readonly showAddForm = signal<boolean>(false);
  public readonly selectedDocId = signal<string>('');
  public readonly durationDays = signal<number>(7);
  public readonly copyMessage = signal<string | null>(null);

  public ngOnInit(): void {
    void this.initData();
  }

  public toggleAddForm(): void {
    this.showAddForm.update((val) => !val);
  }

  public updateField(field: 'docId' | 'duration', event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (field === 'docId') {
      this.selectedDocId.set(target.value);
    } else {
      this.durationDays.set(parseInt(target.value, 10) || 7);
    }
  }

  public async saveLink(): Promise<void> {
    const docId = this.selectedDocId();
    if (!docId) return;
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    await this.documentsService.createShareLink({
      householdId: hid,
      resourceType: 'Document',
      resourceId: docId,
      durationDays: this.durationDays(),
    });

    this.showAddForm.set(false);
  }

  public async revokeLink(linkId: string): Promise<void> {
    await this.documentsService.revokeShareLink(linkId);
  }

  public copyLink(token: string): void {
    const url = `${window.location.origin}/share/${token}`;
    void navigator.clipboard.writeText(url);
    this.copyMessage.set(`Share link copied to clipboard: ${url}`);
    setTimeout(() => {
      this.copyMessage.set(null);
    }, 4000);
  }

  public getResourceTitle(resourceId: string): string {
    const doc = this.documents().find((d) => d.id === resourceId);
    return doc?.title ?? 'Shared file';
  }

  public isLinkActive(link: ShareLinkRow): boolean {
    if (link.revoked_at !== null) return false;
    return new Date(link.expires_at).getTime() > Date.now();
  }

  private async initData(): Promise<void> {
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    const docs = await this.documentsService.loadDocuments(hid);
    if (docs.length > 0 && !this.selectedDocId()) {
      this.selectedDocId.set(docs[0]?.id ?? '');
    }
  }
}
