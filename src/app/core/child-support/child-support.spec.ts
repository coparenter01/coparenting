import { beforeEach, describe, expect, it } from 'vitest';
import { ChildSupportService } from './child-support.service';
import {
  buildHearingPacket,
  formatCentsToUsd,
  generateVerificationRecordId,
  isCaseDataStale,
  matchAgencyAndAppPayments,
} from './child-support.utils';
import type { AgencyPaymentItem, AppPaymentItem, ChildSupportCase } from './child-support.types';

describe('Child Support Utilities', () => {
  it('formats cents to USD correctly', () => {
    expect(formatCentsToUsd(45000)).toBe('$450.00');
    expect(formatCentsToUsd(50)).toBe('$0.50');
    expect(formatCentsToUsd(0)).toBe('$0.00');
    expect(formatCentsToUsd(-12500)).toBe('-$125.00');
  });

  it('identifies stale case data (> 2 days)', () => {
    const now = Date.now();
    const fresh = new Date(now - 12 * 3600 * 1000).toISOString();
    const stale = new Date(now - 3 * 86400 * 1000).toISOString();
    expect(isCaseDataStale(fresh, now)).toBe(false);
    expect(isCaseDataStale(stale, now)).toBe(true);
  });

  it('generates compliant verification record ID', () => {
    const id = generateVerificationRecordId();
    expect(id).toMatch(/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
  });

  it('matches agency and app payments correctly with 5-day tolerance', () => {
    const agency: AgencyPaymentItem[] = [
      {
        paymentId: 'ag-1',
        caseId: 'c1',
        agencyReference: 'REF1',
        paymentDate: '2026-10-15',
        amountCents: 35000,
        source: 'api',
        status: 'disbursed',
        syncedAt: '2026-10-15T10:00:00Z',
      },
      {
        paymentId: 'ag-2',
        caseId: 'c1',
        agencyReference: 'REF2',
        paymentDate: '2026-09-15',
        amountCents: 45000,
        source: 'api',
        status: 'disbursed',
        syncedAt: '2026-09-15T10:00:00Z',
      },
    ];

    const app: AppPaymentItem[] = [
      {
        paymentId: 'app-1',
        paymentDate: '2026-10-14', // within 1 day, same amount -> matched
        amountCents: 35000,
        description: 'Oct payment',
      },
      {
        paymentId: 'app-2',
        paymentDate: '2026-09-15', // same date, different amount -> amounts_differ
        amountCents: 40000,
        description: 'Sep payment with difference',
      },
      {
        paymentId: 'app-3',
        paymentDate: '2026-08-01', // not on agency
        amountCents: 15000,
        description: 'Aug direct extra',
      },
    ];

    const results = matchAgencyAndAppPayments(agency, app);
    expect(results.length).toBe(3);

    const match1 = results.find((r) => r.date === '2026-10-14');
    expect(match1?.status).toBe('matched');

    const match2 = results.find((r) => r.date === '2026-09-15');
    expect(match2?.status).toBe('amounts_differ');

    const match3 = results.find((r) => r.date === '2026-08-01');
    expect(match3?.status).toBe('not_on_agency');
  });

  it('builds court hearing packet with formatted currency', () => {
    const testCase: ChildSupportCase = {
      caseId: 'c1',
      householdId: 'h1',
      userId: 'u1',
      agencyCaseNumber: 'CS-TEST-1234',
      state: 'VA',
      status: 'active',
      monthlyOrderCents: 50000,
      balanceOwedCents: 10000,
      arrearsBalanceCents: 200000,
      lastPaymentDate: '2026-10-10',
      lastPaymentAmountCents: 50000,
      nextHearingDate: '2026-11-20T10:00:00Z',
      lastSyncedAt: new Date().toISOString(),
      syncSource: 'api',
      familyViolenceFlag: false,
      safetyModeOffered: false,
      unlinkedAt: null,
      purgeAt: null,
    };

    const packet = buildHearingPacket(testCase);
    expect(packet.caseNumber).toBe('CS-TEST-1234');
    expect(packet.monthlyOrderFormatted).toBe('$500.00');
    expect(packet.arrearsFormatted).toBe('$2,000.00');
    expect(packet.verificationRecordId).toMatch(
      /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/,
    );
  });
});

describe('ChildSupportService', () => {
  let service: ChildSupportService;

  beforeEach(() => {
    service = new ChildSupportService();
  });

  it('initializes with default mock case and active status', () => {
    expect(service.isLinked()).toBe(true);
    expect(service.currentCase()?.agencyCaseNumber).toBe('CS-VA-994218');
  });

  it('supports linking a new case and confirming consent', async () => {
    await service.linkCase({
      state: 'TX',
      agencyCaseNumber: 'CS-TX-7788',
      legalFirstName: 'Jane',
      legalLastName: 'Doe',
      dateOfBirth: '1988-04-12',
      oneTimeCode: '123456',
    });

    expect(service.currentCase()?.status).toBe('pending_consent');
    expect(service.isLinked()).toBe(false);

    await service.confirmConsent();
    expect(service.currentCase()?.status).toBe('active');
    expect(service.isLinked()).toBe(true);
  });

  it('unlinks a case and sets 30-day purge timestamp', async () => {
    await service.unlinkCase();
    expect(service.currentCase()?.status).toBe('unlinked');
    expect(service.currentCase()?.unlinkedAt).toBeTruthy();
    expect(service.currentCase()?.purgeAt).toBeTruthy();
    expect(service.isLinked()).toBe(false);
  });

  it('allows dismissing a mismatch flag with explanation', () => {
    const matches = service.paymentMatches();
    expect(matches.length).toBeGreaterThan(0);
    const target = matches[0];
    if (target) {
      service.dismissMatchFlag(target.matchId, 'Reconciled via check stub');
      const updated = service.paymentMatches().find((m) => m.matchId === target.matchId);
      expect(updated?.flagDismissed).toBe(true);
      expect(updated?.dismissedReason).toBe('Reconciled via check stub');
    }
  });

  it('shares an agency item and submits direct payment proof', async () => {
    const shared = await service.shareItem('hearing', 'hear-01', 'Hearing Notice', { room: '3B' });
    expect(shared.title).toBe('Hearing Notice');
    expect(service.sharedItems()[0]?.title).toBe('Hearing Notice');

    const proof = await service.submitProof({
      paymentDate: '2026-10-21',
      amountCents: 45000,
      paymentMethod: 'cashiers_check',
      referenceNumber: 'CHK-9011',
      fileUrl: '/docs/chk-9011.pdf',
    });
    expect(proof.status).toBe('submitted');
    expect(proof.verificationRecordId).toBeTruthy();
  });
});
