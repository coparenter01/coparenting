import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { CallingService } from '../../../core/calling/calling.service';
import { HouseholdService } from '../../../core/household/household.service';

@Component({
  selector: 'pp-calling-settings-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './calling-settings.page.html',
  styleUrls: ['./calling-settings.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallingSettingsPage implements OnInit {
  private readonly callingService = inject(CallingService);
  private readonly authService = inject(AuthService);
  private readonly householdService = inject(HouseholdService);

  public audioEnabled = false;
  public videoEnabled = false;
  public recordingEnabled = false;
  public transcriptsEnabled = false;
  public stateResidence = '';
  public selectedMicrophone = 'default';
  public selectedSpeaker = 'default';
  public selectedCamera = 'default';
  public readonly isSaved = signal(false);

  public ngOnInit(): void {
    void this.initData();
  }

  private async initData(): Promise<void> {
    const userId = this.authService.user()?.id;
    if (userId) {
      await this.callingService.loadSettings(userId);
      const s = this.callingService.settings();
      if (s) {
        this.audioEnabled = s.audio_enabled;
        this.videoEnabled = s.video_enabled;
        this.recordingEnabled = s.recording_enabled;
        this.transcriptsEnabled = s.transcripts_enabled;
        this.stateResidence = s.state_residence ?? '';
        this.selectedMicrophone = s.microphone_id ?? 'default';
        this.selectedSpeaker = s.speaker_id ?? 'default';
        this.selectedCamera = s.camera_id ?? 'default';
      }
    }
  }

  public async onSave(): Promise<void> {
    const userId = this.authService.user()?.id;
    const householdId = this.householdService.currentHousehold()?.id;
    if (!userId || !householdId) {
      return;
    }

    const ok = await this.callingService.updateSettings(userId, householdId, {
      audioEnabled: this.audioEnabled,
      videoEnabled: this.videoEnabled,
      recordingEnabled: this.recordingEnabled,
      transcriptsEnabled: this.transcriptsEnabled,
      stateResidence: this.stateResidence,
      microphoneId: this.selectedMicrophone,
      speakerId: this.selectedSpeaker,
      cameraId: this.selectedCamera,
    });

    if (ok) {
      this.isSaved.set(true);
      setTimeout(() => {
        this.isSaved.set(false);
      }, 2500);
    }
  }
}
