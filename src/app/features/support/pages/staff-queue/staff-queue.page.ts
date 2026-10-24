import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupportService } from '@core/support/support.service';
import type { SupportCase, SupportCaseStatus, SupportCategory } from '@core/support/support.types';
import { SUPPORT_CATEGORIES } from '@core/support/support.utils';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CategoryOption = {
  id: SupportCategory;
  label: string;
};

@Component({
  selector: 'pp-staff-queue',
  imports: [RouterLink],
  templateUrl: './staff-queue.page.html',
  styleUrls: ['./staff-queue.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffQueuePage {
  private readonly support = inject(SupportService);

  readonly staffName = 'Taylor Lead';
  readonly staffRole = 'Support Lead';

  readonly filterStatus = signal<string>('all_open');
  readonly filterCategory = signal<string>('');
  readonly filterPriority = signal<string>('');
  readonly filterAssignee = signal<string>('anyone');

  readonly categories: CategoryOption[] = (
    Object.keys(SUPPORT_CATEGORIES) as SupportCategory[]
  ).map((key) => ({
    id: key,
    label: SUPPORT_CATEGORIES[key],
  }));

  readonly queuedCases = computed<SupportCase[]>(() => {
    return this.support
      .cases()
      .filter((c) => this.matchesFilter(c))
      .sort((a, b) => {
        // Priority first, then oldest first (FR-SUP-02-02)
        if (a.priority === 'priority' && b.priority !== 'priority') return -1;
        if (a.priority !== 'priority' && b.priority === 'priority') return 1;
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
  });

  private matchesFilter(c: SupportCase): boolean {
    if (!this.matchesStatus(c.status)) return false;
    if (this.filterCategory() && c.category !== this.filterCategory()) return false;
    if (this.filterPriority() && c.priority !== this.filterPriority()) return false;
    return this.matchesAssignee(c);
  }

  private matchesStatus(status: SupportCaseStatus): boolean {
    const filter = this.filterStatus();
    if (filter === 'all_open') {
      return status !== 'resolved' && status !== 'closed';
    }
    return !filter || status === filter;
  }

  private matchesAssignee(c: SupportCase): boolean {
    const filter = this.filterAssignee();
    if (filter === 'me') return c.assignedStaffName === this.staffName;
    if (filter === 'unassigned') return !c.assignedToUserId;
    return true;
  }

  onStatusFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filterStatus.set(target.value);
  }

  onCategoryFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filterCategory.set(target.value);
  }

  onPriorityFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filterPriority.set(target.value);
  }

  onAssigneeFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filterAssignee.set(target.value);
  }

  onAssignToMe(caseId: string): void {
    this.support.assignCase({
      caseId,
      staffId: 'staff-002',
      staffName: this.staffName,
    });
  }

  getCategoryLabel(category: SupportCategory): string {
    return SUPPORT_CATEGORIES[category];
  }

  calculateTimeLeft(targetAt: string): string {
    const diffMs = new Date(targetAt).getTime() - Date.now();
    if (diffMs <= 0) return 'Overdue';
    const hours = Math.floor(diffMs / 3600000);
    const mins = Math.floor((diffMs % 3600000) / 60000);
    return `${String(hours)}h ${String(mins)}m`;
  }
}
