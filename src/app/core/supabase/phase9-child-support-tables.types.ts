import type {
  AgencyPaymentStatus,
  CaseStatus,
  HearingStatus,
  AgencyInviteStatus,
  MatchStatus,
  ProofPaymentMethod,
  ProofSubmissionStatus,
  SafetyOfferDecision,
  SharedItemType,
  SyncLogChannel,
  SyncLogStatus,
  SyncSource,
} from './phase9-child-support.types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Phase9ChildSupportTables = {
  child_support_cases: {
    Row: {
      case_id: string;
      household_id: string;
      user_id: string;
      agency_case_number: string;
      state: string;
      status: CaseStatus;
      monthly_order_cents: number;
      balance_owed_cents: number;
      arrears_balance_cents: number;
      last_payment_date: string | null;
      last_payment_amount_cents: number;
      next_hearing_date: string | null;
      last_synced_at: string;
      sync_source: SyncSource;
      family_violence_flag: boolean;
      safety_mode_offered: boolean;
      unlinked_at: string | null;
      purge_at: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      case_id?: string;
      household_id: string;
      user_id: string;
      agency_case_number: string;
      state: string;
      status?: CaseStatus;
      monthly_order_cents?: number;
      balance_owed_cents?: number;
      arrears_balance_cents?: number;
      last_payment_date?: string | null;
      last_payment_amount_cents?: number;
      next_hearing_date?: string | null;
      last_synced_at?: string;
      sync_source?: SyncSource;
      family_violence_flag?: boolean;
      safety_mode_offered?: boolean;
      unlinked_at?: string | null;
      purge_at?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: Partial<Phase9ChildSupportTables['child_support_cases']['Insert']>;
    Relationships: [];
  };
  css_consents: {
    Row: {
      consent_id: string;
      case_id: string;
      user_id: string;
      scope_read_only: boolean;
      acknowledged_not_agency: boolean;
      acknowledged_privacy: boolean;
      acknowledged_revoke_anytime: boolean;
      consented_at: string;
      revoked_at: string | null;
      ip_address: string | null;
      user_agent: string | null;
    };
    Insert: {
      consent_id?: string;
      case_id: string;
      user_id: string;
      scope_read_only?: boolean;
      acknowledged_not_agency?: boolean;
      acknowledged_privacy?: boolean;
      acknowledged_revoke_anytime?: boolean;
      consented_at?: string;
      revoked_at?: string | null;
      ip_address?: string | null;
      user_agent?: string | null;
    };
    Update: Partial<Phase9ChildSupportTables['css_consents']['Insert']>;
    Relationships: [];
  };
  agency_payments: {
    Row: {
      payment_id: string;
      case_id: string;
      agency_reference: string | null;
      payment_date: string;
      amount_cents: number;
      source: SyncSource;
      status: AgencyPaymentStatus;
      synced_at: string;
    };
    Insert: {
      payment_id?: string;
      case_id: string;
      agency_reference?: string | null;
      payment_date: string;
      amount_cents: number;
      source?: SyncSource;
      status?: AgencyPaymentStatus;
      synced_at?: string;
    };
    Update: Partial<Phase9ChildSupportTables['agency_payments']['Insert']>;
    Relationships: [];
  };
  css_payment_matches: {
    Row: {
      match_id: string;
      case_id: string;
      agency_payment_id: string | null;
      expense_payment_id: string | null;
      match_status: MatchStatus;
      flag_dismissed: boolean;
      dismissed_reason: string | null;
      dismissed_at: string | null;
      created_at: string;
    };
    Insert: {
      match_id?: string;
      case_id: string;
      agency_payment_id?: string | null;
      expense_payment_id?: string | null;
      match_status: MatchStatus;
      flag_dismissed?: boolean;
      dismissed_reason?: string | null;
      dismissed_at?: string | null;
      created_at?: string;
    };
    Update: Partial<Phase9ChildSupportTables['css_payment_matches']['Insert']>;
    Relationships: [];
  };
  css_hearings: {
    Row: {
      hearing_id: string;
      case_id: string;
      title: string;
      hearing_date: string;
      location: string;
      docket_number: string | null;
      required_documents: string[];
      status: HearingStatus;
      created_at: string;
    };
    Insert: {
      hearing_id?: string;
      case_id: string;
      title: string;
      hearing_date: string;
      location: string;
      docket_number?: string | null;
      required_documents?: string[];
      status?: HearingStatus;
      created_at?: string;
    };
    Update: Partial<Phase9ChildSupportTables['css_hearings']['Insert']>;
    Relationships: [];
  };
  css_shared_items: {
    Row: {
      share_id: string;
      case_id: string;
      shared_by_user_id: string;
      item_type: SharedItemType;
      item_id: string;
      title: string;
      shared_details: Record<string, unknown>;
      shared_at: string;
    };
    Insert: {
      share_id?: string;
      case_id: string;
      shared_by_user_id: string;
      item_type: SharedItemType;
      item_id: string;
      title: string;
      shared_details?: Record<string, unknown>;
      shared_at?: string;
    };
    Update: Partial<Phase9ChildSupportTables['css_shared_items']['Insert']>;
    Relationships: [];
  };
  css_proof_submissions: {
    Row: {
      submission_id: string;
      case_id: string;
      submitted_by_user_id: string;
      payment_date: string;
      amount_cents: number;
      payment_method: ProofPaymentMethod;
      reference_number: string | null;
      file_url: string;
      verification_record_id: string;
      status: ProofSubmissionStatus;
      created_at: string;
    };
    Insert: {
      submission_id?: string;
      case_id: string;
      submitted_by_user_id: string;
      payment_date: string;
      amount_cents: number;
      payment_method: ProofPaymentMethod;
      reference_number?: string | null;
      file_url: string;
      verification_record_id: string;
      status?: ProofSubmissionStatus;
      created_at?: string;
    };
    Update: Partial<Phase9ChildSupportTables['css_proof_submissions']['Insert']>;
    Relationships: [];
  };
  css_safety_offers: {
    Row: {
      offer_id: string;
      case_id: string;
      user_id: string;
      decision: SafetyOfferDecision;
      decided_at: string | null;
      created_at: string;
    };
    Insert: {
      offer_id?: string;
      case_id: string;
      user_id: string;
      decision?: SafetyOfferDecision;
      decided_at?: string | null;
      created_at?: string;
    };
    Update: Partial<Phase9ChildSupportTables['css_safety_offers']['Insert']>;
    Relationships: [];
  };
  css_agency_invites: {
    Row: {
      invite_id: string;
      case_id: string;
      invited_by_user_id: string;
      recipient_contact: string;
      docket_notice_number: string;
      status: AgencyInviteStatus;
      sent_at: string;
    };
    Insert: {
      invite_id?: string;
      case_id: string;
      invited_by_user_id: string;
      recipient_contact: string;
      docket_notice_number: string;
      status?: AgencyInviteStatus;
      sent_at?: string;
    };
    Update: Partial<Phase9ChildSupportTables['css_agency_invites']['Insert']>;
    Relationships: [];
  };
  css_sync_logs: {
    Row: {
      log_id: string;
      batch_id: string;
      agency_name: string;
      channel: SyncLogChannel;
      started_at: string;
      finished_at: string | null;
      latency_ms: number | null;
      records_count: number;
      status: SyncLogStatus;
      error_summary: string | null;
      created_at: string;
    };
    Insert: {
      log_id?: string;
      batch_id: string;
      agency_name: string;
      channel: SyncLogChannel;
      started_at: string;
      finished_at?: string | null;
      latency_ms?: number | null;
      records_count?: number;
      status: SyncLogStatus;
      error_summary?: string | null;
      created_at?: string;
    };
    Update: Partial<Phase9ChildSupportTables['css_sync_logs']['Insert']>;
    Relationships: [];
  };
};
