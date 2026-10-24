import { computed, Injectable, signal } from '@angular/core';
import type {
  AgencyHearingItem,
  AgencyPaymentItem,
  AppPaymentItem,
  ChildSupportCase,
  DueDateReminderConfig,
  HearingPacketData,
  LinkCaseForm,
  OperationsSyncLogEntry,
  PaymentMatchRow,
  ProofSubmissionItem,
  SharedAgencyItem,
  SubmitProofRequest,
  TimelineEvent,
} from './child-support.types';
import {
  MOCK_AGENCY_PAYMENTS,
  MOCK_APP_PAYMENTS,
  MOCK_CHILD_SUPPORT_CASE,
  MOCK_DEFAULT_REMINDERS,
  MOCK_HEARINGS,
  MOCK_OPERATIONS_SYNC_LOGS,
  MOCK_PROOF_SUBMISSIONS,
  MOCK_SHARED_ITEMS,
  MOCK_TIMELINE_EVENTS,
} from './child-support.mock';
import {
  buildHearingPacket,
  generateVerificationRecordId,
  isCaseDataStale,
  matchAgencyAndAppPayments,
} from './child-support.utils';

@Injectable({ providedIn: 'root' })
export class ChildSupportService {
  private readonly caseSignal = signal<ChildSupportCase | null>(MOCK_CHILD_SUPPORT_CASE);
  private readonly agencyPaymentsSignal = signal<AgencyPaymentItem[]>(MOCK_AGENCY_PAYMENTS);
  private readonly appPaymentsSignal = signal<AppPaymentItem[]>(MOCK_APP_PAYMENTS);
  private readonly hearingsSignal = signal<AgencyHearingItem[]>(MOCK_HEARINGS);
  private readonly sharedItemsSignal = signal<SharedAgencyItem[]>(MOCK_SHARED_ITEMS);
  private readonly proofSubmissionsSignal = signal<ProofSubmissionItem[]>(MOCK_PROOF_SUBMISSIONS);
  private readonly remindersSignal = signal<DueDateReminderConfig>(MOCK_DEFAULT_REMINDERS);
  private readonly operationsLogsSignal =
    signal<OperationsSyncLogEntry[]>(MOCK_OPERATIONS_SYNC_LOGS);
  private readonly timelineSignal = signal<TimelineEvent[]>(MOCK_TIMELINE_EVENTS);
  private readonly isSyncingSignal = signal<boolean>(false);
  private readonly dismissedMatchIdsSignal = signal<Map<string, string>>(new Map());

  public readonly currentCase = this.caseSignal.asReadonly();
  public readonly agencyPayments = this.agencyPaymentsSignal.asReadonly();
  public readonly appPayments = this.appPaymentsSignal.asReadonly();
  public readonly hearings = this.hearingsSignal.asReadonly();
  public readonly sharedItems = this.sharedItemsSignal.asReadonly();
  public readonly proofSubmissions = this.proofSubmissionsSignal.asReadonly();
  public readonly reminders = this.remindersSignal.asReadonly();
  public readonly operationsLogs = this.operationsLogsSignal.asReadonly();
  public readonly timeline = this.timelineSignal.asReadonly();
  public readonly isSyncing = this.isSyncingSignal.asReadonly();

  public readonly isLinked = computed(() => {
    const c = this.caseSignal();
    return c !== null && c.status === 'active';
  });

  public readonly isOutOfDate = computed(() => {
    const c = this.caseSignal();
    return c ? isCaseDataStale(c.lastSyncedAt) : false;
  });

  public readonly paymentMatches = computed<PaymentMatchRow[]>(() => {
    const rows = matchAgencyAndAppPayments(this.agencyPaymentsSignal(), this.appPaymentsSignal());
    const dismissed = this.dismissedMatchIdsSignal();
    return rows.map((r) => {
      const reason = dismissed.get(r.matchId);
      if (reason) {
        return { ...r, flagDismissed: true, dismissedReason: reason };
      }
      return r;
    });
  });

  public readonly upcomingHearings = computed(() =>
    this.hearingsSignal().filter((h) => h.status === 'scheduled'),
  );

  public readonly unmatchedCount = computed(
    () => this.paymentMatches().filter((m) => m.status !== 'matched' && !m.flagDismissed).length,
  );

