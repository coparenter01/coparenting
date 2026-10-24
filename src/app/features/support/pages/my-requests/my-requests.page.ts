import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupportService } from '@core/support/support.service';
import type { SupportCase, SupportCaseStatus, SupportCategory } from '@core/support/support.types';
import { SUPPORT_CATEGORIES } from '@core/support/support.utils';

@Component({
  selector: 'pp-my-requests',
  imports: [RouterLink, SlicePipe],
  templateUrl: './my-requests.page.html',
  styleUrls: ['./my-requests.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyRequestsPage {
  private readonly support = inject(SupportService);

  readonly selectedStatus = signal<string>('');

  readonly filteredCases = computed<SupportCase[]>(() => {
    const status = this.selectedStatus();
    const cases = this.support.userCases();
    if (!status) return cases;
    return cases.filter((c) => c.status === status);
  });

  onStatusChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedStatus.set(target.value);
  }

  getCategoryLabel(category: SupportCategory): string {
    return SUPPORT_CATEGORIES[category];
  }

  formatStatus(status: SupportCaseStatus): string {
    switch (status) {
      case 'new':
        return 'New';
      case 'in_progress':
        return 'In progress';
      case 'waiting_for_you':
        return 'Awaiting user';
      case 'resolved':
        return 'Resolved';
      case 'closed':
        return 'Closed';
      default:
        return status;
    }
  }
}
