import { DatePipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocumentsService } from '@core/documents/documents.service';
import { HouseholdService } from '@core/household/household.service';

@Component({
  selector: 'pp-recently-deleted',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './recently-deleted.page.html',
  styleUrl: './recently-deleted.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyDeletedPage implements OnInit {
  private readonly documentsService = inject(DocumentsService);
  private readonly householdService = inject(HouseholdService);

  public readonly recentlyDeleted = this.documentsService.recentlyDeleted;

  public ngOnInit(): void {
    void this.initData();
  }

  public async restoreDoc(docId: string): Promise<void> {
    await this.documentsService.restoreDocument(docId);
  }

  public formatBytes(bytes: number): string {
    if (bytes < 1024) return `${String(bytes)} B`;
    if (bytes < 1024 * 1024) return `${String(Math.round(bytes / 1024))} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private async initData(): Promise<void> {
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    await this.documentsService.loadDocuments(hid);
  }
}
