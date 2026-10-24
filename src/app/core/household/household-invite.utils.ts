import type {
  ContactAttemptWithResult,
  HouseholdMemberRow,
  HouseholdRole,
  HouseholdRow,
  InviteRow,
  SendInviteParams,
} from './household.types';

export interface BuildAttemptOptions {
  readonly attemptId: string;
  readonly householdId: string;
  readonly userId: string;
  readonly params: SendInviteParams;
  readonly nowIso: string;
}

export interface BuildInviteOptions {
  readonly householdId: string;
  readonly userId: string;
  readonly params: SendInviteParams;
  readonly token: string;
  readonly nowIso: string;
  readonly expiresIso: string;
}

export interface BuildMemberOptions {
  readonly householdId: string;
  readonly userId: string;
  readonly role: HouseholdRole;
  readonly nowIso: string;
  readonly permissions?: Record<string, boolean>;
}

export function buildAttemptRow(options: BuildAttemptOptions): ContactAttemptWithResult {
  const channel =
    options.params.channel === 'Text'
      ? 'Text'
      : options.params.channel === 'Email'
        ? 'Email'
        : 'Letter';
  return {
    id: options.attemptId,
    householdId: options.householdId,
    initiatedBy: options.userId,
    channel,
    recipientName: 'Co-parent',
    recipientContact: options.params.target || 'Invite Link',
    purpose: 'Household co-parent invite',
    contentSummary: `Invite generated via ${options.params.channel} channel`,
    attemptedAt: options.nowIso,
    result: 'Delivered',
    resultNotes: 'Invite dispatched successfully',
  };
}

export function buildInviteRow(options: BuildInviteOptions): InviteRow {
  return {
    id: `inv-${Math.random().toString(36).substring(2, 8)}`,
    household_id: options.householdId,
    invited_by: options.userId,
    channel: options.params.channel,
    target_email: options.params.channel === 'Email' ? options.params.target : null,
    target_phone: options.params.channel === 'Text' ? options.params.target : null,
    token_hash: options.token,
    status: 'Sent',
    sent_at: options.nowIso,
    opened_at: null,
    accepted_at: null,
    expires_at: options.expiresIso,
    created_at: options.nowIso,
  };
}

export function buildMemberRow(options: BuildMemberOptions): HouseholdMemberRow {
  return {
    id: `mem-${Math.random().toString(36).substring(2, 8)}`,
    household_id: options.householdId,
    user_id: options.userId,
    role: options.role,
    status: 'Active',
    permissions: options.permissions ?? {},
    joined_at: options.nowIso,
  };
}

export function buildHouseholdRow(name: string, userId: string, nowIso: string): HouseholdRow {
  return {
    id: `hh-${Math.random().toString(36).substring(2, 8)}`,
    name,
    mode: 'Solo',
    created_by: userId,
    created_at: nowIso,
    updated_at: nowIso,
  };
}

export function buildOutsideAttemptRow(
  householdId: string,
  userId: string,
  params: { channel: 'Text' | 'Email'; recipient: string; message: string },
  nowIso: string,
): ContactAttemptWithResult {
  const isSuccess = Boolean(params.recipient && params.message.trim());
  return {
    id: `att-${Math.random().toString(36).substring(2, 8)}`,
    householdId,
    initiatedBy: userId,
    channel: params.channel === 'Text' ? 'Text' : 'Email',
    recipientName: 'Co-parent',
    recipientContact: params.recipient,
    purpose: 'Message co-parent outside app',
    contentSummary: params.message,
    attemptedAt: nowIso,
    result: isSuccess ? 'Delivered' : 'Failed',
    resultNotes: isSuccess ? 'Dispatched via gateway simulator' : 'Gateway validation error',
  };
}
