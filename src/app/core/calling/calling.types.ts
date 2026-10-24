import type {
  CallConsentLogRow,
  CallEventRow,
  CallRecordingRow,
  CallRow,
  CallSettingsRow,
  CallTranscriptRow,
  CallType,
} from '../supabase/phase5-calling.types';

export interface ActiveCallState {
  call: CallRow;
  remoteName: string;
  isMuted: boolean;
  isCameraOff: boolean;
  isSpeaker: boolean;
  isRecording: boolean;
  recordingPendingConsent: boolean;
  elapsedSeconds: number;
}

export interface InitiateCallPayload {
  householdId: string;
  calleeId: string;
  callType: CallType;
  requestRecording?: boolean;
  threadId?: string;
}

export interface UpdateCallSettingsPayload {
  audioEnabled?: boolean;
  videoEnabled?: boolean;
  recordingEnabled?: boolean;
  transcriptsEnabled?: boolean;
  stateResidence?: string | null;
  microphoneId?: string | null;
  speakerId?: string | null;
  cameraId?: string | null;
}

export type {
  CallConsentLogRow,
  CallEventRow,
  CallRecordingRow,
  CallRow,
  CallSettingsRow,
  CallTranscriptRow,
  CallType,
};
