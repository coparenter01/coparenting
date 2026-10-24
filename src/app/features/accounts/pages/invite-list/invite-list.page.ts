import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HouseholdService } from '../../../../core/household/household.service';
import type { InviteRow } from '../../../../core/household/household.types';

@Component({
  selector: 'pp-invite-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './invite-list.page.html',
  styleUrl: './invite-list.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteListPage {
  private readonly householdService = inject(HouseholdService);

  public readonly invites = this.householdService.invites;
  public readonly activeInvite = this.householdService.activeInvite;

  public readonly hasInvites = computed(() => {
    return this.invites().length > 0;
  });

  public async cancelInvite(inviteId: string): Promise<void> {
    await this.householdService.cancelInvite(inviteId);
  }

  public async copyInviteLink(token: string): Promise<void> {
    if (typeof window !== 'undefined') {
      const link = `${window.location.origin}/accounts/accept-invite?token=${token}`;
      await navigator.clipboard.writeText(link);
    }
  }

  public getTargetDisplay(invite: InviteRow): string {
    if (invite.channel === 'Email') return invite.target_email ?? '—';
    if (invite.channel === 'Text') return invite.target_phone ?? '—';
    return 'Shareable link';
  }
}
