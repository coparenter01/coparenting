import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';
import type { ReimbursementRequestModel } from '@core/expenses/expenses.types';
import { formatCurrency } from '@core/expenses/expenses.utils';

@Component({
  selector: 'pp-reimbursement-list',
  imports: [RouterLink],
  templateUrl: './reimbursement-list.page.html',
  styleUrl: './reimbursement-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReimbursementListPage {
  private readonly expensesService = inject(ExpensesService);

  readonly selectedTab = signal<string>('All');
  readonly allRequests = this.expensesService.reimbursementRequests;

  readonly filteredRequests = computed<ReimbursementRequestModel[]>(() => {
    const tab = this.selectedTab();
    if (tab === 'All') return this.allRequests();
    return this.allRequests().filter((r) => r.status === tab);
  });

  readonly totalOwedToYouFormatted = computed<string>(() => {
    const totalCents = this.allRequests()
      .filter((r) => r.requestedBy === 'user-1' && r.status === 'Accepted')
      .reduce((sum, r) => sum + r.amountCents, 0);
    return formatCurrency(totalCents);
  });

  readonly totalYouOweFormatted = computed<string>(() => {
    const totalCents = this.allRequests()
      .filter((r) => r.requestedFrom === 'user-1' && r.status === 'Accepted')
      .reduce((sum, r) => sum + r.amountCents, 0);
    return formatCurrency(totalCents);
  });

  formatCents(cents: number): string {
    return formatCurrency(cents);
  }

  setTab(tab: string): void {
    this.selectedTab.set(tab);
  }
}
