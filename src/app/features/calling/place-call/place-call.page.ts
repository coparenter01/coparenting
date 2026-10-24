import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { CallingService } from '../../../core/calling/calling.service';
import type { CallType } from '../../../core/calling/calling.types';
import { HouseholdService } from '../../../core/household/household.service';

@Component({
  selector: 'pp-place-call-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './place-call.page.html',
  styleUrls: ['./place-call.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceCallPage implements OnInit {
  private readonly router = inject(Router);
  private readonly callingService = inject(CallingService);
  private readonly authService = inject(AuthService);
  private readonly householdService = inject(HouseholdService);

  public recipientName = 'Co-parent';
  public callType: CallType = 'audio';
  public askToRecord = false;
  public errorMessage: string | null = null;

  public ngOnInit(): void {
    const household = this.householdService.currentHousehold();
    if (household?.mode === 'Solo') {
      this.errorMessage =
        'In Solo Mode, in-app calling is disabled because no co-parent is linked.';
    }
  }

  public async onStartCall(): Promise<void> {
    this.errorMessage = null;
    const userId = this.authService.user()?.id;
    const householdId = this.householdService.currentHousehold()?.id;

    if (!userId || !householdId) {
      this.errorMessage = 'Unable to initiate call. Missing session details.';
      return;
    }

    const res = await this.callingService.placeCall(
      {
        householdId,
        calleeId: 'coparent-simulated-id',
        callType: this.callType,
        requestRecording: this.askToRecord,
      },
      userId,
    );

    if (res.success) {
      void this.router.navigate(['/calls/active']);
    } else {
      this.errorMessage = res.error ?? 'Calling is not available at this time.';
    }
  }
}
