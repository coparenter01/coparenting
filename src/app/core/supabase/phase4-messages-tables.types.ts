import type {
  MediationRequestRow,
  MessageAttachmentRow,
  MessageDraftRow,
  MessageFolderRow,
  MessageReportRow,
  MessageRow,
  MessageThreadRow,
  ThreadParticipantRow,
} from './phase4-messages.types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Phase4MessagesTables = {
  message_threads: {
    Row: MessageThreadRow;
    Insert: {
      id?: string;
      household_id: string;
      subject: string;
      category?: MessageThreadRow['category'];
      is_group?: boolean;
      status?: MessageThreadRow['status'];
      created_by?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      household_id?: string;
      subject?: string;
      category?: MessageThreadRow['category'];
      is_group?: boolean;
      status?: MessageThreadRow['status'];
      created_by?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Relationships: [];
  };
  thread_participants: {
    Row: ThreadParticipantRow;
    Insert: {
      id?: string;
      thread_id: string;
      user_id: string;
      role?: ThreadParticipantRow['role'];
      joined_at?: string;
      last_read_at?: string | null;
    };
    Update: {
      id?: string;
      thread_id?: string;
      user_id?: string;
      role?: ThreadParticipantRow['role'];
      joined_at?: string;
      last_read_at?: string | null;
    };
    Relationships: [];
  };
  messages: {
    Row: MessageRow;
    Insert: {
      id?: string;
      thread_id: string;
      sender_id?: string | null;
      body: string;
      is_urgent?: boolean;
      status?: MessageRow['status'];
      sent_at?: string;
      delivered_at?: string | null;
      read_at?: string | null;
      held_reason?: string | null;
      held_by_shield?: boolean;
      shield_unhidden_at?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      thread_id?: string;
      sender_id?: string | null;
      body?: string;
      is_urgent?: boolean;
      status?: MessageRow['status'];
      sent_at?: string;
      delivered_at?: string | null;
      read_at?: string | null;
      held_reason?: string | null;
      held_by_shield?: boolean;
      shield_unhidden_at?: string | null;
      created_at?: string;
    };
    Relationships: [];
  };
  message_attachments: {
    Row: MessageAttachmentRow;
    Insert: {
      id?: string;
      message_id: string;
      file_name: string;
      file_size: number;
      file_type: string;
      storage_path: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      message_id?: string;
      file_name?: string;
      file_size?: number;
      file_type?: string;
      storage_path?: string;
      created_at?: string;
    };
    Relationships: [];
  };
  message_drafts: {
    Row: MessageDraftRow;
    Insert: {
      id?: string;
      thread_id?: string | null;
      user_id: string;
      subject?: string | null;
      body?: string;
      is_urgent?: boolean;
      updated_at?: string;
    };
    Update: {
      id?: string;
      thread_id?: string | null;
      user_id?: string;
      subject?: string | null;
      body?: string;
      is_urgent?: boolean;
      updated_at?: string;
    };
    Relationships: [];
  };
  message_reports: {
    Row: MessageReportRow;
    Insert: {
      id?: string;
      message_id: string;
      reporter_id: string;
      reason: MessageReportRow['reason'];
      details?: string | null;
      status?: MessageReportRow['status'];
      created_at?: string;
    };
    Update: {
      id?: string;
      message_id?: string;
      reporter_id?: string;
      reason?: MessageReportRow['reason'];
      details?: string | null;
      status?: MessageReportRow['status'];
      created_at?: string;
    };
    Relationships: [];
  };
  message_folders: {
    Row: MessageFolderRow;
    Insert: {
      id?: string;
      household_id: string;
      user_id: string;
      name: string;
      color?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      household_id?: string;
      user_id?: string;
      name?: string;
      color?: string | null;
      created_at?: string;
    };
    Relationships: [];
  };
  thread_folders: {
    Row: {
      thread_id: string;
      folder_id: string;
    };
    Insert: {
      thread_id: string;
      folder_id: string;
    };
    Update: {
      thread_id?: string;
      folder_id?: string;
    };
    Relationships: [];
  };
  mediation_requests: {
    Row: MediationRequestRow;
    Insert: {
      id?: string;
      household_id: string;
      requester_id: string;
      topic: string;
      issue_summary: string;
      status?: MediationRequestRow['status'];
      mediator_notes?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      household_id?: string;
      requester_id?: string;
      topic?: string;
      issue_summary?: string;
      status?: MediationRequestRow['status'];
      mediator_notes?: string | null;
      created_at?: string;
    };
    Relationships: [];
  };
};
