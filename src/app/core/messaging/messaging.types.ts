import type {
  MediationRequestRow,
  MessageAttachmentRow,
  MessageDraftRow,
  MessageFolderRow,
  MessageReportRow,
  MessageRow,
  MessageThreadRow,
  ThreadParticipantRow,
} from '../supabase/phase4-messages.types';

export interface ThreadWithDetails extends MessageThreadRow {
  latestMessage?: MessageRow;
  unreadCount?: number;
  participants?: ThreadParticipantRow[];
}

export interface ComposeMessagePayload {
  threadId?: string;
  householdId: string;
  subject?: string;
  body: string;
  category?: MessageThreadRow['category'];
  isUrgent?: boolean;
  participantIds?: string[];
  attachments?: {
    fileName: string;
    fileSize: number;
    fileType: string;
    storagePath: string;
  }[];
}

export interface ToneFeedback {
  score: 'calm' | 'firm' | 'elevated' | 'hostile';
  isSafeToSend: boolean;
  flaggedPhrases: string[];
  suggestions: string[];
  rewrites: string[];
}

export type {
  MediationRequestRow,
  MessageAttachmentRow,
  MessageDraftRow,
  MessageFolderRow,
  MessageReportRow,
  MessageRow,
  MessageThreadRow,
  ThreadParticipantRow,
};
