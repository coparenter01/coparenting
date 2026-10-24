import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, type OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MessagingService } from '../../../core/messaging/messaging.service';
import type { MessageRow } from '../../../core/messaging/messaging.types';

@Component({
  selector: 'pp-held-message-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './held-message.page.html',
  styleUrls: ['./held-message.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeldMessagePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly messagingService = inject(MessagingService);

  public readonly targetMessage = signal<MessageRow | null>(null);
  public readonly isRevealed = signal(false);

  public ngOnInit(): void {
    const messageId = this.route.snapshot.paramMap.get('id');
    if (messageId) {
      const match = this.messagingService.activeMessages().find((m) => m.id === messageId);
      if (match) {
        this.targetMessage.set(match);
      }
    }
  }

  public onReveal(): void {
    this.isRevealed.set(true);
    const msg = this.targetMessage();
    if (msg) {
      void this.messagingService.unhideHeldMessage(msg.id, msg.thread_id);
    }
  }
}
