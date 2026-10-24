import type {
  ProfessionalAccessStatus,
  ProfessionalInviteStatus,
  ProfessionalShareItemType,
  ProfessionalType,
} from './phase10-professionals.types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Phase10ProfessionalsTables = {
  professionals: {
    Row: {
      professional_id: string;
      user_id: string | null;
      name: string;
      email: string;
      professional_type: ProfessionalType;
      organization: string | null;
      two_factor_verified: boolean;
      terms_accepted_at: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      professional_id?: string;
      user_id?: string | null;
      name: string;
      email: string;
      professional_type: ProfessionalType;
      organization?: string | null;
      two_factor_verified?: boolean;
      terms_accepted_at?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: Partial<Phase10ProfessionalsTables['professionals']['Insert']>;
    Relationships: [];
  };
  professional_accesses: {
    Row: {
      access_id: string;
      household_id: string;
      parent_id: string;
      professional_id: string;
      status: ProfessionalAccessStatus;
      scope_messages: boolean;
      scope_calendar: boolean;
      scope_expenses: boolean;
      scope_child_info: boolean;
      scope_documents: boolean;
      scope_contact_attempts: boolean;
      date_range_start: string | null;
      date_range_end: string | null;
      access_ends_at: string;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      access_id?: string;
      household_id: string;
      parent_id: string;
      professional_id: string;
      status?: ProfessionalAccessStatus;
      scope_messages?: boolean;
      scope_calendar?: boolean;
      scope_expenses?: boolean;
      scope_child_info?: boolean;
      scope_documents?: boolean;
      scope_contact_attempts?: boolean;
      date_range_start?: string | null;
      date_range_end?: string | null;
      access_ends_at: string;
      created_at?: string;
      updated_at?: string;
    };
    Update: Partial<Phase10ProfessionalsTables['professional_accesses']['Insert']>;
    Relationships: [];
  };
  professional_invites: {
    Row: {
      invite_id: string;
      access_id: string;
      parent_id: string;
      email: string;
      token: string;
      status: ProfessionalInviteStatus;
      note: string | null;
      expires_at: string;
      opened_at: string | null;
      accepted_at: string | null;
      cancelled_at: string | null;
      created_at: string;
    };
    Insert: {
      invite_id?: string;
      access_id: string;
      parent_id: string;
      email: string;
      token: string;
      status?: ProfessionalInviteStatus;
      note?: string | null;
      expires_at: string;
      opened_at?: string | null;
      accepted_at?: string | null;
      cancelled_at?: string | null;
      created_at?: string;
    };
    Update: Partial<Phase10ProfessionalsTables['professional_invites']['Insert']>;
    Relationships: [];
  };
  professional_shares: {
    Row: {
      share_id: string;
      access_id: string;
      item_type: ProfessionalShareItemType;
      item_id: string;
      item_title: string;
      shared_by_user_id: string;
      shared_at: string;
    };
    Insert: {
      share_id?: string;
      access_id: string;
      item_type: ProfessionalShareItemType;
      item_id: string;
      item_title: string;
      shared_by_user_id: string;
      shared_at?: string;
    };
    Update: Partial<Phase10ProfessionalsTables['professional_shares']['Insert']>;
    Relationships: [];
  };
  professional_access_logs: {
    Row: {
      log_id: string;
      access_id: string;
      opened: string;
      opened_at: string;
    };
    Insert: {
      log_id?: string;
      access_id: string;
      opened: string;
      opened_at?: string;
    };
    Update: Partial<Phase10ProfessionalsTables['professional_access_logs']['Insert']>;
    Relationships: [];
  };
  professional_messages: {
    Row: {
      forward_id: string;
      access_id: string;
      message_id: string | null;
      subject: string;
      body: string;
      attachment_name: string | null;
      note: string | null;
      sent_at: string;
      opened_at: string | null;
    };
    Insert: {
      forward_id?: string;
      access_id: string;
      message_id?: string | null;
      subject: string;
      body: string;
      attachment_name?: string | null;
      note?: string | null;
      sent_at?: string;
      opened_at?: string | null;
    };
    Update: Partial<Phase10ProfessionalsTables['professional_messages']['Insert']>;
    Relationships: [];
  };
};
