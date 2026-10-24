import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, type OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MessagingService } from '../../../core/messaging/messaging.service';
import type { MessageRow } from '../../../core/messaging/messaging.types';

@Component({
  selector: 'pp-message-status-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './message-status.page.html',
  styleUrls: ['./message-status.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageStatusPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly messagingService = inject(MessagingService);

  public readonly message = signal<MessageRow | null>(null);

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const match = this.messagingService.activeMessages().find((m) => m.id === id);
      if (match) {
        this.message.set(match);
      }
    }
  }
}
