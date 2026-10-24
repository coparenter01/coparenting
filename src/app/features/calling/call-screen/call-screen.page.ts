import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnDestroy,
  type OnInit,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { CallingService } from '../../../core/calling/calling.service';

@Component({
  selector: 'pp-call-screen-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './call-screen.page.html',
  styleUrls: ['./call-screen.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallScreenPage implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly callingService = inject(CallingService);
  private readonly authService = inject(AuthService);

  public readonly activeCall = this.callingService.activeCall;
  public remoteName = 'Co-parent';
  public elapsedSeconds = 124; // Default simulated starting elapsed
  private timerRef: ReturnType<typeof setInterval> | null = null;

  public ngOnInit(): void {
    const active = this.activeCall();
    if (active) {
      this.remoteName = active.remoteName;
      this.elapsedSeconds = active.elapsedSeconds || 1;
    }

    this.timerRef = setInterval(() => {
      this.elapsedSeconds++;
    }, 1000);
  }

  public ngOnDestroy(): void {
    if (this.timerRef) {
      clearInterval(this.timerRef);
      this.timerRef = null;
    }
  }

  public get formattedTime(): string {
    const mins = Math.floor(this.elapsedSeconds / 60);
    const secs = this.elapsedSeconds % 60;
    const mm = mins < 10 ? '0' + String(mins) : String(mins);
    const ss = secs < 10 ? '0' + String(secs) : String(secs);
    return '00:' + mm + ':' + ss;
  }

  public onToggleMute(): void {
    this.callingService.toggleMute();
  }

  public onToggleCamera(): void {
    this.callingService.toggleCamera();
  }

  public onToggleSpeaker(): void {
    this.callingService.toggleSpeaker();
  }

  public async onEndCall(): Promise<void> {
    const userId = this.authService.user()?.id;
    if (userId) {
      await this.callingService.endCall(userId);
    }
    void this.router.navigate(['/calls']);
  }
}
