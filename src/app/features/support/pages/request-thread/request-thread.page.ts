import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupportService } from '@core/support/support.service';
import type {
  SupportCase,
  SupportCaseMessage,
  SupportCaseStatus,
} from '@core/support/support.types';

@Component({
  selector: 'pp-request-thread',
  imports: [RouterLink, SlicePipe],
  templateUrl: './request-thread.page.html',
  styleUrls: ['./request-thread.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestThreadPage {
  private readonly support = inject(SupportService);
  private readonly route = inject(ActivatedRoute);

  readonly caseId = signal<string>('cas-003');
  readonly replyBody = signal<string>('');

  readonly currentCase = computed<SupportCase | null>(() => {
    const id = this.caseId();
    return this.support.cases().find((c) => c.caseId === id) ?? null;
  });

  readonly visibleMessages = computed<SupportCaseMessage[]>(() => {
    const id = this.caseId();
    // Parent should NOT see internal notes (internal: true)
    return this.support
      .caseMessages()
      .filter((m) => m.caseId === id && !m.internal)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  });

  constructor() {
    this.route.params.subscribe((params) => {
      const id = typeof params['id'] === 'string' ? params['id'] : '';
      if (id) {
        this.caseId.set(id);
        this.support.selectCase(id);
      }
    });
  }

  onReplyInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.replyBody.set(target.value);
  }

  onSendReply(event: Event): void {
    event.preventDefault();
    const text = this.replyBody().trim();
    if (!text) return;

    const id = this.caseId();
    const success = this.support.sendUserReply(id, text);
    if (success) {
      this.replyBody.set('');
    }
  }

  onRateSolved(answer: 'yes' | 'no'): void {
    this.support.rateCaseSolved(this.caseId(), answer);
  }

  onReopen(): void {
    const replyText = 'Reopening case for further assistance.';
    this.support.reopenCase(this.caseId(), replyText);
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
