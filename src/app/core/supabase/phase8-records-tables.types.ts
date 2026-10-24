import type {
  AffidavitDelivery,
  AffidavitStatus,
  DeletionRequestStatus,
  ExportFormat,
  ExportStatus,
  JournalStatus,
  JournalType,
  LegalContentType,
  LegalHoldSetBy,
  LegalHoldStatus,
  ScanStatus,
  SubpoenaStatus,
  VerificationResult,
} from './phase8-records.types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Phase8RecordsTables = {
  exports: {
    Row: {
      export_id: string;
      household_id: string;
      requested_by_user_id: string;
      format: ExportFormat;
      record_types: string[];
      date_from: string;
      date_to: string;
      status: ExportStatus;
      record_id: string | null;
      fingerprint: string | null;
      page_count: number | null;
      file_id: string | null;
      file_name: string | null;
      file_size_bytes: number | null;
      generated_at: string | null;
      error_message: string | null;
      created_at: string;
    };
    Insert: {
      export_id?: string;
      household_id: string;
      requested_by_user_id: string;
      format: ExportFormat;
      record_types?: string[];
      date_from: string;
      date_to: string;
      status?: ExportStatus;
      record_id?: string | null;
      fingerprint?: string | null;
      page_count?: number | null;
      file_id?: string | null;
      file_name?: string | null;
      file_size_bytes?: number | null;
      generated_at?: string | null;
      error_message?: string | null;
      created_at?: string;
    };
    Update: Partial<Phase8RecordsTables['exports']['Insert']>;
    Relationships: [];
  };

  verification_lookups: {
    Row: {
      lookup_id: string;
      text_entered: string;
      result: VerificationResult;
      checked_at: string;
      client_hash: string | null;
    };
    Insert: {
      lookup_id?: string;
      text_entered: string;
      result: VerificationResult;
      checked_at?: string;
      client_hash?: string | null;
    };
    Update: Partial<Phase8RecordsTables['verification_lookups']['Insert']>;
    Relationships: [];
  };

  journal_entries: {
    Row: {
      entry_id: string;
      household_id: string;
      user_id: string;
      entry_type: JournalType;
      title: string;
      happened_at: string;
      details: string;
      children: string[];
      status: JournalStatus;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      entry_id?: string;
      household_id: string;
      user_id: string;
      entry_type: JournalType;
      title: string;
      happened_at: string;
      details: string;
      children?: string[];
      status?: JournalStatus;
      created_at?: string;
      updated_at?: string;
    };
    Update: Partial<Phase8RecordsTables['journal_entries']['Insert']>;
    Relationships: [];
  };

  journal_versions: {
    Row: {
      version_id: string;
      entry_id: string;
      version_number: number;
      snapshot: Record<string, unknown>;
      created_by_user_id: string;
      device_type: string;
      created_at: string;
    };
    Insert: {
      version_id?: string;
      entry_id: string;
      version_number: number;
      snapshot: Record<string, unknown>;
      created_by_user_id: string;
      device_type?: string;
      created_at?: string;
    };
    Update: Partial<Phase8RecordsTables['journal_versions']['Insert']>;
    Relationships: [];
  };

  journal_attachments: {
    Row: {
      attachment_id: string;
      entry_id: string;
      file_name: string;
      file_size_bytes: number;
      mime_type: string;
      storage_path: string;
      scan_status: ScanStatus;
      created_at: string;
    };
    Insert: {
      attachment_id?: string;
      entry_id: string;
      file_name: string;
      file_size_bytes: number;
      mime_type: string;
      storage_path: string;
      scan_status?: ScanStatus;
      created_at?: string;
    };
    Update: Partial<Phase8RecordsTables['journal_attachments']['Insert']>;
    Relationships: [];
  };

  affidavit_requests: {
    Row: {
      request_id: string;
      case_number: string;
      requested_by_user_id: string;
      export_id: string;
      record_id: string;
      delivery: AffidavitDelivery;
      mailing_address: string | null;
      court_date: string | null;
      note: string | null;
      status: AffidavitStatus;
      decline_reason: string | null;
      flagged: boolean;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      request_id?: string;
      case_number: string;
      requested_by_user_id: string;
      export_id: string;
      record_id: string;
      delivery: AffidavitDelivery;
      mailing_address?: string | null;
      court_date?: string | null;
      note?: string | null;
      status?: AffidavitStatus;
      decline_reason?: string | null;
      flagged?: boolean;
      created_at?: string;
      updated_at?: string;
    };
    Update: Partial<Phase8RecordsTables['affidavit_requests']['Insert']>;
    Relationships: [];
  };

  affidavit_status_history: {
    Row: {
      history_id: string;
      request_id: string;
      status: string;
      changed_by_user_id: string;
      notes: string | null;
      created_at: string;
    };
    Insert: {
      history_id?: string;
      request_id: string;
      status: string;
      changed_by_user_id: string;
      notes?: string | null;
      created_at?: string;
    };
    Update: Partial<Phase8RecordsTables['affidavit_status_history']['Insert']>;
    Relationships: [];
  };

  subpoena_requests: {
    Row: {
      request_id: string;
      requester_name: string;
      organization: string;
      email: string;
      subpoena_file_path: string | null;
      status: SubpoenaStatus;
      notes: string | null;
      created_at: string;
    };
    Insert: {
      request_id?: string;
      requester_name: string;
      organization: string;
      email: string;
      subpoena_file_path?: string | null;
      status?: SubpoenaStatus;
      notes?: string | null;
      created_at?: string;
    };
    Update: Partial<Phase8RecordsTables['subpoena_requests']['Insert']>;
    Relationships: [];
  };

  legal_content: {
    Row: {
      content_id: string;
      content_type: LegalContentType;
      state: string | null;
      version: number;
      title: string;
      text: string;
      last_reviewed_on: string;
      approved_by_counsel: boolean;
      published_at: string | null;
      created_at: string;
    };
    Insert: {
      content_id?: string;
      content_type: LegalContentType;
      state?: string | null;
      version?: number;
      title: string;
      text: string;
      last_reviewed_on: string;
      approved_by_counsel?: boolean;
      published_at?: string | null;
      created_at?: string;
    };
    Update: Partial<Phase8RecordsTables['legal_content']['Insert']>;
    Relationships: [];
  };

  deletion_requests: {
    Row: {
      deletion_id: string;
      household_id: string;
      user_id: string;
      status: DeletionRequestStatus;
      requested_at: string;
      completed_at: string | null;
      kept_summary: string;
    };
    Insert: {
      deletion_id?: string;
      household_id: string;
      user_id: string;
      status?: DeletionRequestStatus;
      requested_at?: string;
      completed_at?: string | null;
      kept_summary?: string;
    };
    Update: Partial<Phase8RecordsTables['deletion_requests']['Insert']>;
    Relationships: [];
  };

  legal_holds: {
    Row: {
      hold_id: string;
      household_id: string;
      set_by: LegalHoldSetBy;
      set_by_user_id: string | null;
      case_number: string | null;
      status: LegalHoldStatus;
      reason: string | null;
      set_at: string;
      released_at: string | null;
    };
    Insert: {
      hold_id?: string;
      household_id: string;
      set_by: LegalHoldSetBy;
      set_by_user_id?: string | null;
      case_number?: string | null;
      status?: LegalHoldStatus;
      reason?: string | null;
      set_at?: string;
      released_at?: string | null;
    };
    Update: Partial<Phase8RecordsTables['legal_holds']['Insert']>;
    Relationships: [];
  };
};
