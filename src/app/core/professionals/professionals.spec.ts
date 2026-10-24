import { beforeEach, describe, expect, it } from 'vitest';
import { ProfessionalsService } from './professionals.service';
import {
  PRO_ERR_01,
  PRO_ERR_02,
  PRO_ERR_04,
  PRO_ERR_05,
  PRO_ERR_07,
  PRO_ERR_08,
  PRO_ERR_09,
  PRO_ERR_10,
  PRO_ERR_11,
  proErr03,
  type InviteProfessionalDto,
  type ProfessionalAccess,
} from './professionals.types';
import {
  formatScopeSummary,
  isAccessActive,
  isValidEmail,
  validateInviteDto,
} from './professionals.utils';

describe('Professionals Utilities', () => {
  it('validates email format correctly', () => {
    expect(isValidEmail('attorney@law.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('name@')).toBe(false);
  });

  it('validates invite DTO for required fields and lengths', () => {
    const validDto: InviteProfessionalDto = {
      name: 'Sarah Jenkins',
      email: 'sarah@example.com',
      type: 'Attorney',
      organization: 'Legal Corp',
      note: 'Case notes',
      scope: {
        messages: true,
        calendar: true,
        expenses: false,
        childInfo: true,
        documents: false,
        contactAttempts: false,
      },
      accessEndsAt: '2027-12-31',
    };

    expect(validateInviteDto(validDto)).toBeNull();

    expect(validateInviteDto({ ...validDto, name: '' })).toBe(proErr03('name'));
    expect(validateInviteDto({ ...validDto, email: 'bad' })).toBe(PRO_ERR_02);
    expect(
      validateInviteDto({
        ...validDto,
        note: 'a'.repeat(501),
      }),
    ).toBe(PRO_ERR_08);
    expect(
      validateInviteDto({
        ...validDto,
        accessEndsAt: '2020-01-01',
      }),
    ).toBe(PRO_ERR_09);
    expect(
      validateInviteDto({
        ...validDto,
        scope: {
          ...validDto.scope,
          dateRangeStart: '2027-05-01',
          dateRangeEnd: '2027-01-01',
        },
      }),
    ).toBe(PRO_ERR_10);
  });

  it('formats scope summary concisely', () => {
    expect(
      formatScopeSummary({
        messages: true,
        calendar: true,
        expenses: false,
        childInfo: false,
        documents: true,
        contactAttempts: false,
      }),
    ).toBe('Messages, Calendar, Documents');

    expect(
      formatScopeSummary({
        messages: false,
        calendar: false,
        expenses: false,
        childInfo: false,
        documents: false,
        contactAttempts: false,
      }),
    ).toBe('No categories selected');
  });

  it('evaluates whether access is currently active', () => {
    const access: ProfessionalAccess = {
      id: 'acc-test',
      householdId: 'hh-1',
      parentId: 'p-1',
      professionalId: 'pro-1',
      professional: {
        id: 'pro-1',
        userId: null,
        name: 'Attorney',
        email: 'pro@test.com',
        type: 'Attorney',
        twoFactorVerified: true,
        termsAcceptedAt: null,
        createdAt: '2026-01-01',
      },
      status: 'Active',
      scope: {
        messages: true,
        calendar: true,
        expenses: true,
        childInfo: true,
        documents: true,
        contactAttempts: true,
      },
      accessEndsAt: '2027-12-31',
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
    };

    expect(isAccessActive(access)).toBe(true);
    expect(isAccessActive({ ...access, status: 'Paused' })).toBe(false);
    expect(isAccessActive({ ...access, status: 'Ended' })).toBe(false);
    expect(isAccessActive({ ...access, accessEndsAt: '2020-01-01' })).toBe(false);
  });
});

describe('ProfessionalsService', () => {
  let service: ProfessionalsService;

  beforeEach(() => {
    service = new ProfessionalsService();
  });

  it('refuses invite if household is on Free core plan (ERR-01)', () => {
    service.currentPlan.set('Free');
    const res = service.inviteProfessional({
      name: 'Test Pro',
      email: 'test@example.com',
      type: 'Attorney',
      scope: {
        messages: true,
        calendar: false,
        expenses: false,
        childInfo: false,
        documents: false,
        contactAttempts: false,
      },
      accessEndsAt: '2027-12-31',
    });

    expect(res.success).toBe(false);
    expect(res.error).toBe(PRO_ERR_01);
  });

  it('invites professional and adds to reactive signals on Household plan', () => {
    const initialCount = service.accesses().length;
    const res = service.inviteProfessional({
      name: 'Attorney Jane',
      email: 'jane@example.com',
      type: 'Attorney',
      scope: {
        messages: true,
        calendar: true,
        expenses: false,
        childInfo: false,
        documents: false,
        contactAttempts: false,
      },
      accessEndsAt: '2027-12-31',
    });

    expect(res.success).toBe(true);
    expect(service.accesses().length).toBe(initialCount + 1);
    expect(service.accesses()[0]?.professional.name).toBe('Attorney Jane');
    expect(service.accesses()[0]?.status).toBe('Invited');
  });

  it('refuses invite when parent reaches 5 professionals limit (ERR-04)', () => {
    service.inviteProfessional({
      name: 'Pro 4',
      email: 'pro4@example.com',
      type: 'Attorney',
      scope: {
        messages: true,
        calendar: false,
        expenses: false,
        childInfo: false,
        documents: false,
        contactAttempts: false,
      },
      accessEndsAt: '2027-12-31',
    });
    service.inviteProfessional({
      name: 'Pro 5',
      email: 'pro5@example.com',
      type: 'Mediator',
      scope: {
        messages: true,
        calendar: false,
        expenses: false,
        childInfo: false,
        documents: false,
        contactAttempts: false,
      },
      accessEndsAt: '2027-12-31',
    });
    service.inviteProfessional({
      name: 'Pro 6',
      email: 'pro6@example.com',
      type: 'Therapist',
      scope: {
        messages: true,
        calendar: false,
        expenses: false,
        childInfo: false,
        documents: false,
        contactAttempts: false,
      },
      accessEndsAt: '2027-12-31',
    });

    const sixth = service.inviteProfessional({
      name: 'Sixth Pro',
      email: 'sixth@example.com',
      type: 'Attorney',
      scope: {
        messages: true,
        calendar: false,
        expenses: false,
        childInfo: false,
        documents: false,
        contactAttempts: false,
      },
      accessEndsAt: '2027-12-31',
    });
    expect(sixth.success).toBe(false);
    expect(sixth.error).toBe(PRO_ERR_04);
  });

  it('refuses duplicate open invite to the same email (ERR-05)', () => {
    const existingEmail = service.invites()[0]?.email ?? 'dvance@accordmediation.example.com';
    const res = service.inviteProfessional({
      name: 'Duplicate David',
      email: existingEmail,
      type: 'Mediator',
      scope: {
        messages: true,
        calendar: false,
        expenses: false,
        childInfo: false,
        documents: false,
        contactAttempts: false,
      },
      accessEndsAt: '2027-12-31',
    });

    expect(res.success).toBe(false);
    expect(res.error).toBe(PRO_ERR_05);
  });

  it('updates access scope and handles invalid end dates', () => {
    const accessId = service.accesses()[0]?.id ?? 'acc-001';
    const badEnd = service.updateAccessScope(
      accessId,
      {
        messages: true,
        calendar: false,
        expenses: false,
        childInfo: false,
        documents: false,
        contactAttempts: false,
      },
      '2020-01-01',
    );
    expect(badEnd.success).toBe(false);
    expect(badEnd.error).toBe(PRO_ERR_09);

    const good = service.updateAccessScope(
      accessId,
      {
        messages: false,
        calendar: true,
        expenses: true,
        childInfo: false,
        documents: false,
        contactAttempts: false,
      },
      '2027-08-31',
    );
    expect(good.success).toBe(true);
    const updated = service.getAccessById(accessId);
    expect(updated?.accessEndsAt).toBe('2027-08-31');
    expect(updated?.scope.calendar).toBe(true);
    expect(updated?.scope.messages).toBe(false);
  });

  it('ends access and sets status to Ended', () => {
    const accessId = 'acc-001';
    const res = service.endAccess(accessId);
    expect(res.success).toBe(true);
    expect(service.getAccessById(accessId)?.status).toBe('Ended');
  });

  it('shares item with Active professional and logs access without copying content', () => {
    const activeAccessId = 'acc-001';
    const res = service.shareItem(activeAccessId, 'Document', 'doc-101', 'Custody Order 2026');
    expect(res.success).toBe(true);
    expect(service.shares().length).toBeGreaterThan(1);
    expect(service.accessLogs()[0]?.opened).toContain('Custody Order 2026');
  });

  it('refuses sharing item with non-active professional (ERR-11)', () => {
    const endedAccessId = 'acc-003';
    const res = service.shareItem(endedAccessId, 'Document', 'doc-102', 'Past Order');
    expect(res.success).toBe(false);
    expect(res.error).toBe(PRO_ERR_11);
  });

  it('accepts invite token and activates professional account with 2FA verified', () => {
    const token = 'inv_token_david_vance_2026';
    const res = service.acceptInvite(token, {
      name: 'David Vance',
      email: 'dvance@accordmediation.example.com',
    });
    expect(res.success).toBe(true);
    const acceptedAcc = service.getAccessById('acc-002');
    expect(acceptedAcc?.status).toBe('Active');
    expect(acceptedAcc?.professional.twoFactorVerified).toBe(true);
  });

  it('refuses accept with invalid token (ERR-07)', () => {
    const res = service.acceptInvite('invalid_token', {
      name: 'Nobody',
      email: 'nobody@example.com',
    });
    expect(res.success).toBe(false);
    expect(res.error).toBe(PRO_ERR_07);
  });

  it('sends forwarded private message copy and marks opened', () => {
    const res = service.sendForwardedMessage({
      accessId: 'acc-001',
      subject: 'Hearing evidence item',
      body: 'Single message copy sent to attorney',
      note: 'Short note',
      attachmentName: 'receipt.pdf',
    });
    expect(res.success).toBe(true);
    const msg = service.forwardedMessages()[0];
    expect(msg?.subject).toBe('Hearing evidence item');
    expect(msg?.openedAt).toBeNull();

    if (msg) {
      service.markMessageOpened(msg.id);
      const after = service.forwardedMessages().find((m) => m.id === msg.id);
      expect(after?.openedAt).not.toBeNull();
    }
  });
});
