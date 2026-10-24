import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HouseholdService } from '../../../core/household/household.service';
import { MessagingService } from '../../../core/messaging/messaging.service';
import type { MessageThreadRow } from '../../../core/messaging/messaging.types';

@Component({
  selector: 'pp-threads-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './threads-list.page.html',
  styleUrls: ['./threads-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadsListPage implements OnInit {
  private readonly messagingService = inject(MessagingService);
  private readonly householdService = inject(HouseholdService);

  public readonly threads = this.messagingService.threads;
  public readonly isLoading = this.messagingService.isLoading;
  public searchQuery = '';

  public ngOnInit(): void {
    void this.initData();
  }

  private async initData(): Promise<void> {
    const householdId = this.householdService.currentHousehold()?.id;
    if (householdId) {
      await this.messagingService.loadThreads(householdId);
    }
  }

  public get filteredThreads(): MessageThreadRow[] {
    const list = this.threads();
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      return list;
    }
    return list.filter(
      (t) => t.subject.toLowerCase().includes(query) || t.category.toLowerCase().includes(query),
    );
  }
}
