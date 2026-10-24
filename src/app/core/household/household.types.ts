import type { Database } from '../supabase/database.types';
import type {
  ContactChannel,
  ContactResult,
  HouseholdMode,
  HouseholdRole,
  InviteChannel,
  InviteStatus,
} from '../supabase/models.types';
export type { HouseholdMode, HouseholdRole, InviteStatus };

export type HouseholdRow = Database['public']['Tables']['households']['Row'];
export type HouseholdMemberRow = Database['public']['Tables']['household_members']['Row'];
export type InviteRow = Database['public']['Tables']['invites']['Row'];
export type ContactAttemptRow = Database['public']['Tables']['contact_attempts']['Row'];
export type ContactAttemptResultRow =
  Database['public']['Tables']['contact_attempt_results']['Row'];

export interface ContactAttemptWithResult {
  readonly id: string;
  readonly householdId: string;
  readonly initiatedBy: string;
  readonly channel: ContactChannel;
  readonly recipientName: string;
  readonly recipientContact: string;
  readonly purpose: string;
  readonly contentSummary: string;
  readonly attemptedAt: string;
  readonly result?: ContactResult;
  readonly resultNotes?: string | null;
}

export interface SendInviteParams {
  readonly channel: InviteChannel;
  readonly target: string;
}

export interface SendOutsideMessageParams {
  readonly channel: 'Text' | 'Email';
  readonly recipient: string;
  readonly message: string;
}

export interface ChildMatchOption {
  readonly localChildId: string;
  readonly localChildName: string;
  readonly remoteChildId?: string;
  readonly remoteChildName?: string;
  readonly matchType: 'same' | 'separate';
}

export interface AddMemberParams {
  readonly name: string;
  readonly role: HouseholdRole;
  readonly permissions?: Record<string, boolean>;
}
