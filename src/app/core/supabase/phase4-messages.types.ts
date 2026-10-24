export type ThreadCategory =
  'General' | 'Medical' | 'School' | 'Schedule' | 'Expenses' | 'Legal' | 'Emergency';

export type ThreadStatus = 'Active' | 'Archived' | 'Closed';

export type ThreadRole = 'Owner' | 'Member' | 'Observer';

export type MessageStatus = 'Sent' | 'Delivered' | 'Read' | 'Held';

export type ReportReason =
  'Harassment' | 'Hostile Tone' | 'Threat' | 'Profanity' | 'False Information' | 'Other';

export type ReportStatus = 'Pending' | 'Reviewed' | 'Escalated' | 'Dismissed';

export type MediationStatus = 'Requested' | 'In Review' | 'Assigned' | 'Completed' | 'Cancelled';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MessageThreadRow = {
  id: string;
  household_id: string;
  subject: string;
  category: ThreadCategory;
  is_group: boolean;
  status: ThreadStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ThreadParticipantRow = {
  id: string;
  thread_id: string;
  user_id: string;
  role: ThreadRole;
  joined_at: string;
  last_read_at: string | null;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MessageRow = {
  id: string;
  thread_id: string;
  sender_id: string | null;
  body: string;
  is_urgent: boolean;
  status: MessageStatus;
  sent_at: string;
  delivered_at: string | null;
  read_at: string | null;
  held_reason: string | null;
  held_by_shield: boolean;
  shield_unhidden_at: string | null;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MessageAttachmentRow = {
  id: string;
  message_id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  storage_path: string;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MessageDraftRow = {
  id: string;
  thread_id: string | null;
  user_id: string;
  subject: string | null;
  body: string;
  is_urgent: boolean;
  updated_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MessageReportRow = {
  id: string;
  message_id: string;
  reporter_id: string;
  reason: ReportReason;
  details: string | null;
  status: ReportStatus;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MessageFolderRow = {
  id: string;
  household_id: string;
  user_id: string;
  name: string;
  color: string | null;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ThreadFolderRow = {
  thread_id: string;
  folder_id: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MediationRequestRow = {
  id: string;
  household_id: string;
  requester_id: string;
  topic: string;
  issue_summary: string;
  status: MediationStatus;
  mediator_notes: string | null;
  created_at: string;
};
