import type {
  AccountStatus,
  AlertPreviewLevel,
  ContactChannel,
  ContactResult,
  HouseholdMemberStatus,
  HouseholdMode,
  HouseholdRole,
  InviteChannel,
  InviteStatus,
  Json,
  ShieldLevel,
} from './models.types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type PublicTables = {
  profiles: {
    Row: {
      id: string;
      email: string;
      display_name: string;
      mobile_number: string | null;
      language: string;
      status: AccountStatus;
      time_zone: string;
      failed_attempts: number;
      locked_until: string | null;
      passcode_hash: string | null;
      failed_passcodes: number;
      email_verified_at: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id: string;
      email: string;
      display_name: string;
      mobile_number?: string | null;
      language?: string;
      status?: AccountStatus;
      time_zone?: string;
      failed_attempts?: number;
      locked_until?: string | null;
      passcode_hash?: string | null;
      failed_passcodes?: number;
      email_verified_at?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      email?: string;
      display_name?: string;
      mobile_number?: string | null;
      language?: string;
      status?: AccountStatus;
      time_zone?: string;
      failed_attempts?: number;
      locked_until?: string | null;
      passcode_hash?: string | null;
      failed_passcodes?: number;
      email_verified_at?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Relationships: [];
  };
  user_settings: {
    Row: {
      user_id: string;
      session_timeout_minutes: number;
      alert_preview_level: AlertPreviewLevel;
      email_wait_minutes: number;
      tone_check_on: boolean;
      shield_on: boolean;
      shield_level: ShieldLevel;
      push_enabled: boolean;
      passcode_enabled: boolean;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      user_id: string;
      session_timeout_minutes?: number;
      alert_preview_level?: AlertPreviewLevel;
      email_wait_minutes?: number;
      tone_check_on?: boolean;
      shield_on?: boolean;
      shield_level?: ShieldLevel;
      push_enabled?: boolean;
      passcode_enabled?: boolean;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      user_id?: string;
      session_timeout_minutes?: number;
      alert_preview_level?: AlertPreviewLevel;
      email_wait_minutes?: number;
      tone_check_on?: boolean;
      shield_on?: boolean;
      shield_level?: ShieldLevel;
      push_enabled?: boolean;
      passcode_enabled?: boolean;
      created_at?: string;
      updated_at?: string;
    };
    Relationships: [];
  };
  safety_settings: {
    Row: {
      user_id: string;
      is_on: boolean;
      turned_on_at: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      user_id: string;
      is_on?: boolean;
      turned_on_at?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      user_id?: string;
      is_on?: boolean;
      turned_on_at?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Relationships: [];
  };
  households: {
    Row: {
      id: string;
      name: string;
      mode: HouseholdMode;
      created_by: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      name: string;
      mode?: HouseholdMode;
      created_by?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      name?: string;
      mode?: HouseholdMode;
      created_by?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Relationships: [];
  };
  household_members: {
    Row: {
      id: string;
      household_id: string;
      user_id: string;
      role: HouseholdRole;
      status: HouseholdMemberStatus;
      permissions: Json;
      joined_at: string;
    };
    Insert: {
      id?: string;
      household_id: string;
      user_id: string;
      role: HouseholdRole;
      status?: HouseholdMemberStatus;
      permissions?: Json;
      joined_at?: string;
    };
    Update: {
      id?: string;
      household_id?: string;
      user_id?: string;
      role?: HouseholdRole;
      status?: HouseholdMemberStatus;
      permissions?: Json;
      joined_at?: string;
    };
    Relationships: [];
  };
  invites: {
    Row: {
      id: string;
      household_id: string;
      invited_by: string;
      channel: InviteChannel;
      target_email: string | null;
      target_phone: string | null;
      token_hash: string;
      status: InviteStatus;
      sent_at: string;
      opened_at: string | null;
      accepted_at: string | null;
      expires_at: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      household_id: string;
      invited_by: string;
      channel: InviteChannel;
      target_email?: string | null;
      target_phone?: string | null;
      token_hash: string;
      status?: InviteStatus;
      sent_at?: string;
      opened_at?: string | null;
      accepted_at?: string | null;
      expires_at?: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      household_id?: string;
      invited_by?: string;
      channel?: InviteChannel;
      target_email?: string | null;
      target_phone?: string | null;
      token_hash?: string;
      status?: InviteStatus;
      sent_at?: string;
      opened_at?: string | null;
      accepted_at?: string | null;
      expires_at?: string;
      created_at?: string;
    };
    Relationships: [];
  };
  contact_attempts: {
    Row: {
      id: string;
      household_id: string;
      initiated_by: string;
      channel: ContactChannel;
      recipient_name: string;
      recipient_contact: string;
      purpose: string;
      content_summary: string;
      attempted_at: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      household_id: string;
      initiated_by: string;
      channel: ContactChannel;
      recipient_name: string;
      recipient_contact: string;
      purpose: string;
      content_summary: string;
      attempted_at?: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      household_id?: string;
      initiated_by?: string;
      channel?: ContactChannel;
      recipient_name?: string;
      recipient_contact?: string;
      purpose?: string;
      content_summary?: string;
      attempted_at?: string;
      created_at?: string;
    };
    Relationships: [];
  };
  contact_attempt_results: {
    Row: {
      id: string;
      attempt_id: string;
      result: ContactResult;
      notes: string | null;
      recorded_at: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      attempt_id: string;
      result: ContactResult;
      notes?: string | null;
      recorded_at?: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      attempt_id?: string;
      result?: ContactResult;
      notes?: string | null;
      recorded_at?: string;
      created_at?: string;
    };
    Relationships: [];
  };
  audit_log: {
    Row: {
      id: string;
      household_id: string | null;
      actor_id: string | null;
      action: string;
      object_type: string;
      object_id: string | null;
      result: 'Success' | 'Failed' | 'Blocked';
      details: Json;
      created_at: string;
    };
    Insert: {
      id?: string;
      household_id?: string | null;
      actor_id?: string | null;
      action: string;
      object_type: string;
      object_id?: string | null;
      result: 'Success' | 'Failed' | 'Blocked';
      details?: Json;
      created_at?: string;
    };
    Update: {
      id?: string;
      household_id?: string | null;
      actor_id?: string | null;
      action?: string;
      object_type?: string;
      object_id?: string | null;
      result?: 'Success' | 'Failed' | 'Blocked';
      details?: Json;
      created_at?: string;
    };
    Relationships: [];
  };
  outbound_messages: {
    Row: {
      id: string;
      channel: 'Email' | 'Push' | 'SMS';
      template: string;
      recipient_ref: string;
      status: 'Queued' | 'Sent' | 'Failed';
      attempts: number;
      provider_message_id: string | null;
      error: string | null;
      created_at: string;
      sent_at: string | null;
    };
    Insert: {
      id?: string;
      channel: 'Email' | 'Push' | 'SMS';
      template: string;
      recipient_ref: string;
      status?: 'Queued' | 'Sent' | 'Failed';
      attempts?: number;
      provider_message_id?: string | null;
      error?: string | null;
      created_at?: string;
      sent_at?: string | null;
    };
    Update: {
      id?: string;
      channel?: 'Email' | 'Push' | 'SMS';
      template?: string;
      recipient_ref?: string;
      status?: 'Queued' | 'Sent' | 'Failed';
      attempts?: number;
      provider_message_id?: string | null;
      error?: string | null;
      created_at?: string;
      sent_at?: string | null;
    };
    Relationships: [];
  };
  feature_flags: {
    Row: { key: string; is_released: boolean; description: string | null; created_at: string };
    Insert: {
      key: string;
      is_released?: boolean;
      description?: string | null;
      created_at?: string;
    };
    Update: {
      key?: string;
      is_released?: boolean;
      description?: string | null;
      created_at?: string;
    };
    Relationships: [];
  };
};
