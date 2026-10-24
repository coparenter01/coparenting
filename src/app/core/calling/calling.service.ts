import { Injectable, signal } from '@angular/core';
import { injectSupabaseClient } from '../supabase/supabase-client';
import type {
  ActiveCallState,
  CallConsentLogRow,
  CallRecordingRow,
  CallRow,
  CallSettingsRow,
  CallTranscriptRow,
  InitiateCallPayload,
  UpdateCallSettingsPayload,
} from './calling.types';

@Injectable({
  providedIn: 'root',
})
export class CallingService {
  private readonly supabase = injectSupabaseClient();

  private readonly _settings = signal<CallSettingsRow | null>(null);
  private readonly _activeCall = signal<ActiveCallState | null>(null);
  private readonly _incomingCall = signal<CallRow | null>(null);
  private readonly _calls = signal<CallRow[]>([]);
  private readonly _recordings = signal<CallRecordingRow[]>([]);
  private readonly _transcripts = signal<CallTranscriptRow[]>([]);
  private readonly _consentLogs = signal<CallConsentLogRow[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);

  public readonly settings = this._settings.asReadonly();
  public readonly activeCall = this._activeCall.asReadonly();
  public readonly incomingCall = this._incomingCall.asReadonly();
  public readonly calls = this._calls.asReadonly();
  public readonly recordings = this._recordings.asReadonly();
  public readonly transcripts = this._transcripts.asReadonly();
  public readonly consentLogs = this._consentLogs.asReadonly();
  public readonly isLoading = this._isLoading.asReadonly();
  public readonly error = this._error.asReadonly();

  public async loadSettings(userId: string): Promise<void> {
    this._isLoading.set(true);
    try {
      const { data, error } = await this.supabase
        .from('call_settings')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (!error && data) {
        this._settings.set(data);
      } else if (!data) {
        const { data: created } = await this.supabase
          .from('call_settings')
          .insert({ user_id: userId })
          .select()
          .single();
        if (created) {
          this._settings.set(created);
        }
      }
    } catch (err) {
      this._error.set(err instanceof Error ? err.message : 'Failed to load calling settings');
    } finally {
      this._isLoading.set(false);
    }
  }

