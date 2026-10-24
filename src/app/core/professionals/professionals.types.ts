import type {
  ProfessionalAccessStatus,
  ProfessionalInviteStatus,
  ProfessionalShareItemType,
  ProfessionalType,
} from '../supabase/phase10-professionals.types';

export type {
  ProfessionalAccessStatus,
  ProfessionalInviteStatus,
  ProfessionalShareItemType,
  ProfessionalType,
};

export interface Professional {
  id: string;
  userId: string | null;
  name: string;
  email: string;
  type: ProfessionalType;
  organization?: string;
  twoFactorVerified: boolean;
  termsAcceptedAt: string | null;
  createdAt: string;
}

export interface ProfessionalScope {
  messages: boolean;
  calendar: boolean;
  expenses: boolean;
  childInfo: boolean;
  documents: boolean;
  contactAttempts: boolean;
  dateRangeStart?: string | null;
  dateRangeEnd?: string | null;
}

export interface ProfessionalAccess {
  id: string;
  householdId: string;
  parentId: string;
  professionalId: string;
  professional: Professional;
  status: ProfessionalAccessStatus;
  scope: ProfessionalScope;
  accessEndsAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfessionalInvite {
  id: string;
  accessId: string;
  parentId: string;
  email: string;
  token: string;
  status: ProfessionalInviteStatus;
  note?: string;
  expiresAt: string;
  openedAt?: string;
  acceptedAt?: string;
  cancelledAt?: string;
  createdAt: string;
}

export interface ProfessionalShare {
  id: string;
  accessId: string;
  itemType: ProfessionalShareItemType;
  itemId: string;
  itemTitle: string;
  sharedByUserId: string;
  sharedAt: string;
}

export interface ProfessionalAccessLog {
  id: string;
  accessId: string;
  professionalName: string;
  opened: string;
  openedAt: string;
}

export interface ForwardedMessage {
  id: string;
  accessId: string;
  messageId: string | null;
  subject: string;
  body: string;
  attachmentName?: string | null;
  note?: string | null;
  sentAt: string;
  openedAt?: string | null;
}

export interface InviteProfessionalDto {
  name: string;
  email: string;
  type: ProfessionalType;
  organization?: string;
  note?: string;
  scope: ProfessionalScope;
  accessEndsAt: string;
}

export interface SendForwardedMessageDto {
  accessId: string;
  subject: string;
  body: string;
  note?: string;
  attachmentName?: string;
}

export interface ClientRosterItem {
  clientId: string;
  clientName: string;
  sharedSummary: string;
  accessEndsAt: string;
  status: ProfessionalAccessStatus;
}

export const PRO_ERR_01 = 'Professional access is part of the Household plan.';
export const PRO_ERR_02 = 'Enter a valid email address.';
export const PRO_ERR_04 = 'You can have up to 5 professionals at one time.';
export const PRO_ERR_05 = 'You already invited this email. Cancel that invite to send a new one.';
export const PRO_ERR_06 = 'A professional can only read what a parent shares.';
export const PRO_ERR_07 = 'This invite is no longer valid. Ask the parent for a new invite.';
export const PRO_ERR_08 = 'That is too long. Use up to the number of characters shown.';
export const PRO_ERR_09 = 'Choose an end date that is today or later.';
export const PRO_ERR_10 = 'Choose a start date that is not after the end date.';
export const PRO_ERR_11 = 'This professional does not have active access.';
export const PRO_ERR_12 = 'We could not save your change. Nothing was changed. Please try again.';
export const PRO_ERR_13 = 'Your access to this family has ended.';
export const PRO_ERR_14 = 'Open the message before you send it to a professional.';

export function proErr03(field: string): string {
  return `Fill in the ${field}.`;
}

export function proMsg01(email: string): string {
  return `Your invite was sent to ${email}.`;
}

export function proMsg04(name: string): string {
  return `Access for ${name} was updated.`;
}

export function proMsg05(item: string, name: string): string {
  return `You are about to share ${item} with ${name}. They can read it and cannot change it.`;
}

export function proMsg06(name: string): string {
  return `Shared with ${name}.`;
}

export function proMsg07(name: string): string {
  return `${name} will no longer see anything. Files they already downloaded stay with them.`;
}

export function proMsg08(parentName: string): string {
  return `Your access to the records of ${parentName} has ended.`;
}

export const PRO_MSGT_09 =
  'Professional access is paused because your household is on the Free core plan. It starts again with the Household plan.';

export function proMsg10(parentName: string): string {
  return `Read only. You see what ${parentName} chose to share.`;
}

export const PRO_MSGT_11 =
  'I accept the professional terms of service and confidentiality obligations.';

export function proMsg12(name: string): string {
  return `You are about to send this message to ${name}. They will see only this message and your note.`;
}

export function proMsg13(name: string): string {
  return `Your message was sent to ${name}.`;
}

export function proMsg15(parentName: string): string {
  return `You cannot reply here. Please contact ${parentName} directly.`;
}

export const PRO_ERRORS = {
  ERR_01: PRO_ERR_01,
  ERR_02: PRO_ERR_02,
  err03: proErr03,
  ERR_04: PRO_ERR_04,
  ERR_05: PRO_ERR_05,
  ERR_06: PRO_ERR_06,
  ERR_07: PRO_ERR_07,
  ERR_08: PRO_ERR_08,
  ERR_09: PRO_ERR_09,
  ERR_10: PRO_ERR_10,
  ERR_11: PRO_ERR_11,
  ERR_12: PRO_ERR_12,
  ERR_13: PRO_ERR_13,
  ERR_14: PRO_ERR_14,
} as const;

export const PRO_MESSAGES = {
  msg01: proMsg01,
  msg04: proMsg04,
  msg05: proMsg05,
  msg06: proMsg06,
  msg07: proMsg07,
  msg08: proMsg08,
  MSGT_09: PRO_MSGT_09,
  msg10: proMsg10,
  MSGT_11: PRO_MSGT_11,
  msg12: proMsg12,
  msg13: proMsg13,
  msg15: proMsg15,
} as const;
