import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CallingService } from '../../../core/calling/calling.service';

@Component({
  selector: 'pp-recording-request-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recording-request.page.html',
  styleUrls: ['./recording-request.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordingRequestPage {
  private readonly router = inject(Router);
  private readonly callingService = inject(CallingService);

  public readonly activeCall = this.callingService.activeCall;
  public requestedAtTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  public onDecline(): void {
    const active = this.activeCall();
    if (active) {
      this.callingService.setSimulatedActiveCall({
        ...active,
        recordingPendingConsent: false,
        isRecording: false,
      });
    }
    void this.router.navigate(['/calls/active']);
  }

  public onAgree(): void {
    const active = this.activeCall();
    if (active) {
      this.callingService.setSimulatedActiveCall({
        ...active,
        recordingPendingConsent: false,
        isRecording: true,
      });
    }
    void this.router.navigate(['/calls/active']);
  }
}