  public async updateSettings(
    userId: string,
    householdId: string,
    updates: UpdateCallSettingsPayload,
  ): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from('call_settings')
        .update({
          audio_enabled: updates.audioEnabled,
          video_enabled: updates.videoEnabled,
          recording_enabled: updates.recordingEnabled,
          transcripts_enabled: updates.transcriptsEnabled,
          state_residence: updates.stateResidence,
          microphone_id: updates.microphoneId,
          speaker_id: updates.speakerId,
          camera_id: updates.cameraId,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (!error) {
        this._settings.set(data);
        await this.logConsentChange(householdId, userId, updates);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  private async logConsentChange(
    householdId: string,
    userId: string,
    updates: UpdateCallSettingsPayload,
  ): Promise<void> {
    const logs: {
      setting_type: 'audio' | 'video' | 'recording' | 'transcripts';
      action: 'enabled' | 'disabled';
    }[] = [];
    if (updates.audioEnabled !== undefined) {
      logs.push({ setting_type: 'audio', action: updates.audioEnabled ? 'enabled' : 'disabled' });
    }
    if (updates.videoEnabled !== undefined) {
      logs.push({ setting_type: 'video', action: updates.videoEnabled ? 'enabled' : 'disabled' });
    }
    if (updates.recordingEnabled !== undefined) {
      logs.push({
        setting_type: 'recording',
        action: updates.recordingEnabled ? 'enabled' : 'disabled',
      });
    }
    if (updates.transcriptsEnabled !== undefined) {
      logs.push({
        setting_type: 'transcripts',
        action: updates.transcriptsEnabled ? 'enabled' : 'disabled',
      });
    }

    for (const log of logs) {
      await this.supabase.from('call_consent_logs').insert({
        household_id: householdId,
        user_id: userId,
        setting_type: log.setting_type,
        action: log.action,
        details: `Calling preference toggled by user`,
      });
    }
  }

  public async loadCalls(householdId: string): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from('calls')
        .select('*')
        .eq('household_id', householdId)
        .order('started_at', { ascending: false });

      if (!error) {
        this._calls.set(data);
      }
    } catch {
      // ignore
    }
  }

  public async loadConsentLogs(householdId: string): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from('call_consent_logs')
        .select('*')
        .eq('household_id', householdId)
        .order('created_at', { ascending: false });

      if (!error) {
        this._consentLogs.set(data);
      }
    } catch {
      // ignore
    }
  }

  public async loadRecordings(householdId: string): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from('call_recordings')
        .select('*')
        .eq('household_id', householdId)
        .order('created_at', { ascending: false });

      if (!error) {
        this._recordings.set(data);
      }
    } catch {
      // ignore
    }
  }

  public async loadTranscripts(householdId: string): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from('call_transcripts')
        .select('*')
        .eq('household_id', householdId)
        .order('created_at', { ascending: false });

      if (!error) {
        this._transcripts.set(data);
      }
    } catch {
      // ignore
    }
  }

  public async placeCall(
    payload: InitiateCallPayload,
    callerId: string,
  ): Promise<{ success: boolean; callId?: string; error?: string }> {
    this._isLoading.set(true);
    try {
      const { data: call, error } = await this.supabase
        .from('calls')
        .insert({
          household_id: payload.householdId,
          thread_id: payload.threadId ?? null,
          caller_id: callerId,
          callee_id: payload.calleeId,
          call_type: payload.callType,
          status: 'Ringing',
          recording_requested: payload.requestRecording ?? false,
          recording_consent_caller: payload.requestRecording ?? false,
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      this._activeCall.set({
        call,
        remoteName: 'Co-parent',
        isMuted: false,
        isCameraOff: false,
        isSpeaker: false,
        isRecording: false,
        recordingPendingConsent: payload.requestRecording ?? false,
        elapsedSeconds: 0,
      });

      return { success: true, callId: call.id };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to place call' };
    } finally {
      this._isLoading.set(false);
    }
  }

  public async answerCall(callId: string, userId: string): Promise<boolean> {
    try {
      const now = new Date().toISOString();
      const { data, error } = await this.supabase
        .from('calls')
        .update({ status: 'Connected', answered_at: now })
        .eq('id', callId)
        .select()
        .single();

      if (!error) {
        await this.supabase.from('call_events').insert({
          call_id: callId,
          user_id: userId,
          event_type: 'answered',
        });

        this._activeCall.set({
          call: data,
          remoteName: 'Co-parent',
          isMuted: false,
          isCameraOff: false,
          isSpeaker: false,
          isRecording: data.is_recorded,
          recordingPendingConsent: data.recording_requested && !data.is_recorded,
          elapsedSeconds: 1,
        });
        this._incomingCall.set(null);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public async declineCall(callId: string, userId: string): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('calls')
        .update({ status: 'Declined', ended_at: new Date().toISOString() })
        .eq('id', callId);

      if (!error) {
        await this.supabase.from('call_events').insert({
          call_id: callId,
          user_id: userId,
          event_type: 'declined',
        });
        this._incomingCall.set(null);
        this._activeCall.set(null);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public async endCall(userId: string): Promise<boolean> {
    const active = this._activeCall();
    if (!active) {
      return false;
    }

    try {
      const endedAt = new Date().toISOString();
      const duration = active.elapsedSeconds;

      await this.supabase
        .from('calls')
        .update({
          status: 'Completed',
          ended_at: endedAt,
          duration_seconds: duration,
        })
        .eq('id', active.call.id);

      await this.supabase.from('call_events').insert({
        call_id: active.call.id,
        user_id: userId,
        event_type: 'ended',
      });

      if (active.isRecording) {
        await this.finalizeRecording(active.call.id, active.call.household_id, duration);
      }

      this._activeCall.set(null);
      await this.loadCalls(active.call.household_id);
      return true;
    } catch {
      this._activeCall.set(null);
      return false;
    }
  }

  private async finalizeRecording(
    callId: string,
    householdId: string,
    duration: number,
  ): Promise<void> {
    const { data: recording } = await this.supabase
      .from('call_recordings')
      .insert({
        call_id: callId,
        household_id: householdId,
        file_name: `recording-${callId.slice(0, 8)}.webm`,
        file_size: 1048576 * Math.max(1, Math.round(duration / 60)),
        file_type: 'video/webm',
        storage_path: `calls/${householdId}/${callId}.webm`,
        duration_seconds: duration,
      })
      .select()
      .single();

    if (recording && this._settings()?.transcripts_enabled) {
      await this.supabase.from('call_transcripts').insert({
        call_id: callId,
        recording_id: recording.id,
        household_id: householdId,
        content: `[00:00] Parent: Hello, calling regarding school schedule.\n[00:15] Co-parent: Yes, the soccer practice is moved to 4 PM on Tuesday.\n[00:30] Parent: Noted. I will handle pick-up.`,
      });
    }
  }

  public toggleMute(): void {
    this._activeCall.update((s) => (s ? { ...s, isMuted: !s.isMuted } : null));
  }

  public toggleCamera(): void {
    this._activeCall.update((s) => (s ? { ...s, isCameraOff: !s.isCameraOff } : null));
  }

  public toggleSpeaker(): void {
    this._activeCall.update((s) => (s ? { ...s, isSpeaker: !s.isSpeaker } : null));
  }

  public setSimulatedIncomingCall(call: CallRow): void {
    this._incomingCall.set(call);
  }

  public setSimulatedActiveCall(active: ActiveCallState): void {
    this._activeCall.set(active);
  }
}
