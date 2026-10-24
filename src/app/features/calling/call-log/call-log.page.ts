import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CallingService } from '../../../core/calling/calling.service';
import type { CallTranscriptRow } from '../../../core/calling/calling.types';
import { HouseholdService } from '../../../core/household/household.service';

@Component({
  selector: 'pp-call-log-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './call-log.page.html',
  styleUrls: ['./call-log.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallLogPage implements OnInit {
  private readonly callingService = inject(CallingService);
  private readonly householdService = inject(HouseholdService);

  public readonly calls = this.callingService.calls;
  public readonly recordings = this.callingService.recordings;
  public readonly transcripts = this.callingService.transcripts;

  public activeTab: 'all' | 'recordings' | 'transcripts' = 'all';
  public activeModal: 'player' | 'transcript' | null = null;
  public selectedTranscript: CallTranscriptRow | null = null;

  public ngOnInit(): void {
    const householdId = this.householdService.currentHousehold()?.id;
    if (householdId) {
      void this.callingService.loadCalls(householdId);
      void this.callingService.loadRecordings(householdId);
      void this.callingService.loadTranscripts(householdId);
    }
  }

  public formatDuration(seconds: number): string {
    if (!seconds || seconds <= 0) {
      return '—';
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const mm = mins < 10 ? '0' + String(mins) : String(mins);
    const ss = secs < 10 ? '0' + String(secs) : String(secs);
    return mm + ':' + ss;
  }

  public openPlayer(callId?: string): void {
    if (callId) {
      // player target
    }
    this.activeModal = 'player';
  }

  public openTranscript(t: CallTranscriptRow): void {
    this.selectedTranscript = t;
    this.activeModal = 'transcript';
  }
}
