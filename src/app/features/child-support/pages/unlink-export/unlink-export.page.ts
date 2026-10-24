import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChildSupportService } from '@core/child-support/child-support.service';

@Component({
  selector: 'pp-unlink-export',
  imports: [RouterLink],
  templateUrl: './unlink-export.page.html',
  styleUrls: ['./unlink-export.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnlinkExportPage {
  private readonly cssService = inject(ChildSupportService);
  private readonly router = inject(Router);

  readonly currentCase = this.cssService.currentCase;
  readonly isExporting = signal<boolean>(false);
  readonly exportDone = signal<boolean>(false);
  readonly showConfirmModal = signal<boolean>(false);
  readonly isUnlinking = signal<boolean>(false);

  downloadArchive(): void {
    this.isExporting.set(true);
    setTimeout(() => {
      this.isExporting.set(false);
      this.exportDone.set(true);
    }, 600);
  }

  promptUnlink(): void {
    this.showConfirmModal.set(true);
  }

  cancelUnlink(): void {
    this.showConfirmModal.set(false);
  }

  async confirmUnlink(): Promise<void> {
    this.isUnlinking.set(true);
    try {
      await this.cssService.unlinkCase();
      await this.router.navigate(['/child-support']);
    } finally {
      this.isUnlinking.set(false);
    }
  }
}
