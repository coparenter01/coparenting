import type { ChildSection, ChildStatus, EmergencyConsentStatus, Json } from './models.types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Phase3ChildrenTables = {
  children: {
    Row: {
      id: string;
      household_id: string;
      first_name: string;
      last_name: string;
      birth_date: string;
      status: ChildStatus;
      avatar_url: string | null;
      created_by: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      household_id: string;
      first_name: string;
      last_name?: string;
      birth_date: string;
      status?: ChildStatus;
      avatar_url?: string | null;
      created_by?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      household_id?: string;
      first_name?: string;
      last_name?: string;
      birth_date?: string;
      status?: ChildStatus;
      avatar_url?: string | null;
      created_by?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Relationships: [];
  };
  child_information: {
    Row: {
      id: string;
      household_id: string;
      child_id: string | null;
      section: ChildSection;
      entry_type: string;
      title: string;
      details: string | null;
      contact_name: string | null;
      contact_email: string | null;
      contact_phone: string | null;
      contact_address: string | null;
      visibility: 'Shared' | 'Private';
      created_by: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      household_id: string;
      child_id?: string | null;
      section: ChildSection;
      entry_type: string;
      title: string;
      details?: string | null;
      contact_name?: string | null;
      contact_email?: string | null;
      contact_phone?: string | null;
      contact_address?: string | null;
      visibility?: 'Shared' | 'Private';
      created_by?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      household_id?: string;
      child_id?: string | null;
      section?: ChildSection;
      entry_type?: string;
      title?: string;
      details?: string | null;
      contact_name?: string | null;
      contact_email?: string | null;
      contact_phone?: string | null;
      contact_address?: string | null;
      visibility?: 'Shared' | 'Private';
      created_by?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Relationships: [];
  };
  child_entry_history: {
    Row: {
      id: string;
      entry_id: string;
      modified_by: string | null;
      change_summary: string;
      snapshot: Json;
      created_at: string;
    };
    Insert: {
      id?: string;
      entry_id: string;
      modified_by?: string | null;
      change_summary: string;
      snapshot: Json;
      created_at?: string;
    };
    Update: {
      id?: string;
      entry_id?: string;
      modified_by?: string | null;
      change_summary?: string;
      snapshot?: Json;
      created_at?: string;
    };
    Relationships: [];
  };
  emergency_contacts: {
    Row: {
      id: string;
      household_id: string;
      child_id: string | null;
      name: string;
      relationship: string;
      phone: string;
      email: string | null;
      is_authorized_pickup: boolean;
      consent_status: EmergencyConsentStatus;
      consented_at: string | null;
      consent_token: string;
      created_by: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      household_id: string;
      child_id?: string | null;
      name: string;
      relationship: string;
      phone: string;
      email?: string | null;
      is_authorized_pickup?: boolean;
      consent_status?: EmergencyConsentStatus;
      consented_at?: string | null;
      consent_token?: string;
      created_by?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      household_id?: string;
      child_id?: string | null;
      name?: string;
      relationship?: string;
      phone?: string;
      email?: string | null;
      is_authorized_pickup?: boolean;
      consent_status?: EmergencyConsentStatus;
      consented_at?: string | null;
      consent_token?: string;
      created_by?: string | null;
      created_at?: string;
    };
    Relationships: [];
  };
};
