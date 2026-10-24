import { DatePipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ChildrenService } from '@core/children/children.service';
import { DocumentsService } from '@core/documents/documents.service';
import type { DocumentRow } from '@core/documents/documents.types';
import { HouseholdService } from '@core/household/household.service';

@Component({
  selector: 'pp-document-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './document-detail.page.html',
  styleUrl: './document-detail.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly documentsService = inject(DocumentsService);
  private readonly childrenService = inject(ChildrenService);
  private readonly householdService = inject(HouseholdService);

  public readonly documents = this.documentsService.documents;
  public readonly children = this.childrenService.children;

  public readonly docId = computed(() => this.route.snapshot.paramMap.get('id'));
  public readonly document = computed(() => {
    const id = this.docId();
    return this.documents().find((d) => d.id === id) ?? this.documents()[0] ?? null;
  });

  public ngOnInit(): void {
    void this.initData();
  }

  private async initData(): Promise<void> {
    const hid = this.householdService.currentHousehold()?.id ?? 'demo-household-01';
    await this.childrenService.loadChildren(hid);
    await this.documentsService.loadDocuments(hid);
  }

  public getChildName(childId: string | null): string {
    if (!childId) return 'General';
    const c = this.children().find((item) => item.id === childId);
    return c ? `${c.first_name} ${c.last_name}`.trim() : 'Child';
  }

  public formatBytes(bytes: number): string {
    if (bytes < 1024) return `${String(bytes)} B`;
    if (bytes < 1024 * 1024) return `${String(Math.round(bytes / 1024))} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  public downloadFile(doc: DocumentRow): void {
    const fakeContent = `ParentPath Document: ${doc.title}\nCategory: ${doc.category}\nFile: ${doc.file_name}`;
    const blob = new Blob([fakeContent], { type: doc.mime_type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.file_name;
    a.click();
    URL.revokeObjectURL(url);
  }

  public async deleteDoc(docId: string): Promise<void> {
    const confirmed = window.confirm(
      'Move this document to Recently Deleted? It will be held for 30 days before permanent deletion.',
    );
    if (!confirmed) return;
    await this.documentsService.deleteDocument(docId);
    await this.router.navigate(['/documents']);
  }
}
