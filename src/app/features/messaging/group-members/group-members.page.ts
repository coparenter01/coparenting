import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessagingService } from '../../../core/messaging/messaging.service';

@Component({
  selector: 'pp-group-members-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './group-members.page.html',
  styleUrls: ['./group-members.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupMembersPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly messagingService = inject(MessagingService);

  public readonly participants = this.messagingService.participants;
  public newMemberEmail = '';
  public threadId = '';
  public readonly isAdded = signal(false);

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.threadId = id;
      void this.messagingService.loadParticipants(id);
    }
  }

  public onAddMember(): void {
    if (!this.newMemberEmail.trim()) return;
    this.isAdded.set(true);
    this.newMemberEmail = '';
    setTimeout(() => {
      this.isAdded.set(false);
    }, 2500);
  }
}
