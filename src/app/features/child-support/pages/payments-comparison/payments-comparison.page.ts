import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChildSupportService } from '@core/child-support/child-support.service';
import { formatCentsToUsd } from '@core/child-support/child-support.utils';

@Component({
  selector: 'pp-payments-comparison',
  imports: [RouterLink],
  templateUrl: './payments-comparison.page.html',
  styleUrls: ['./payments-comparison.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsComparisonPage {
  private readonly cssService = inject(ChildSupportService);

  readonly paymentMatches = this.cssService.paymentMatches;
  readonly dismissingMatchId = signal<string | null>(null);
  readonly dismissReason = signal<string>('');
  readonly exportSuccess = signal<boolean>(false);

  formatAmount(cents: number | null): string {
    if (cents === null) return '—';
    return formatCentsToUsd(cents);
  }

  getBadgeClass(status: string, dismissed: boolean): string {
    if (dismissed) return 'badge-dismissed';
    switch (status) {
      case 'matched':
        return 'badge-matched';
      case 'not_on_agency':
        return 'badge-warning';
      case 'amounts_differ':
      case 'not_recorded':
        return 'badge-danger';
      default:
        return 'badge-neutral';
    }
  }

  getBadgeLabel(status: string, dismissed: boolean): string {
    if (dismissed) return 'Dismissed';
    switch (status) {
      case 'matched':
        return 'Matched';
      case 'not_on_agency':
        return 'Not on agency record';
      case 'amounts_differ':
        return 'Amounts differ';
      case 'not_recorded':
        return 'Agency payment not recorded';
      default:
        return status;
    }
  }

  openDismissModal(matchId: string): void {
    this.dismissingMatchId.set(matchId);
    this.dismissReason.set('');
  }

  closeDismissModal(): void {
    this.dismissingMatchId.set(null);
  }

  onReasonChange(event: Event): void {
    this.dismissReason.set((event.target as HTMLInputElement).value);
  }

  confirmDismiss(): void {
    const id = this.dismissingMatchId();
    if (id) {
      this.cssService.dismissMatchFlag(id, this.dismissReason() || 'Reconciled by parent note');
    }
    this.closeDismissModal();
  }

  exportComparison(): void {
    this.exportSuccess.set(true);
    setTimeout(() => {
      this.exportSuccess.set(false);
    }, 3000);
  }
}
