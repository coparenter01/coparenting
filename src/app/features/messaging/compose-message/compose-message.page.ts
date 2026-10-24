import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { HouseholdService } from '../../../core/household/household.service';
import { MessagingService } from '../../../core/messaging/messaging.service';
import type { MessageThreadRow, ToneFeedback } from '../../../core/messaging/messaging.types';

@Component({
  selector: 'pp-compose-message-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './compose-message.page.html',
  styleUrls: ['./compose-message.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposeMessagePage {
  private readonly router = inject(Router);
  private readonly messagingService = inject(MessagingService);
  private readonly authService = inject(AuthService);
  private readonly householdService = inject(HouseholdService);

  public subject = '';
  public category: MessageThreadRow['category'] = 'General';
  public body = '';
  public isUrgent = false;

  public readonly toneFeedback = signal<ToneFeedback | null>(null);
  public readonly isSubmitting = signal(false);

  public onCheckTone(): void {
    if (!this.body.trim()) return;
    const fb = this.messagingService.checkDraftTone(this.body);
    this.toneFeedback.set(fb);
  }

  public onApplyRewrite(suggested: string): void {
    this.body = suggested;
    this.onCheckTone();
  }

  public async onSaveDraft(): Promise<void> {
    const userId = this.authService.user()?.id;
    if (!userId || !this.body.trim()) return;
    const ok = await this.messagingService.saveDraft(userId, this.body, this.subject);
    if (ok) {
      void this.router.navigate(['/messages/drafts']);
    }
  }

  public async onSend(): Promise<void> {
    const userId = this.authService.user()?.id;
    const householdId = this.householdService.currentHousehold()?.id;

    if (!userId || !householdId || !this.body.trim()) return;

    this.isSubmitting.set(true);
    const res = await this.messagingService.sendMessage(
      {
        householdId,
        subject: this.subject || 'New Discussion',
        category: this.category,
        body: this.body,
        isUrgent: this.isUrgent,
      },
      userId,
    );
    this.isSubmitting.set(false);

    if (res.success && res.threadId) {
      void this.router.navigate(['/messages', res.threadId]);
    }
  }
}
