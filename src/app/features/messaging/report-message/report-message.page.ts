import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { MessagingService } from '../../../core/messaging/messaging.service';
import type { ReportReason } from '../../../core/supabase/phase4-messages.types';

@Component({
  selector: 'pp-report-message-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './report-message.page.html',
  styleUrls: ['./report-message.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportMessagePage {
  private readonly route = inject(ActivatedRoute);
  private readonly messagingService = inject(MessagingService);
  private readonly authService = inject(AuthService);

  public reason: ReportReason = 'Harassment';
  public details = '';
  public readonly isSubmitted = signal(false);

  public async onSubmit(): Promise<void> {
    const messageId = this.route.snapshot.paramMap.get('id');
    const reporterId = this.authService.user()?.id;

    if (!messageId || !reporterId) {
      return;
    }

    const ok = await this.messagingService.reportMessage(
      messageId,
      reporterId,
      this.reason,
      this.details,
    );
    if (ok) {
      this.isSubmitted.set(true);
    }
  }
}
