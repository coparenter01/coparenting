import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { MessagingService } from '../../../core/messaging/messaging.service';

@Component({
  selector: 'pp-drafts-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './drafts-list.page.html',
  styleUrls: ['./drafts-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DraftsListPage implements OnInit {
  private readonly router = inject(Router);
  private readonly messagingService = inject(MessagingService);
  private readonly authService = inject(AuthService);

  public readonly drafts = this.messagingService.drafts;

  public ngOnInit(): void {
    void this.initData();
  }

  private async initData(): Promise<void> {
    const userId = this.authService.user()?.id;
    if (userId) {
      await this.messagingService.loadDrafts(userId);
    }
  }

  public onResumeDraft(draft: { subject: string | null; body: string }): void {
    void this.router.navigate(['/messages/new'], {
      queryParams: { subject: draft.subject, body: draft.body },
    });
  }

  public async onDeleteDraft(draftId: string): Promise<void> {
    const userId = this.authService.user()?.id;
    if (userId) {
      await this.messagingService.deleteDraft(draftId, userId);
    }
  }
}
