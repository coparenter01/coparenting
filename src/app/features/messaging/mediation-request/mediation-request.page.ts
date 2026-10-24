import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { HouseholdService } from '../../../core/household/household.service';
import { MessagingService } from '../../../core/messaging/messaging.service';

@Component({
  selector: 'pp-mediation-request-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './mediation-request.page.html',
  styleUrls: ['./mediation-request.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediationRequestPage {
  private readonly messagingService = inject(MessagingService);
  private readonly authService = inject(AuthService);
  private readonly householdService = inject(HouseholdService);

  public topic = 'Parenting Schedule';
  public issueSummary = '';
  public readonly isSubmitted = signal(false);

  public async onSubmit(): Promise<void> {
    const householdId = this.householdService.currentHousehold()?.id;
    const requesterId = this.authService.user()?.id;

    if (!householdId || !requesterId || !this.issueSummary.trim()) return;

    const ok = await this.messagingService.requestMediation(
      householdId,
      requesterId,
      this.topic,
      this.issueSummary,
    );

    if (ok) {
      this.isSubmitted.set(true);
    }
  }
}
