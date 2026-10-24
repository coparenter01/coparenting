import { Injectable, computed, inject, signal } from '@angular/core';
import { injectSupabaseClient } from '../supabase/supabase-client';
import { AuthService } from '../auth/auth.service';
import { TimeService } from '../time/time.service';
import {
  buildAttemptRow,
  buildHouseholdRow,
  buildInviteRow,
  buildMemberRow,
  buildOutsideAttemptRow,
} from './household-invite.utils';
import type {
  AddMemberParams,
  ChildMatchOption,
  ContactAttemptRow,
  ContactAttemptWithResult,
  HouseholdMemberRow,
  HouseholdRow,
  InviteRow,
  SendInviteParams,
  SendOutsideMessageParams,
} from './household.types';

@Injectable({
  providedIn: 'root',
})
export class HouseholdService {
  private readonly supabase = injectSupabaseClient();
  private readonly authService = inject(AuthService);
  private readonly timeService = inject(TimeService);

  private readonly _currentHousehold = signal<HouseholdRow | null>({
    id: 'demo-household-01',
    name: 'Solo Household',
    mode: 'Solo',
    created_by: 'demo-user',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  private readonly _members = signal<HouseholdMemberRow[]>([]);
  private readonly _invites = signal<InviteRow[]>([]);
  private readonly _contactAttempts = signal<ContactAttemptWithResult[]>([]);
  private readonly _isLoading = signal<boolean>(false);

  public readonly currentHousehold = this._currentHousehold.asReadonly();
  public readonly members = this._members.asReadonly();
  public readonly invites = this._invites.asReadonly();
  public readonly contactAttempts = this._contactAttempts.asReadonly();
  public readonly isLoading = this._isLoading.asReadonly();

  public readonly isSoloMode = computed(() => this._currentHousehold()?.mode === 'Solo');

  public readonly activeInvite = computed(() => {
    const list = this._invites();
    const now = Date.now();
    return (
      list.find(
        (inv) =>
          (inv.status === 'Sent' || inv.status === 'Opened') &&
          new Date(inv.expires_at).getTime() > now,
      ) ?? null
    );
  });

  constructor() {
    void this.initializeHousehold();
  }

  private async initializeHousehold(): Promise<void> {
    const user = this.authService.user();
    if (user?.id) {
      await this.loadHousehold(user.id);
    }
  }

  public async loadHousehold(userId?: string): Promise<HouseholdRow | null> {
    const uid = userId ?? this.authService.user()?.id;
    if (!uid) {
      this.setFallbackHousehold();
      return this._currentHousehold();
    }

    this._isLoading.set(true);
    try {
      const { data: memberRows } = await this.supabase
        .from('household_members')
        .select()
        .eq('user_id', uid)
        .order('joined_at', { ascending: true });

      const primaryMember = memberRows?.[0];
      if (primaryMember) {
        const { data: household } = await this.supabase
          .from('households')
          .select()
          .eq('id', primaryMember.household_id)
          .maybeSingle<HouseholdRow>();

        if (household) {
          this._currentHousehold.set(household);
          await Promise.all([
            this.loadMembers(household.id),
            this.loadInvites(household.id),
            this.loadContactAttempts(household.id),
          ]);
          this._isLoading.set(false);
          return household;
        }
      }

      const created = await this.createDefaultSoloHousehold(uid);
      this._isLoading.set(false);
      return created;
    } catch {
      this.setFallbackHousehold();
      this._isLoading.set(false);
      return this._currentHousehold();
    }
  }

  public async setSoloMode(): Promise<void> {
    const current = this._currentHousehold();
    if (!current) {
      const uid = this.authService.user()?.id ?? 'simulated-user';
      await this.createDefaultSoloHousehold(uid);
      return;
    }
    if (current.mode === 'Solo') return;

    try {
      await this.supabase.from('households').update({ mode: 'Solo' }).eq('id', current.id);
      this._currentHousehold.set({ ...current, mode: 'Solo' });
    } catch {
      this._currentHousehold.set({ ...current, mode: 'Solo' });
    }
  }

  public async updateHouseholdName(name: string): Promise<void> {
    const current = this._currentHousehold();
    if (!current) return;
    try {
      await this.supabase.from('households').update({ name }).eq('id', current.id);
      this._currentHousehold.set({ ...current, name });
    } catch {
      this._currentHousehold.set({ ...current, name });
    }
  }

  public async sendInvite(
    params: SendInviteParams,
  ): Promise<{ invite: InviteRow; shareLink?: string }> {
    const household = this._currentHousehold();
    const user = this.authService.user();
    const householdId = household?.id ?? 'demo-household';
    const userId = user?.id ?? 'demo-user';
    const nowIso = this.timeService.nowUtc();
    const expiresIso = new Date(Date.now() + 7 * 86400000).toISOString();
    const token = `inv_${Math.random().toString(36).substring(2, 10)}${Date.now().toString(36)}`;
    const attemptId = `att-${Math.random().toString(36).substring(2, 8)}`;

    const attemptRow = buildAttemptRow({ attemptId, householdId, userId, params, nowIso });
    const newInvite = buildInviteRow({ householdId, userId, params, token, nowIso, expiresIso });

    await this.persistInviteAndAttempt(newInvite, attemptRow);

    this._invites.update((prev) => [newInvite, ...prev]);
    this._contactAttempts.update((prev) => [attemptRow, ...prev]);

    const shareLink =
      typeof window !== 'undefined'
        ? `${window.location.origin}/accounts/accept-invite?token=${token}`
        : `/accounts/accept-invite?token=${token}`;

    return { invite: newInvite, shareLink };
  }

  private async insertAttemptAndResult(attempt: ContactAttemptWithResult): Promise<void> {
    try {
      await this.supabase.from('contact_attempts').insert({
        id: attempt.id,
        household_id: attempt.householdId,
        initiated_by: attempt.initiatedBy,
        channel: attempt.channel,
        recipient_name: attempt.recipientName,
        recipient_contact: attempt.recipientContact,
        purpose: attempt.purpose,
        content_summary: attempt.contentSummary,
        attempted_at: attempt.attemptedAt,
      });
      await this.supabase.from('contact_attempt_results').insert({
        attempt_id: attempt.id,
        result: attempt.result ?? 'Delivered',
        notes: attempt.resultNotes,
      });
    } catch {
      // Offline fallback
    }
  }

  private async persistInviteAndAttempt(
    invite: InviteRow,
    attempt: ContactAttemptWithResult,
  ): Promise<void> {
    await this.insertAttemptAndResult(attempt);
    try {
      await this.supabase.from('invites').insert(invite);
    } catch {
      // In-memory fallback
    }
  }

  public async cancelInvite(inviteId: string): Promise<void> {
    try {
      await this.supabase.from('invites').update({ status: 'Cancelled' }).eq('id', inviteId);
    } catch {
      // Fallback
    }
    this._invites.update((prev) =>
      prev.map((inv) => (inv.id === inviteId ? { ...inv, status: 'Cancelled' } : inv)),
    );
  }

  public async getInviteByToken(
    token: string,
  ): Promise<{ invite: InviteRow; householdName: string; inviterName: string } | null> {
    const found = this._invites().find((inv) => inv.token_hash === token);
    if (found) {
      return {
        invite: found,
        householdName: this._currentHousehold()?.name ?? 'Household',
        inviterName: this.authService.profile()?.display_name ?? 'Co-parent',
      };
    }
    try {
      const { data: invite } = await this.supabase
        .from('invites')
        .select()
        .eq('token_hash', token)
        .maybeSingle<InviteRow>();
      if (invite?.status !== 'Sent') return null;
      const { data: household } = await this.supabase
        .from('households')
        .select()
        .eq('id', invite.household_id)
        .maybeSingle<HouseholdRow>();
      return {
        invite,
        householdName: household?.name ?? 'Household',
        inviterName: 'Co-parent',
      };
    } catch {
      return null;
    }
  }

  public async acceptInvite(
    token: string,
    childMatches?: readonly ChildMatchOption[],
  ): Promise<boolean> {
    if (childMatches?.length) {
      // Reserved for linkage mapping
    }
    const inviteInfo = await this.getInviteByToken(token);
    const user = this.authService.user();
    if (!inviteInfo || !user) return false;
    const nowIso = this.timeService.nowUtc();

    try {
      await this.supabase
        .from('invites')
        .update({ status: 'Accepted', accepted_at: nowIso })
        .eq('id', inviteInfo.invite.id);
      await this.supabase.from('household_members').insert(
        buildMemberRow({
          householdId: inviteInfo.invite.household_id,
          userId: user.id,
          role: 'Co-parent',
          nowIso,
        }),
      );
      await this.supabase
        .from('households')
        .update({ mode: 'Linked' })
        .eq('id', inviteInfo.invite.household_id);
      await this.loadHousehold(user.id);
      return true;
    } catch {
      this._invites.update((prev) =>
        prev.map((i) => (i.id === inviteInfo.invite.id ? { ...i, status: 'Accepted' } : i)),
      );
      this._currentHousehold.update((h) => (h ? { ...h, mode: 'Linked' } : null));
      return true;
    }
  }

  public async sendMessageOutsideApp(params: SendOutsideMessageParams): Promise<boolean> {
    const householdId = this._currentHousehold()?.id ?? 'demo-household';
    const userId = this.authService.user()?.id ?? 'demo-user';
    const nowIso = this.timeService.nowUtc();
    const attemptRow = buildOutsideAttemptRow(householdId, userId, params, nowIso);
    await this.insertAttemptAndResult(attemptRow);
    this._contactAttempts.update((prev) => [attemptRow, ...prev]);
    return attemptRow.result === 'Delivered';
  }

  public async loadContactAttempts(
    householdId?: string,
  ): Promise<readonly ContactAttemptWithResult[]> {
    const hid = householdId ?? this._currentHousehold()?.id;
    if (!hid) return this._contactAttempts();

    try {
      const { data: attempts } = await this.supabase
        .from('contact_attempts')
        .select()
        .eq('household_id', hid)
        .order('attempted_at', { ascending: false });

      if (attempts && attempts.length > 0) {
        const enriched: ContactAttemptWithResult[] = attempts.map((a: ContactAttemptRow) => ({
          id: a.id,
          householdId: a.household_id,
          initiatedBy: a.initiated_by,
          channel: a.channel,
          recipientName: a.recipient_name,
          recipientContact: a.recipient_contact,
          purpose: a.purpose,
          contentSummary: a.content_summary,
          attemptedAt: a.attempted_at,
          result: 'Delivered',
        }));
        this._contactAttempts.set(enriched);
        return enriched;
      }
    } catch {
      // Fallback
    }
    return this._contactAttempts();
  }

  public async addMember(params: AddMemberParams): Promise<HouseholdMemberRow> {
    const householdId = this._currentHousehold()?.id ?? 'demo-household-01';
    const nowIso = this.timeService.nowUtc();
    const newMember = buildMemberRow({
      householdId,
      userId: `user-${Math.random().toString(36).substring(2, 8)}`,
      role: params.role,
      nowIso,
      permissions: params.permissions,
    });
    try {
      await this.supabase.from('household_members').insert(newMember);
    } catch {
      // Local fallback
    }
    this._members.update((prev) => [...prev, newMember]);
    return newMember;
  }

  public async removeMember(memberId: string): Promise<void> {
    try {
      await this.supabase.from('household_members').delete().eq('id', memberId);
    } catch {
      // Local fallback
    }
    this._members.update((prev) => prev.filter((m) => m.id !== memberId));
  }

  private async loadMembers(householdId: string): Promise<void> {
    try {
      const { data } = await this.supabase
        .from('household_members')
        .select()
        .eq('household_id', householdId);
      if (data) this._members.set(data);
    } catch {
      // Local fallback
    }
  }

  private async loadInvites(householdId: string): Promise<void> {
    try {
      const { data } = await this.supabase
        .from('invites')
        .select()
        .eq('household_id', householdId)
        .order('created_at', { ascending: false });
      if (data) this._invites.set(data);
    } catch {
      // Local fallback
    }
  }

  private async createDefaultSoloHousehold(userId: string): Promise<HouseholdRow> {
    const profile = this.authService.profile();
    const name = profile?.display_name ? `${profile.display_name}'s Household` : 'Solo Household';
    const nowIso = this.timeService.nowUtc();
    const newHousehold = buildHouseholdRow(name, userId, nowIso);
    try {
      await this.supabase.from('households').insert(newHousehold);
      await this.supabase
        .from('household_members')
        .insert(buildMemberRow({ householdId: newHousehold.id, userId, role: 'Parent', nowIso }));
    } catch {
      // Local fallback
    }
    this._currentHousehold.set(newHousehold);
    return newHousehold;
  }

  private setFallbackHousehold(): void {
    if (this._currentHousehold()) return;
    this._currentHousehold.set(
      buildHouseholdRow('Family Household', 'demo-user', this.timeService.nowUtc()),
    );
  }
}
