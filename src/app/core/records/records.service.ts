import { computed, inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@core/auth/auth.service';
import { HouseholdService } from '@core/household/household.service';
import {
  MOCK_AFFIDAVIT_REQUESTS,
  MOCK_DELETION_REQUESTS,
  MOCK_EXPORTS,
  MOCK_JOURNAL_ENTRIES,
  MOCK_LEGAL_HOLDS,
  MOCK_SUBPOENA_REQUESTS,
} from './records.mock';
import type {
  AffidavitDelivery,
  AffidavitRequestItem,
  AffidavitStatus,
  DeletionRequestItem,
  ExportFormat,
  ExportItem,
  JournalEntry,
  JournalType,
  LegalContentItem,
  LegalHoldItem,
  RecordTypeOption,
  SubpoenaRequestItem,
  VerificationLookupResult,
} from './records.types';
import {
  buildAffidavitRequest,
  buildExportItem,
  buildJournalEntry,
  checkVerificationRateLimit,
  DEFAULT_COURT_NOTES,
  DEFAULT_MODEL_ORDER_CLAUSES,
  DEFAULT_RETENTION_SECTIONS,
  isValidRecordId,
  recordFailedLookup,
  validateExportDates,
} from './records.utils';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  private readonly snackBar = inject(MatSnackBar);
  private readonly auth = inject(AuthService);
  private readonly household = inject(HouseholdService);

  readonly exports = signal<ExportItem[]>(MOCK_EXPORTS);
  readonly journalEntries = signal<JournalEntry[]>(MOCK_JOURNAL_ENTRIES);
  readonly affidavitRequests = signal<AffidavitRequestItem[]>(MOCK_AFFIDAVIT_REQUESTS);
  readonly deletionRequests = signal<DeletionRequestItem[]>(MOCK_DELETION_REQUESTS);
  readonly legalHolds = signal<LegalHoldItem[]>(MOCK_LEGAL_HOLDS);
  readonly subpoenaRequests = signal<SubpoenaRequestItem[]>(MOCK_SUBPOENA_REQUESTS);

  readonly courtNotes = signal<LegalContentItem[]>(DEFAULT_COURT_NOTES);
  readonly modelOrderClauses = signal<LegalContentItem[]>(DEFAULT_MODEL_ORDER_CLAUSES);
  readonly retentionSections = signal<LegalContentItem[]>(DEFAULT_RETENTION_SECTIONS);

  readonly activeLegalHold = computed(() => {
    return this.legalHolds().find((h) => h.status === 'on') ?? null;
  });

  private readonly lookupHistory = new Map<string, number[]>();

  private toast(msg: string): void {
    this.snackBar.open(msg, 'OK', { duration: 3000 });
  }

  async createExport(params: {
    format: ExportFormat;
    recordTypes: RecordTypeOption[];
    dateFrom: string;
    dateTo: string;
  }): Promise<ExportItem> {
    await Promise.resolve();
    const dateErr = validateExportDates(params.dateFrom, params.dateTo);
    if (dateErr) throw new Error(dateErr);
    if (!params.recordTypes.length) {
      throw new Error('Please select at least one record type to include in your export.');
    }

    const currentUserId = this.auth.user()?.id ?? 'usr-parent-a';
    const householdId = this.household.currentHousehold()?.id ?? 'hh-001';
    const newExport = buildExportItem(params, currentUserId, householdId);

    this.exports.update((items) => [newExport, ...items]);
    this.toast('Your export is ready to download.');
    return newExport;
  }

  async verifyRecord(recordId: string, file?: File): Promise<VerificationLookupResult> {
    await Promise.resolve();
    const clientKey = 'client-browser-session';
    const nowTs = String(Date.now());
    if (checkVerificationRateLimit(clientKey, this.lookupHistory)) {
      return {
        lookupId: `lk-${nowTs}`,
        recordId,
        result: 'rate_limited',
        checkedAt: new Date().toISOString(),
      };
    }

    if (!isValidRecordId(recordId)) {
      recordFailedLookup(clientKey, this.lookupHistory);
      return {
        lookupId: `lk-${nowTs}`,
        recordId,
        result: 'not_found',
        checkedAt: new Date().toISOString(),
      };
    }

    const matched = this.exports().find(
      (e) => e.recordId?.toUpperCase() === recordId.trim().toUpperCase(),
    );

    if (!matched) {
      recordFailedLookup(clientKey, this.lookupHistory);
      return {
        lookupId: `lk-${nowTs}`,
        recordId,
        result: 'not_found',
        checkedAt: new Date().toISOString(),
      };
    }

    const isSame = !file || !(file.size % 2 !== 0 && file.name.includes('tampered'));
    return {
      lookupId: `lk-${nowTs}`,
      recordId,
      result: file ? (isSame ? 'file_matches' : 'file_does_not_match') : 'valid',
      checkedAt: new Date().toISOString(),
      exportItem: matched,
      matchDetails: { isSameFile: isSame, pageCountMatch: isSame, fingerprintMatch: isSame },
    };
  }

  async addJournalEntry(params: {
    entryType: JournalType;
    title: string;
    happenedAt: string;
    details: string;
    children?: string[];
    files?: File[];
  }): Promise<JournalEntry> {
    await Promise.resolve();
    if (!params.title.trim()) throw new Error('Title is required.');
    if (params.title.length > 100) throw new Error('Title cannot exceed 100 characters.');
    if (!params.details.trim()) throw new Error('Details are required.');
    if (params.details.length > 5000) throw new Error('Details cannot exceed 5,000 characters.');

    const now = new Date();
    if (new Date(params.happenedAt) > now) {
      throw new Error('The date and time cannot be in the future.');
    }

    const currentUserId = this.auth.user()?.id ?? 'usr-parent-a';
    const householdId = this.household.currentHousehold()?.id ?? 'hh-001';
    const newEntry = buildJournalEntry(params, currentUserId, householdId);

    this.journalEntries.update((entries) => [newEntry, ...entries]);
    this.toast('Journal entry saved.');
    return newEntry;
  }

  async updateJournalEntry(
    entryId: string,
    updates: { title: string; happenedAt: string; details: string },
  ): Promise<JournalEntry> {
    await Promise.resolve();
    const existing = this.journalEntries().find((e) => e.entryId === entryId);
    if (!existing) throw new Error('Journal entry not found.');
    if (existing.status === 'voided') {
      throw new Error('This entry was voided and cannot be edited.');
    }

    const currentUserId = this.auth.user()?.id ?? 'usr-parent-a';
    const nextVersionNum = existing.versions.length + 1;

    const newVersion = {
      versionId: `ver-${entryId}-${String(nextVersionNum)}`,
      entryId,
      versionNumber: nextVersionNum,
      title: updates.title.trim(),
      details: updates.details.trim(),
      happenedAt: updates.happenedAt,
      createdAt: new Date().toISOString(),
      createdByUserId: currentUserId,
      deviceType: 'web',
    };

    const updated: JournalEntry = {
      ...existing,
      title: updates.title.trim(),
      details: updates.details.trim(),
      happenedAt: updates.happenedAt,
      versions: [newVersion, ...existing.versions],
      updatedAt: new Date().toISOString(),
    };

    this.journalEntries.update((list) => list.map((e) => (e.entryId === entryId ? updated : e)));
    this.toast('Journal entry updated.');
    return updated;
  }

  async voidJournalEntry(entryId: string): Promise<JournalEntry> {
    await Promise.resolve();
    const existing = this.journalEntries().find((e) => e.entryId === entryId);
    if (!existing) throw new Error('Journal entry not found.');

    const voided: JournalEntry = {
      ...existing,
      status: 'voided',
      updatedAt: new Date().toISOString(),
    };

    this.journalEntries.update((list) => list.map((e) => (e.entryId === entryId ? voided : e)));
    this.toast('Journal entry marked as voided.');
    return voided;
  }

  async requestAffidavit(params: {
    recordId: string;
    delivery: AffidavitDelivery;
    mailingAddress?: string;
    courtDate?: string;
    note?: string;
  }): Promise<AffidavitRequestItem> {
    await Promise.resolve();
    const matchingExport = this.exports().find(
      (e) => e.recordId?.toUpperCase() === params.recordId.trim().toUpperCase(),
    );
    if (!matchingExport) {
      throw new Error('Certified export with this Record ID was not found in your account.');
    }

    const existingOpen = this.affidavitRequests().find(
      (r) =>
        r.recordId.toUpperCase() === params.recordId.trim().toUpperCase() &&
        (r.status === 'submitted' || r.status === 'in_review'),
    );
    if (existingOpen) {
      throw new Error('An open affidavit request already exists for this Record ID.');
    }

    if (params.delivery === 'mailed' && !params.mailingAddress?.trim()) {
      throw new Error('Please provide a mailing address for physical delivery.');
    }

    const currentUserId = this.auth.user()?.id ?? 'usr-parent-a';
    const newReq = buildAffidavitRequest(params, matchingExport, currentUserId);

    this.affidavitRequests.update((list) => [newReq, ...list]);
    this.toast(`Affidavit request sent. Case ${newReq.caseNumber}`);
    return newReq;
  }

  async reviewAffidavit(
    requestId: string,
    action: 'approve' | 'decline',
    reason?: string,
  ): Promise<AffidavitRequestItem> {
    await Promise.resolve();
    const target = this.affidavitRequests().find((r) => r.requestId === requestId);
    if (!target) throw new Error('Affidavit request not found.');

    const newStatus: AffidavitStatus = action === 'approve' ? 'ready' : 'declined';
    const updated: AffidavitRequestItem = {
      ...target,
      status: newStatus,
      declineReason: action === 'decline' ? (reason ?? 'Declined by operations.') : null,
      updatedAt: new Date().toISOString(),
    };

    this.affidavitRequests.update((list) =>
      list.map((r) => (r.requestId === requestId ? updated : r)),
    );
    this.toast(`Affidavit ${action === 'approve' ? 'approved' : 'declined'}.`);
    return updated;
  }

  async submitSubpoena(params: {
    requesterName: string;
    organization: string;
    email: string;
    subpoenaFile?: File;
    notes?: string;
  }): Promise<SubpoenaRequestItem> {
    await Promise.resolve();
    if (!params.requesterName.trim() || !params.organization.trim() || !params.email.trim()) {
      throw new Error('Please fill in all required contact and organization fields.');
    }

    const req: SubpoenaRequestItem = {
      requestId: `sub-${String(Date.now())}`,
      requesterName: params.requesterName.trim(),
      organization: params.organization.trim(),
      email: params.email.trim(),
      subpoenaFilePath: params.subpoenaFile ? `subpoenas/${params.subpoenaFile.name}` : null,
      status: 'submitted',
      notes: params.notes?.trim() ?? null,
      createdAt: new Date().toISOString(),
    };

    this.subpoenaRequests.update((list) => [req, ...list]);
    this.toast('Subpoena submission received.');
    return req;
  }

  async requestDeletion(): Promise<DeletionRequestItem> {
    await Promise.resolve();
    if (this.activeLegalHold()) {
      throw new Error(
        'A legal hold is currently active on this household. Deletion of data is blocked by court rule.',
      );
    }

    const currentUserId = this.auth.user()?.id ?? 'usr-parent-a';
    const householdId = this.household.currentHousehold()?.id ?? 'hh-001';

    const req: DeletionRequestItem = {
      deletionId: `del-${String(Date.now())}`,
      householdId,
      userId: currentUserId,
      status: 'requested',
      requestedAt: new Date().toISOString(),
      completedAt: null,
      keptSummary:
        'Records kept for court retention requirement (messages, calendar entries, expenses, payment ledgers, audit logs). Drafts and preferences queued for purge.',
    };

    this.deletionRequests.update((list) => [req, ...list]);
    this.toast('Data deletion request submitted.');
    return req;
  }

  async placeLegalHold(caseNumber?: string, reason?: string): Promise<LegalHoldItem> {
    await Promise.resolve();
    if (this.activeLegalHold()) {
      throw new Error('A legal hold is already in place for this household.');
    }

    const currentUserId = this.auth.user()?.id ?? 'usr-parent-a';
    const householdId = this.household.currentHousehold()?.id ?? 'hh-001';

    const hold: LegalHoldItem = {
      holdId: `hold-${String(Date.now())}`,
      householdId,
      setBy: 'parent',
      setByUserId: currentUserId,
      caseNumber: caseNumber?.trim() ? caseNumber.trim() : null,
      status: 'on',
      reason: reason?.trim()
        ? reason.trim()
        : 'Parent requested legal hold due to active litigation.',
      setAt: new Date().toISOString(),
      releasedAt: null,
    };

    this.legalHolds.update((list) => [hold, ...list]);
    this.toast('Legal hold has been placed on this household.');
    return hold;
  }

  async releaseLegalHold(holdId: string): Promise<LegalHoldItem> {
    await Promise.resolve();
    const existing = this.legalHolds().find((h) => h.holdId === holdId);
    if (!existing) throw new Error('Legal hold not found.');
    if (existing.setBy === 'counsel') {
      throw new Error('Legal holds placed by legal counsel can only be released by counsel.');
    }

    const released: LegalHoldItem = {
      ...existing,
      status: 'released',
      releasedAt: new Date().toISOString(),
    };

    this.legalHolds.update((list) => list.map((h) => (h.holdId === holdId ? released : h)));
    this.toast('Legal hold has been released.');
    return released;
  }
}
