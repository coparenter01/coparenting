import type {
  CallConsentLogRow,
  CallEventRow,
  CallRecordingRow,
  CallRow,
  CallSettingsRow,
  CallTranscriptRow,
} from './phase5-calling.types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Phase5CallingTables = {
  call_settings: {
    Row: CallSettingsRow;
    Insert: {
      id?: string;
      user_id: string;
      audio_enabled?: boolean;
      video_enabled?: boolean;
      recording_enabled?: boolean;
      transcripts_enabled?: boolean;
      state_residence?: string | null;
      microphone_id?: string | null;
      speaker_id?: string | null;
      camera_id?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      user_id?: string;
      audio_enabled?: boolean;
      video_enabled?: boolean;
      recording_enabled?: boolean;
      transcripts_enabled?: boolean;
      state_residence?: string | null;
      microphone_id?: string | null;
      speaker_id?: string | null;
      camera_id?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Relationships: [];
  };
  call_consent_logs: {
    Row: CallConsentLogRow;
    Insert: {
      id?: string;
      household_id: string;
      user_id: string;
      setting_type: CallConsentLogRow['setting_type'];
      action: CallConsentLogRow['action'];
      details?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      household_id?: string;
      user_id?: string;
      setting_type?: CallConsentLogRow['setting_type'];
      action?: CallConsentLogRow['action'];
      details?: string | null;
      created_at?: string;
    };
    Relationships: [];
  };
  calls: {
    Row: CallRow;
    Insert: {
      id?: string;
      household_id: string;
      thread_id?: string | null;
      caller_id: string;
      callee_id: string;
      call_type: CallRow['call_type'];
      status?: CallRow['status'];
      started_at?: string;
      answered_at?: string | null;
      ended_at?: string | null;
      duration_seconds?: number;
      recording_requested?: boolean;
      recording_consent_caller?: boolean;
      recording_consent_callee?: boolean;
      is_recorded?: boolean;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      household_id?: string;
      thread_id?: string | null;
      caller_id?: string;
      callee_id?: string;
      call_type?: CallRow['call_type'];
      status?: CallRow['status'];
      started_at?: string;
      answered_at?: string | null;
      ended_at?: string | null;
      duration_seconds?: number;
      recording_requested?: boolean;
      recording_consent_caller?: boolean;
      recording_consent_callee?: boolean;
      is_recorded?: boolean;
      created_at?: string;
      updated_at?: string;
    };
    Relationships: [];
  };
  call_events: {
    Row: CallEventRow;
    Insert: {
      id?: string;
      call_id: string;
      user_id: string;
      event_type: CallEventRow['event_type'];
      created_at?: string;
    };
    Update: {
      id?: string;
      call_id?: string;
      user_id?: string;
      event_type?: CallEventRow['event_type'];
      created_at?: string;
    };
    Relationships: [];
  };
  call_recordings: {
    Row: CallRecordingRow;
    Insert: {
      id?: string;
      call_id: string;
      household_id: string;
      file_name: string;
      file_size?: number;
      file_type: string;
      storage_path: string;
      duration_seconds?: number;
      started_at?: string;
      ended_at?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      call_id?: string;
      household_id?: string;
      file_name?: string;
      file_size?: number;
      file_type?: string;
      storage_path?: string;
      duration_seconds?: number;
      started_at?: string;
      ended_at?: string | null;
      created_at?: string;
    };
    Relationships: [];
  };
  call_transcripts: {
    Row: CallTranscriptRow;
    Insert: {
      id?: string;
      call_id: string;
      recording_id: string;
      household_id: string;
      content: string;
      notice?: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      call_id?: string;
      recording_id?: string;
      household_id?: string;
      content?: string;
      notice?: string;
      created_at?: string;
    };
    Relationships: [];
  };
};
