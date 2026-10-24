import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import type { EmergencyConsentStatus } from '../supabase/database.types';
import { injectSupabaseClient } from '../supabase/supabase-client';
import { TimeService } from '../time/time.service';
import type {
  ChildInformationRow,
  ChildRow,
  CreateChildInformationParams,
  CreateChildParams,
  CreateEmergencyContactParams,
  EmergencyContactRow,
  UpdateChildParams,
} from './children.types';
import { buildChildInfoRow } from './children.utils';

export const MAX_CHILDREN_PER_HOUSEHOLD = 10;

@Injectable({
  providedIn: 'root',
})
export class ChildrenService {
  private readonly supabase = injectSupabaseClient();
  private readonly authService = inject(AuthService);
  private readonly timeService = inject(TimeService);

  private readonly _children = signal<readonly ChildRow[]>([]);
  private readonly _selectedChildId = signal<string | null>(null);
  private readonly _entries = signal<readonly ChildInformationRow[]>([]);
  private readonly _emergencyContacts = signal<readonly EmergencyContactRow[]>([]);

  public readonly children = this._children.asReadonly();
  public readonly activeChildren = computed(() =>
    this._children().filter((c) => c.status === 'Active'),
  );
  public readonly selectedChild = computed(
    () => this._children().find((c) => c.id === this._selectedChildId()) ?? null,
  );
  public readonly entries = this._entries.asReadonly();
  public readonly emergencyContacts = this._emergencyContacts.asReadonly();

  public selectChild(id: string | null): void {
    this._selectedChildId.set(id);
  }

  public async loadChildren(householdId: string): Promise<readonly ChildRow[]> {
    try {
      const { data } = await this.supabase
        .from('children')
        .select()
        .eq('household_id', householdId)
        .order('birth_date', { ascending: true });
      if (data) {
        this._children.set(data);
        if (data.length > 0 && !this._selectedChildId()) {
          this._selectedChildId.set(data[0]?.id ?? null);
        }
        return data;
      }
    } catch {
      // Local fallback
    }
    if (this._children().length === 0) {
      this.setFallbackChildren(householdId);
    }
    return this._children();
  }

  public async addChild(params: CreateChildParams): Promise<{ child?: ChildRow; error?: string }> {
    const active = this.activeChildren();
    if (active.length >= MAX_CHILDREN_PER_HOUSEHOLD) {
      return { error: 'Maximum of 10 children per household allowed.' };
    }

    const todayStr = this.timeService.nowUtc().substring(0, 10);
    if (params.birthDate > todayStr) {
      return { error: 'The date of birth cannot be in the future.' };
    }

    const userId = this.authService.user()?.id ?? 'demo-user';
    const nowIso = this.timeService.nowUtc();
    const newChild: ChildRow = {
      id: `child-${Math.random().toString(36).substring(2, 9)}`,
      household_id: params.householdId,
      first_name: params.firstName.trim(),
      last_name: params.lastName?.trim() ?? '',
      birth_date: params.birthDate,
      status: 'Active',
      avatar_url: params.avatarUrl ?? null,
      created_by: userId,
      created_at: nowIso,
      updated_at: nowIso,
    };

    try {
      const { data } = await this.supabase.from('children').insert(newChild).select().single();
      if (data) {
        this._children.update((prev) => [...prev, data]);
        return { child: data };
      }
    } catch {
      // Local fallback
    }

    this._children.update((prev) => [...prev, newChild]);
    return { child: newChild };
  }

