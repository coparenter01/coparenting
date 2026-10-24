export type CallType = 'audio' | 'video';

export type CallStatus =
  | 'Initiating'
  | 'Ringing'
  | 'Connected'
  | 'Completed'
  | 'Missed'
  | 'Declined'
  | 'Cancelled'
  | 'Not answered'
  | 'Failed';

export type CallEventType =
  | 'answered'
  | 'declined'
  | 'ended'
  | 'muted'
  | 'unmuted'
  | 'camera_on'
  | 'camera_off'
  | 'recording_requested'
  | 'recording_agreed'
  | 'recording_declined'
  | 'recording_started'
  | 'recording_stopped';

export type CallSettingType = 'audio' | 'video' | 'recording' | 'transcripts';

export type CallConsentAction = 'enabled' | 'disabled' | 'agreed' | 'declined';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CallSettingsRow = {
  id: string;
  user_id: string;
  audio_enabled: boolean;
  video_enabled: boolean;
  recording_enabled: boolean;
  transcripts_enabled: boolean;
  state_residence: string | null;
  microphone_id: string | null;
  speaker_id: string | null;
  camera_id: string | null;
  created_at: string;
  updated_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CallConsentLogRow = {
  id: string;
  household_id: string;
  user_id: string;
  setting_type: CallSettingType;
  action: CallConsentAction;
  details: string | null;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CallRow = {
  id: string;
  household_id: string;
  thread_id: string | null;
  caller_id: string;
  callee_id: string;
  call_type: CallType;
  status: CallStatus;
  started_at: string;
  answered_at: string | null;
  ended_at: string | null;
  duration_seconds: number;
  recording_requested: boolean;
  recording_consent_caller: boolean;
  recording_consent_callee: boolean;
  is_recorded: boolean;
  created_at: string;
  updated_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CallEventRow = {
  id: string;
  call_id: string;
  user_id: string;
  event_type: CallEventType;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CallRecordingRow = {
  id: string;
  call_id: string;
  household_id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  storage_path: string;
  duration_seconds: number;
  started_at: string;
  ended_at: string | null;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CallTranscriptRow = {
  id: string;
  call_id: string;
  recording_id: string;
  household_id: string;
  content: string;
  notice: string;
  created_at: string;
};
