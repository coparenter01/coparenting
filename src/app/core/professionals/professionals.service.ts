import { computed, Injectable, signal } from '@angular/core';
import {
  MOCK_ACCESS_LOGS,
  MOCK_ACCESSES,
  MOCK_CLIENT_ROSTER,
  MOCK_FORWARDED_MESSAGES,
  MOCK_INVITES,
  MOCK_SHARES,
} from './professionals.mock';
import {
  PRO_ERR_01,
  PRO_ERR_04,
  PRO_ERR_05,
  PRO_ERR_07,
  PRO_ERR_08,
  PRO_ERR_09,
  PRO_ERR_10,
  PRO_ERR_11,
  type ClientRosterItem,
  type ForwardedMessage,
  type InviteProfessionalDto,
  type Professional,
  type ProfessionalAccess,
  type ProfessionalAccessLog,
  type ProfessionalInvite,
  type ProfessionalScope,
  type ProfessionalShare,
  type ProfessionalShareItemType,
  type SendForwardedMessageDto,
} from './professionals.types';
import { generateToken, validateInviteDto } from './professionals.utils';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalsService {
  readonly accesses = signal<ProfessionalAccess[]>(MOCK_ACCESSES);
  readonly invites = signal<ProfessionalInvite[]>(MOCK_INVITES);
  readonly accessLogs = signal<ProfessionalAccessLog[]>(MOCK_ACCESS_LOGS);
  readonly clientRoster = signal<ClientRosterItem[]>(MOCK_CLIENT_ROSTER);
  readonly shares = signal<ProfessionalShare[]>(MOCK_SHARES);
  readonly forwardedMessages = signal<ForwardedMessage[]>(MOCK_FORWARDED_MESSAGES);
  readonly currentPlan = signal<'Free' | 'Household'>('Household');

  readonly activeAccessesCount = computed(
    () =>
      this.accesses().filter(
        (a) => a.status === 'Active' || a.status === 'Invited' || a.status === 'Paused',
      ).length,
  );

  getAccessById(id: string): ProfessionalAccess | undefined {
    return this.accesses().find((a) => a.id === id);
  }

  inviteProfessional(dto: InviteProfessionalDto): {
    success: boolean;
    error?: string;
    accessId?: string;
  } {
    if (this.currentPlan() === 'Free') {
      return { success: false, error: PRO_ERR_01 };
    }

    const valErr = validateInviteDto(dto);
    if (valErr) {
      return { success: false, error: valErr };
    }

    if (this.activeAccessesCount() >= 5) {
      return { success: false, error: PRO_ERR_04 };
    }

    const emailLower = dto.email.trim().toLowerCase();
    const existing = this.invites().find(
      (inv) =>
        inv.email.toLowerCase() === emailLower &&
        (inv.status === 'Sent' || inv.status === 'Opened'),
    );
    if (existing) {
      return { success: false, error: PRO_ERR_05 };
    }

    return this.createInviteRecord(dto);
  }

  private createInviteRecord(dto: InviteProfessionalDto): { success: boolean; accessId: string } {
    const proId = `pro-${String(Date.now()).slice(-4)}`;
    const accessId = `acc-${String(Date.now()).slice(-4)}`;
    const inviteId = `inv-${String(Date.now()).slice(-4)}`;
    const token = generateToken();

    const newPro: Professional = {
      id: proId,
      userId: null,
      name: dto.name,
      email: dto.email,
      type: dto.type,
      organization: dto.organization,
      twoFactorVerified: false,
      termsAcceptedAt: null,
      createdAt: new Date().toISOString(),
    };

    const newAccess: ProfessionalAccess = {
      id: accessId,
      householdId: 'hh-001',
      parentId: 'parent-001',
      professionalId: proId,
      professional: newPro,
      status: 'Invited',
      scope: { ...dto.scope },
      accessEndsAt: dto.accessEndsAt,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newInvite: ProfessionalInvite = {
      id: inviteId,
      accessId,
      parentId: 'parent-001',
      email: dto.email,
      token,
      status: 'Sent',
      note: dto.note,
      expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
      createdAt: new Date().toISOString(),
    };

    this.accesses.update((list) => [newAccess, ...list]);
    this.invites.update((list) => [newInvite, ...list]);
    return { success: true, accessId };
  }

  updateAccessScope(
    accessId: string,
    scope: ProfessionalScope,
    accessEndsAt: string,
  ): { success: boolean; error?: string } {
    const todayStr = new Date().toISOString().slice(0, 10);
    if (accessEndsAt < todayStr) {
      return { success: false, error: PRO_ERR_09 };
    }
    if (scope.dateRangeStart && scope.dateRangeEnd && scope.dateRangeStart > scope.dateRangeEnd) {
      return { success: false, error: PRO_ERR_10 };
    }

    this.accesses.update((list) =>
      list.map((item) =>
        item.id === accessId
          ? {
              ...item,
              scope: { ...scope },
              accessEndsAt,
              updatedAt: new Date().toISOString(),
            }
          : item,
      ),
    );
    return { success: true };
  }

  endAccess(accessId: string): { success: boolean; error?: string } {
    this.accesses.update((list) =>
      list.map((item) =>
        item.id === accessId
          ? {
              ...item,
              status: 'Ended',
              updatedAt: new Date().toISOString(),
            }
          : item,
      ),
    );
    return { success: true };
  }

  shareItem(
    accessId: string,
    itemType: ProfessionalShareItemType,
    itemId: string,
    itemTitle: string,
  ): { success: boolean; error?: string } {
    const access = this.getAccessById(accessId);
    if (access?.status !== 'Active') {
      return { success: false, error: PRO_ERR_11 };
    }

    const share: ProfessionalShare = {
      id: `sh-${String(Date.now()).slice(-4)}`,
      accessId,
      itemType,
      itemId,
      itemTitle,
      sharedByUserId: 'parent-001',
      sharedAt: new Date().toISOString(),
    };

    this.shares.update((list) => [share, ...list]);
    this.logAccess(accessId, `${itemType}: ${itemTitle}`);
    return { success: true };
  }

  acceptInvite(
    token: string,
    proData: { name: string; email: string },
  ): { success: boolean; error?: string } {
    const invite = this.invites().find((inv) => inv.token === token);
    if (!invite || invite.status === 'Cancelled' || invite.status === 'Expired') {
      return { success: false, error: PRO_ERR_07 };
    }

    this.invites.update((list) =>
      list.map((inv) =>
        inv.token === token
          ? { ...inv, status: 'Accepted', acceptedAt: new Date().toISOString() }
          : inv,
      ),
    );

    this.accesses.update((list) =>
      list.map((acc) =>
        acc.id === invite.accessId
          ? {
              ...acc,
              status: 'Active',
              professional: {
                ...acc.professional,
                name: proData.name,
                twoFactorVerified: true,
                termsAcceptedAt: new Date().toISOString(),
              },
              updatedAt: new Date().toISOString(),
            }
          : acc,
      ),
    );

    return { success: true };
  }

  sendForwardedMessage(dto: SendForwardedMessageDto): { success: boolean; error?: string } {
    const access = this.getAccessById(dto.accessId);
    if (access?.status !== 'Active') {
      return { success: false, error: PRO_ERR_11 };
    }
    if ((dto.note?.length ?? 0) > 500) {
      return { success: false, error: PRO_ERR_08 };
    }

    const forward: ForwardedMessage = {
      id: `fwd-${String(Date.now()).slice(-4)}`,
      accessId: dto.accessId,
      messageId: `msg-${String(Date.now()).slice(-4)}`,
      subject: dto.subject,
      body: dto.body,
      note: dto.note,
      attachmentName: dto.attachmentName,
      sentAt: new Date().toISOString(),
      openedAt: null,
    };

    this.forwardedMessages.update((list) => [forward, ...list]);
    return { success: true };
  }

  markMessageOpened(messageId: string): void {
    this.forwardedMessages.update((list) =>
      list.map((msg) =>
        msg.id === messageId && !msg.openedAt
          ? { ...msg, openedAt: new Date().toISOString() }
          : msg,
      ),
    );
  }

  logAccess(accessId: string, opened: string): void {
    const access = this.getAccessById(accessId);
    const entry: ProfessionalAccessLog = {
      id: `log-${String(Date.now()).slice(-4)}`,
      accessId,
      professionalName: access ? access.professional.name : 'Professional',
      opened,
      openedAt: new Date().toISOString(),
    };
    this.accessLogs.update((list) => [entry, ...list]);
  }
}
