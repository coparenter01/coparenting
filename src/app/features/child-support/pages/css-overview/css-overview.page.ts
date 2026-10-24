import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChildSupportService } from '@core/child-support/child-support.service';
import { formatCentsToUsd } from '@core/child-support/child-support.utils';

@Component({
  selector: 'pp-css-overview',
  imports: [RouterLink],
  templateUrl: './css-overview.page.html',
  styleUrls: ['./css-overview.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CssOverviewPage {
  private readonly cssService = inject(ChildSupportService);

  readonly currentCase = this.cssService.currentCase;
  readonly isLinked = this.cssService.isLinked;
  readonly isOutOfDate = this.cssService.isOutOfDate;
  readonly isSyncing = this.cssService.isSyncing;
  readonly unmatchedCount = this.cssService.unmatchedCount;
  readonly upcomingHearings = this.cssService.upcomingHearings;

  readonly monthlyOrderFormatted = computed(() => {
    const c = this.currentCase();
    return c ? formatCentsToUsd(c.monthlyOrderCents) : '$0.00';
  });

  readonly balanceOwedFormatted = computed(() => {
    const c = this.currentCase();
    return c ? formatCentsToUsd(c.balanceOwedCents) : '$0.00';
  });

  readonly arrearsFormatted = computed(() => {
    const c = this.currentCase();
    return c ? formatCentsToUsd(c.arrearsBalanceCents) : '$0.00';
  });

  readonly lastPaymentFormatted = computed(() => {
    const c = this.currentCase();
    if (!c || c.lastPaymentAmountCents === 0) return 'None recorded';
    return `${formatCentsToUsd(c.lastPaymentAmountCents)} on ${c.lastPaymentDate ?? 'N/A'}`;
  });

  readonly lastSyncedFormatted = computed(() => {
    const c = this.currentCase();
    if (!c) return 'Never';
    return new Date(c.lastSyncedAt).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  });

  async triggerSync(): Promise<void> {
    await this.cssService.triggerSync();
  }
}
