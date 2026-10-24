import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HouseholdService } from '../../../core/household/household.service';
import { MessagingService } from '../../../core/messaging/messaging.service';
import type { MessageRow } from '../../../core/messaging/messaging.types';

@Component({
  selector: 'pp-search-messages-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './search-messages.page.html',
  styleUrls: ['./search-messages.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchMessagesPage implements OnInit {
  private readonly messagingService = inject(MessagingService);
  private readonly householdService = inject(HouseholdService);

  public keyword = '';
  public category = 'All';
  public readonly searchResults = signal<MessageRow[]>([]);
  public readonly hasSearched = signal(false);

  public ngOnInit(): void {
    const householdId = this.householdService.currentHousehold()?.id;
    if (householdId) {
      void this.messagingService.loadThreads(householdId);
    }
  }

  public onSearch(): void {
    const q = this.keyword.trim().toLowerCase();
    this.hasSearched.set(true);

    if (!q) {
      this.searchResults.set([]);
      return;
    }

    const matches = this.messagingService
      .activeMessages()
      .filter((m) => m.body.toLowerCase().includes(q));

    this.searchResults.set(matches);
  }
}
