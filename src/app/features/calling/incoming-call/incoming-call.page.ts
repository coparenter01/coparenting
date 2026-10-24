import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { CallingService } from '../../../core/calling/calling.service';

@Component({
  selector: 'pp-incoming-call-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incoming-call.page.html',
  styleUrls: ['./incoming-call.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomingCallPage {
  private readonly router = inject(Router);
  private readonly callingService = inject(CallingService);
  private readonly authService = inject(AuthService);

  public readonly incomingCall = this.callingService.incomingCall;

  public async onAnswer(): Promise<void> {
    const call = this.incomingCall();
    const userId = this.authService.user()?.id;
    if (call && userId) {
      await this.callingService.answerCall(call.id, userId);
      void this.router.navigate(['/calls/active']);
    } else {
      void this.router.navigate(['/calls/active']);
    }
  }

  public async onDecline(): Promise<void> {
    const call = this.incomingCall();
    const userId = this.authService.user()?.id;
    if (call && userId) {
      await this.callingService.declineCall(call.id, userId);
    }
    void this.router.navigate(['/calls']);
  }
}
