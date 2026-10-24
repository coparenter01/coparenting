import type { Database } from '../supabase/database.types';
import type { ChildSection, ChildStatus, EmergencyConsentStatus } from '../supabase/models.types';

export type { EmergencyConsentStatus };

export type ChildRow = Database['public']['Tables']['children']['Row'];
export type ChildInformationRow = Database['public']['Tables']['child_information']['Row'];
export type ChildEntryHistoryRow = Database['public']['Tables']['child_entry_history']['Row'];
export type EmergencyContactRow = Database['public']['Tables']['emergency_contacts']['Row'];

export interface CreateChildParams {
  readonly householdId: string;
  readonly firstName: string;
  readonly lastName?: string;
  readonly birthDate: string;
  readonly avatarUrl?: string | null;
}

export interface UpdateChildParams {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly birthDate?: string;
  readonly status?: ChildStatus;
  readonly avatarUrl?: string | null;
}

export interface CreateChildInformationParams {
  readonly householdId: string;
  readonly childId?: string | null;
  readonly section: ChildSection;
  readonly entryType: string;
  readonly title: string;
  readonly details?: string | null;
  readonly contactName?: string | null;
  readonly contactEmail?: string | null;
  readonly contactPhone?: string | null;
  readonly contactAddress?: string | null;
  readonly visibility?: 'Shared' | 'Private';
}

export interface CreateEmergencyContactParams {
  readonly householdId: string;
  readonly childId?: string | null;
  readonly name: string;
  readonly relationship: string;
  readonly phone: string;
  readonly email?: string | null;
  readonly isAuthorizedPickup?: boolean;
}
