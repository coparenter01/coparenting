import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChildSupportService } from '@core/child-support/child-support.service';
import { formatCentsToUsd } from '@core/child-support/child-support.utils';

@Component({
  selector: 'pp-proof-package',
  imports: [RouterLink],
  templateUrl: './proof-package.page.html',
  styleUrls: ['./proof-package.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProofPackagePage {
  private readonly cssService = inject(ChildSupportService);

  readonly proofSubmissions = this.cssService.proofSubmissions;
  readonly latestProof = computed(() => {
    const list = this.proofSubmissions();
    return list.length > 0 ? list[0] : null;
  });

  formatAmount(cents: number | undefined): string {
    return cents !== undefined ? formatCentsToUsd(cents) : '$0.00';
  }

  formatDate(dateStr: string | undefined): string {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}
