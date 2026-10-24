import { DatePipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DocumentsService } from '@core/documents/documents.service';

@Component({
  selector: 'pp-public-share',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './public-share.page.html',
  styleUrl: './public-share.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicSharePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly documentsService = inject(DocumentsService);

  public readonly isAvailable = signal<boolean>(true);
  public readonly fileName = signal<string>('Immunization_Records_2026.pdf');
  public readonly uploaderName = signal<string>('Jordan Vance');
  public readonly expiresAt = signal<string>(new Date(Date.now() + 86400000 * 3).toISOString());
  public readonly fileType = signal<string>('application/pdf');
  public readonly fileSize = signal<number>(245000);
  public readonly downloadMessage = signal<string | null>(null);

  public ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.resolveShareToken(token);
    }
  }

  public triggerDownload(): void {
    this.downloadMessage.set(
      `Downloading ${this.fileName()}... Check your browser downloads folder.`,
    );
    setTimeout(() => {
      this.downloadMessage.set(null);
    }, 5000);
  }

  public formatBytes(bytes: number): string {
    if (bytes < 1024) return `${String(bytes)} B`;
    if (bytes < 1024 * 1024) return `${String(Math.round(bytes / 1024))} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private resolveShareToken(token: string): void {
    const links = this.documentsService.shareLinks();
    const match = links.find((l) => l.token === token);
    if (!match) return;

    if (match.revoked_at || new Date(match.expires_at).getTime() <= Date.now()) {
      this.isAvailable.set(false);
      return;
    }

    const doc = this.documentsService.documents().find((d) => d.id === match.resource_id);
    if (doc) {
      this.fileName.set(doc.title);
      this.fileType.set(doc.mime_type);
      this.fileSize.set(doc.file_size_bytes);
    }
    this.expiresAt.set(match.expires_at);
  }
}