  public linkCase(form: LinkCaseForm): Promise<ChildSupportCase> {
    const newCase: ChildSupportCase = {
      caseId: `case-${String(Date.now())}`,
      householdId: 'hh-sample-01',
      userId: 'user-001',
      agencyCaseNumber: form.agencyCaseNumber,
      state: form.state,
      status: 'pending_consent',
      monthlyOrderCents: 45000,
      balanceOwedCents: 0,
      arrearsBalanceCents: 0,
      lastPaymentDate: null,
      lastPaymentAmountCents: 0,
      nextHearingDate: null,
      lastSyncedAt: new Date().toISOString(),
      syncSource: 'api',
      familyViolenceFlag: false,
      safetyModeOffered: false,
      unlinkedAt: null,
      purgeAt: null,
    };
    this.caseSignal.set(newCase);
    return Promise.resolve(newCase);
  }

  public confirmConsent(): Promise<void> {
    const c = this.caseSignal();
    if (c) {
      this.caseSignal.set({ ...c, status: 'active' });
    }
    return Promise.resolve();
  }

  public unlinkCase(): Promise<void> {
    const c = this.caseSignal();
    if (c) {
      const now = new Date();
      const purge = new Date(now.getTime() + 30 * 86400 * 1000);
      this.caseSignal.set({
        ...c,
        status: 'unlinked',
        unlinkedAt: now.toISOString(),
        purgeAt: purge.toISOString(),
      });
    }
    return Promise.resolve();
  }

  public triggerSync(): Promise<void> {
    this.isSyncingSignal.set(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const c = this.caseSignal();
        if (c) {
          this.caseSignal.set({
            ...c,
            lastSyncedAt: new Date().toISOString(),
          });
        }
        this.isSyncingSignal.set(false);
        resolve();
      }, 50);
    });
  }

  public dismissMatchFlag(matchId: string, reason: string): void {
    const updated = new Map(this.dismissedMatchIdsSignal());
    updated.set(matchId, reason);
    this.dismissedMatchIdsSignal.set(updated);
  }

  public updateReminders(config: Partial<DueDateReminderConfig>): void {
    this.remindersSignal.set({
      ...this.remindersSignal(),
      ...config,
    });
  }

  public shareItem(
    itemType: SharedAgencyItem['itemType'],
    itemId: string,
    title: string,
    details: Record<string, unknown>,
  ): Promise<SharedAgencyItem> {
    const current = this.caseSignal();
    const caseId = current ? current.caseId : 'case-va-001';
    const newShare: SharedAgencyItem = {
      shareId: `share-${String(Date.now())}`,
      caseId,
      sharedByUserId: 'user-001',
      sharedByName: 'You',
      itemType,
      itemId,
      title,
      sharedDetails: details,
      sharedAt: new Date().toISOString(),
    };
    this.sharedItemsSignal.set([newShare, ...this.sharedItemsSignal()]);
    return Promise.resolve(newShare);
  }

  public submitProof(req: SubmitProofRequest): Promise<ProofSubmissionItem> {
    const current = this.caseSignal();
    const newSubmission: ProofSubmissionItem = {
      submissionId: `sub-${String(Date.now())}`,
      caseId: current ? current.caseId : 'case-va-001',
      submittedByUserId: 'user-001',
      paymentDate: req.paymentDate,
      amountCents: req.amountCents,
      paymentMethod: req.paymentMethod,
      referenceNumber: req.referenceNumber,
      fileUrl: req.fileUrl,
      verificationRecordId: generateVerificationRecordId(),
      status: 'submitted',
      createdAt: new Date().toISOString(),
    };
    this.proofSubmissionsSignal.set([newSubmission, ...this.proofSubmissionsSignal()]);
    return Promise.resolve(newSubmission);
  }

  public decideSafetyOffer(accept: boolean): Promise<void> {
    const c = this.caseSignal();
    if (c) {
      this.caseSignal.set({ ...c, safetyModeOffered: true });
    }
    return Promise.resolve(accept ? undefined : undefined);
  }

  public sendAgencyInvite(recipientContact: string, docketNoticeNumber: string): Promise<void> {
    if (!recipientContact || !docketNoticeNumber) {
      return Promise.reject(new Error('Recipient and docket notice are required'));
    }
    return Promise.resolve();
  }

  public generateHearingPacket(): HearingPacketData | null {
    const c = this.caseSignal();
    if (!c) return null;
    return buildHearingPacket(c);
  }
}
