import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HouseholdService } from '../../../../core/household/household.service';

@Component({
  selector: 'pp-system-send-status',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './system-send-status.page.html',
  styleUrl: './system-send-status.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemSendStatusPage {
  private readonly householdService = inject(HouseholdService);

  public readonly contactAttempts = this.householdService.contactAttempts;

  public readonly latestAttempt = computed(() => {
    const list = this.contactAttempts();
    return list[0] ?? null;
  });

  public readonly sendType = computed(() => {
    const latest = this.latestAttempt();
    if (latest?.purpose.toLowerCase().includes('invite')) return 'Invite';
    if (latest?.purpose.toLowerCase().includes('outside')) return 'Outside message';
    return 'Verification code';
  });

  public readonly maskedRecipient = computed(() => {
    const contact = this.latestAttempt()?.recipientContact ?? 'coparent@example.com';
    if (contact.includes('@')) {
      const [local, domain] = contact.split('@');
      const maskedLocal = (local?.substring(0, 1) ?? '') + '••••••';
      return `${maskedLocal}@${domain ?? 'example.com'}`;
    }
    return '(•••) •••-' + contact.slice(-4);
  });
}
