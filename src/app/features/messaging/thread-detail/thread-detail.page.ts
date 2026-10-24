import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  type OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { HouseholdService } from '../../../core/household/household.service';
import { MessagingService } from '../../../core/messaging/messaging.service';
import { generateThreadExportText } from '../../../core/messaging/messaging.utils';
import type { MessageRow } from '../../../core/messaging/messaging.types';

@Component({
  selector: 'pp-thread-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './thread-detail.page.html',
  styleUrls: ['./thread-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly messagingService = inject(MessagingService);
  private readonly authService = inject(AuthService);
  private readonly householdService = inject(HouseholdService);

  public readonly messages = this.messagingService.activeMessages;
  public readonly isLoading = this.messagingService.isLoading;
  public readonly currentUserId = computed(() => this.authService.user()?.id);

  public threadId = '';
  public replyBody = '';
  public isUrgent = false;
  public readonly isExportModalOpen = signal(false);
  public readonly exportText = signal('');

  public ngOnInit(): void {
    void this.initData();
  }

  private async initData(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.threadId = id;
      await this.messagingService.loadMessages(id);
      await this.messagingService.loadParticipants(id);
    }
  }

  public async onSendReply(): Promise<void> {
    const text = this.replyBody.trim();
    const userId = this.currentUserId();
    const householdId = this.householdService.currentHousehold()?.id;

    if (!text || !userId || !householdId || !this.threadId) {
      return;
    }

    const res = await this.messagingService.sendMessage(
      {
        threadId: this.threadId,
        householdId,
        body: text,
        isUrgent: this.isUrgent,
      },
      userId,
    );

    if (res.success) {
      this.replyBody = '';
      this.isUrgent = false;
    }
  }

  public async onUnhide(msg: MessageRow): Promise<void> {
    await this.messagingService.unhideHeldMessage(msg.id, this.threadId);
  }

  public onReport(messageId: string): void {
    void this.router.navigate(['/messages/report', messageId]);
  }

  public openExportModal(): void {
    const msgs = this.messages().map((m) => ({
      sender: m.sender_id === this.currentUserId() ? 'You' : 'Co-Parent',
      time: m.sent_at,
      body: m.held_by_shield && !m.shield_unhidden_at ? '[Message Held by Shield]' : m.body,
    }));
    this.exportText.set(generateThreadExportText('Thread Export', msgs));
    this.isExportModalOpen.set(true);
  }

  public closeExportModal(): void {
    this.isExportModalOpen.set(false);
  }
}