  public async updateChild(childId: string, params: UpdateChildParams): Promise<boolean> {
    const nowIso = this.timeService.nowUtc();
    try {
      await this.supabase
        .from('children')
        .update({
          ...(params.firstName !== undefined ? { first_name: params.firstName.trim() } : {}),
          ...(params.lastName !== undefined ? { last_name: params.lastName.trim() } : {}),
          ...(params.birthDate !== undefined ? { birth_date: params.birthDate } : {}),
          ...(params.status !== undefined ? { status: params.status } : {}),
          ...(params.avatarUrl !== undefined ? { avatar_url: params.avatarUrl } : {}),
          updated_at: nowIso,
        })
        .eq('id', childId);
    } catch {
      // Local fallback
    }

    this._children.update((prev) =>
      prev.map((c) =>
        c.id === childId
          ? {
              ...c,
              ...(params.firstName !== undefined ? { first_name: params.firstName.trim() } : {}),
              ...(params.lastName !== undefined ? { last_name: params.lastName.trim() } : {}),
              ...(params.birthDate !== undefined ? { birth_date: params.birthDate } : {}),
              ...(params.status !== undefined ? { status: params.status } : {}),
              ...(params.avatarUrl !== undefined ? { avatar_url: params.avatarUrl } : {}),
              updated_at: nowIso,
            }
          : c,
      ),
    );
    return true;
  }

  public async archiveChild(childId: string): Promise<boolean> {
    return this.updateChild(childId, { status: 'Archived' });
  }

  public async loadInformationEntries(
    householdId: string,
    childId?: string,
  ): Promise<readonly ChildInformationRow[]> {
    try {
      let query = this.supabase.from('child_information').select().eq('household_id', householdId);
      if (childId) {
        query = query.eq('child_id', childId);
      }
      const { data } = await query.order('created_at', { ascending: false });
      if (data) {
        this._entries.set(data);
        return data;
      }
    } catch {
      // Local fallback
    }
    if (this._entries().length === 0) {
      this.setFallbackEntries(householdId, childId);
    }
    return this._entries();
  }

  public async addInformationEntry(
    params: CreateChildInformationParams,
  ): Promise<ChildInformationRow> {
    const userId = this.authService.user()?.id ?? 'demo-user';
    const nowIso = this.timeService.nowUtc();
    const newEntry = buildChildInfoRow(params, userId, nowIso);

    try {
      await this.supabase.from('child_information').insert(newEntry);
    } catch {
      // Local fallback
    }

    this._entries.update((prev) => [newEntry, ...prev]);
    return newEntry;
  }

  public async loadEmergencyContacts(householdId: string): Promise<readonly EmergencyContactRow[]> {
    try {
      const { data } = await this.supabase
        .from('emergency_contacts')
        .select()
        .eq('household_id', householdId)
        .order('created_at', { ascending: false });
      if (data) {
        this._emergencyContacts.set(data);
        return data;
      }
    } catch {
      // Local fallback
    }
    if (this._emergencyContacts().length === 0) {
      this.setFallbackContacts(householdId);
    }
    return this._emergencyContacts();
  }

  public async addEmergencyContact(
    params: CreateEmergencyContactParams,
  ): Promise<EmergencyContactRow> {
    const userId = this.authService.user()?.id ?? 'demo-user';
    const nowIso = this.timeService.nowUtc();
    const token = `consent-${Math.random().toString(36).substring(2, 12)}`;
    const newContact: EmergencyContactRow = {
      id: `emg-${Math.random().toString(36).substring(2, 9)}`,
      household_id: params.householdId,
      child_id: params.childId ?? null,
      name: params.name.trim(),
      relationship: params.relationship.trim(),
      phone: params.phone.trim(),
      email: params.email?.trim() ?? null,
      is_authorized_pickup: params.isAuthorizedPickup ?? false,
      consent_status: 'Pending',
      consented_at: null,
      consent_token: token,
      created_by: userId,
      created_at: nowIso,
    };

    try {
      await this.supabase.from('emergency_contacts').insert(newContact);
    } catch {
      // Local fallback
    }

    this._emergencyContacts.update((prev) => [newContact, ...prev]);
    return newContact;
  }

