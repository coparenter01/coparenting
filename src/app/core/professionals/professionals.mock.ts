import type {
  ClientRosterItem,
  ForwardedMessage,
  Professional,
  ProfessionalAccess,
  ProfessionalAccessLog,
  ProfessionalInvite,
  ProfessionalShare,
} from './professionals.types';

export const PRO_SARAH: Professional = {
  id: 'pro-001',
  userId: 'user-pro-001',
  name: 'Sarah Jenkins, Esq.',
  email: 'sarah.jenkins@familylaw.example.com',
  type: 'Attorney',
  organization: 'Jenkins & Associates Family Law',
  twoFactorVerified: true,
  termsAcceptedAt: '2026-10-15T09:00:00Z',
  createdAt: '2026-10-15T08:30:00Z',
};

export const PRO_DAVID: Professional = {
  id: 'pro-002',
  userId: null,
  name: 'David Vance',
  email: 'dvance@accordmediation.example.com',
  type: 'Mediator',
  organization: 'Accord Dispute Resolution',
  twoFactorVerified: false,
  termsAcceptedAt: null,
  createdAt: '2026-10-18T14:15:00Z',
};

export const PRO_ELENA: Professional = {
  id: 'pro-003',
  userId: 'user-pro-003',
  name: 'Dr. Elena Rostova',
  email: 'elena@rostovapsych.example.com',
  type: 'Therapist',
  organization: 'Child & Family Wellbeing Clinic',
  twoFactorVerified: true,
  termsAcceptedAt: '2026-09-01T10:00:00Z',
  createdAt: '2026-09-01T09:00:00Z',
};

export const MOCK_PROFESSIONALS: Professional[] = [PRO_SARAH, PRO_DAVID, PRO_ELENA];

export const MOCK_ACCESSES: ProfessionalAccess[] = [
  {
    id: 'acc-001',
    householdId: 'hh-001',
    parentId: 'parent-001',
    professionalId: 'pro-001',
    professional: PRO_SARAH,
    status: 'Active',
    scope: {
      messages: true,
      calendar: true,
      expenses: false,
      childInfo: true,
      documents: true,
      contactAttempts: false,
      dateRangeStart: '2026-01-01',
      dateRangeEnd: '2026-12-31',
    },
    accessEndsAt: '2027-04-30',
    createdAt: '2026-10-15T09:00:00Z',
    updatedAt: '2026-10-15T09:00:00Z',
  },
  {
    id: 'acc-002',
    householdId: 'hh-001',
    parentId: 'parent-001',
    professionalId: 'pro-002',
    professional: PRO_DAVID,
    status: 'Invited',
    scope: {
      messages: true,
      calendar: true,
      expenses: true,
      childInfo: true,
      documents: false,
      contactAttempts: true,
    },
    accessEndsAt: '2027-01-15',
    createdAt: '2026-10-18T14:15:00Z',
    updatedAt: '2026-10-18T14:15:00Z',
  },
  {
    id: 'acc-003',
    householdId: 'hh-001',
    parentId: 'parent-001',
    professionalId: 'pro-003',
    professional: PRO_ELENA,
    status: 'Ended',
    scope: {
      messages: false,
      calendar: false,
      expenses: false,
      childInfo: true,
      documents: false,
      contactAttempts: false,
    },
    accessEndsAt: '2026-10-01',
    createdAt: '2026-09-01T09:00:00Z',
    updatedAt: '2026-10-01T23:59:59Z',
  },
];

export const MOCK_INVITES: ProfessionalInvite[] = [
  {
    id: 'inv-002',
    accessId: 'acc-002',
    parentId: 'parent-001',
    email: 'dvance@accordmediation.example.com',
    token: 'inv_token_david_vance_2026',
    status: 'Sent',
    note: 'Mediation prep for upcoming parenting schedule adjustment',
    expiresAt: '2026-10-25T14:15:00Z',
    createdAt: '2026-10-18T14:15:00Z',
  },
];

export const MOCK_ACCESS_LOGS: ProfessionalAccessLog[] = [
  {
    id: 'log-001',
    accessId: 'acc-001',
    professionalName: 'Sarah Jenkins, Esq.',
    opened: 'Messages (shared export 2026-Q3)',
    openedAt: '2026-10-20T11:42:00Z',
  },
  {
    id: 'log-002',
    accessId: 'acc-001',
    professionalName: 'Sarah Jenkins, Esq.',
    opened: 'Calendar (October 2026 parenting time)',
    openedAt: '2026-10-19T16:15:00Z',
  },
  {
    id: 'log-003',
    accessId: 'acc-001',
    professionalName: 'Sarah Jenkins, Esq.',
    opened: 'Documents (Parenting Agreement Final)',
    openedAt: '2026-10-17T09:05:00Z',
  },
  {
    id: 'log-004',
    accessId: 'acc-001',
    professionalName: 'Sarah Jenkins, Esq.',
    opened: 'Child info (Maya - Allergy action plan)',
    openedAt: '2026-10-16T14:20:00Z',
  },
  {
    id: 'log-005',
    accessId: 'acc-003',
    professionalName: 'Dr. Elena Rostova',
    opened: 'Child info (Maya & Leo developmental milestones)',
    openedAt: '2026-09-28T10:10:00Z',
  },
];

export const MOCK_CLIENT_ROSTER: ClientRosterItem[] = [
  {
    clientId: 'client-001',
    clientName: 'Alex Morgan',
    sharedSummary: 'Messages, Calendar, Documents',
    accessEndsAt: '2027-04-30',
    status: 'Active',
  },
  {
    clientId: 'client-002',
    clientName: 'Jordan Taylor',
    sharedSummary: 'Calendar, Expenses',
    accessEndsAt: '2027-02-28',
    status: 'Active',
  },
  {
    clientId: 'client-003',
    clientName: 'Riley Patel',
    sharedSummary: 'Child info',
    accessEndsAt: '2026-10-01',
    status: 'Ended',
  },
];

export const MOCK_SHARES: ProfessionalShare[] = [
  {
    id: 'sh-001',
    accessId: 'acc-001',
    itemType: 'Certified export',
    itemId: 'exp-q3-2026',
    itemTitle: 'Q3 Certified Message & Calendar Export',
    sharedByUserId: 'parent-001',
    sharedAt: '2026-10-16T10:00:00Z',
  },
];

export const MOCK_FORWARDED_MESSAGES: ForwardedMessage[] = [
  {
    id: 'fwd-001',
    accessId: 'acc-001',
    messageId: 'msg-101',
    subject: 'Exchange schedule confirmation',
    body: 'Forwarded communication regarding Sunday pickup location change at public library.',
    attachmentName: 'Pickup_Confirmation.pdf',
    note: 'Please note the last-minute change requested by co-parent.',
    sentAt: '2026-10-21T15:30:00Z',
    openedAt: '2026-10-22T09:12:00Z',
  },
  {
    id: 'fwd-002',
    accessId: 'acc-001',
    messageId: 'msg-102',
    subject: 'Summer camp registration cost',
    body: 'Co-parent response declining contribution toward agreed art camp fee.',
    attachmentName: null,
    note: 'Relevant for upcoming support and expense hearing.',
    sentAt: '2026-10-22T18:45:00Z',
    openedAt: null,
  },
];