  public async updateEmergencyConsent(
    consentToken: string,
    status: EmergencyConsentStatus,
  ): Promise<boolean> {
    const nowIso = this.timeService.nowUtc();
    try {
      await this.supabase
        .from('emergency_contacts')
        .update({
          consent_status: status,
          consented_at: status === 'Consented' ? nowIso : null,
        })
        .eq('consent_token', consentToken);
    } catch {
      // Local fallback
    }

    this._emergencyContacts.update((prev) =>
      prev.map((c) =>
        c.consent_token === consentToken
          ? { ...c, consent_status: status, consented_at: status === 'Consented' ? nowIso : null }
          : c,
      ),
    );
    return true;
  }

  private setFallbackChildren(householdId: string): void {
    const nowIso = this.timeService.nowUtc();
    this._children.set([
      {
        id: 'child-demo-01',
        household_id: householdId,
        first_name: 'Maya',
        last_name: 'Vance',
        birth_date: '2016-04-12',
        status: 'Active',
        avatar_url: null,
        created_by: 'demo-user',
        created_at: nowIso,
        updated_at: nowIso,
      },
      {
        id: 'child-demo-02',
        household_id: householdId,
        first_name: 'Leo',
        last_name: 'Vance',
        birth_date: '2019-09-24',
        status: 'Active',
        avatar_url: null,
        created_by: 'demo-user',
        created_at: nowIso,
        updated_at: nowIso,
      },
    ]);
    this._selectedChildId.set('child-demo-01');
  }

  private setFallbackEntries(householdId: string, childId?: string): void {
    const nowIso = this.timeService.nowUtc();
    this._entries.set([
      {
        id: 'entry-demo-01',
        household_id: householdId,
        child_id: childId ?? 'child-demo-01',
        section: 'Medical',
        entry_type: 'Allergy',
        title: 'Peanut allergy (severe)',
        details: 'EpiPen stored in school health office and both parents backpacks.',
        contact_name: 'Dr. Sarah Lin (Pediatrician)',
        contact_email: 'office@linpediatrics.example.com',
        contact_phone: '+1 555-019-2834',
        contact_address: '420 Health Way, Suite 300',
        visibility: 'Shared',
        created_by: 'demo-user',
        created_at: nowIso,
        updated_at: nowIso,
      },
      {
        id: 'entry-demo-02',
        household_id: householdId,
        child_id: childId ?? 'child-demo-01',
        section: 'School',
        entry_type: 'Teacher',
        title: '4th Grade Teacher - Ms. Gable',
        details: 'Room 14, Oakridge Elementary. Parent teacher conferences on Thursdays.',
        contact_name: 'Ms. Clara Gable',
        contact_email: 'cgable@oakridge.example.edu',
        contact_phone: '+1 555-014-9988',
        contact_address: '100 Oakridge Rd, Room 14',
        visibility: 'Shared',
        created_by: 'demo-user',
        created_at: nowIso,
        updated_at: nowIso,
      },
    ]);
  }

  private setFallbackContacts(householdId: string): void {
    const nowIso = this.timeService.nowUtc();
    this._emergencyContacts.set([
      {
        id: 'emg-demo-01',
        household_id: householdId,
        child_id: 'child-demo-01',
        name: 'Grandmother (Elena Vance)',
        relationship: 'Grandmother',
        phone: '+1 555-019-4455',
        email: 'elena.vance@example.com',
        is_authorized_pickup: true,
        consent_status: 'Consented',
        consented_at: nowIso,
        consent_token: 'consent-demo-token-elena',
        created_by: 'demo-user',
        created_at: nowIso,
      },
      {
        id: 'emg-demo-02',
        household_id: householdId,
        child_id: 'child-demo-02',
        name: 'Dr. Sarah Lin',
        relationship: 'Pediatrician',
        phone: '+1 555-019-2834',
        email: 'office@linpediatrics.example.com',
        is_authorized_pickup: false,
        consent_status: 'Consented',
        consented_at: nowIso,
        consent_token: 'consent-demo-token-lin',
        created_by: 'demo-user',
        created_at: nowIso,
      },
    ]);
  }
}
