import { TestBed } from '@angular/core/testing';
import { AuthService } from '@core/auth/auth.service';
import { HouseholdService } from '@core/household/household.service';
import { describe, expect, it } from 'vitest';
import { RecordsService } from './records.service';
import {
  checkVerificationRateLimit,
  formatRecordId,
  generateCaseNumber,
  generateRecordId,
  isValidRecordId,
  recordFailedLookup,
  sanitizeCsvValue,
  validateExportDates,
} from './records.utils';

describe('Phase 8: Records Utilities', () => {
  it('generateRecordId produces valid 16-character base32 formatted IDs', () => {
    const id = generateRecordId();
    expect(id).toMatch(/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
    expect(isValidRecordId(id)).toBe(true);
  });

  it('isValidRecordId rejects malformed IDs', () => {
    expect(isValidRecordId('')).toBe(false);
    expect(isValidRecordId('INVALID')).toBe(false);
    expect(isValidRecordId('1234-5678-9012-3456')).toBe(true);
  });

  it('formatRecordId chunks alphanumeric text into 4-character blocks', () => {
    expect(formatRecordId('abcd1234efgh5678')).toBe('ABCD-1234-EFGH-5678');
  });

  it('generateCaseNumber creates an AFF prefixed docket number', () => {
    const caseNum = generateCaseNumber();
    expect(caseNum).toMatch(/^AFF-\d{4}-\d{4}$/);
  });

  it('sanitizeCsvValue neutralizes formula injection characters', () => {
    expect(sanitizeCsvValue('=SUM(A1:B10)')).toBe("'=SUM(A1:B10)");
    expect(sanitizeCsvValue('+cmd|calc')).toBe("'+cmd|calc");
    expect(sanitizeCsvValue('-cmd|calc')).toBe("'-cmd|calc");
    expect(sanitizeCsvValue('@something')).toBe("'@something");
    expect(sanitizeCsvValue('Safe Content')).toBe('Safe Content');
  });

  it('validateExportDates correctly checks date order and future dates', () => {
    expect(validateExportDates('2026-01-01', '2026-01-31')).toBeNull();
    expect(validateExportDates('', '2026-01-31')).toContain('Please select both');
    expect(validateExportDates('2026-02-01', '2026-01-01')).toContain('cannot be after');
  });

  it('checkVerificationRateLimit and recordFailedLookup rate limit after 10 attempts', () => {
    const history = new Map<string, number[]>();
    const clientKey = 'ip-test-1';

    for (let i = 0; i < 9; i++) {
      expect(checkVerificationRateLimit(clientKey, history)).toBe(false);
      recordFailedLookup(clientKey, history);
    }
    recordFailedLookup(clientKey, history);
    expect(checkVerificationRateLimit(clientKey, history)).toBe(true);
  });
});

describe('Phase 8: RecordsService', () => {
  const createService = () => {
    TestBed.configureTestingModule({
      providers: [RecordsService, AuthService, HouseholdService],
    });
    return TestBed.inject(RecordsService);
  };

  it('initializes with seed mock data', () => {
    const service = createService();
    expect(service.exports().length).toBeGreaterThan(0);
    expect(service.journalEntries().length).toBeGreaterThan(0);
    expect(service.affidavitRequests().length).toBeGreaterThan(0);
  });

  it('creates an export successfully with valid verification code', async () => {
    const service = createService();
    const beforeCount = service.exports().length;

    const res = await service.createExport({
      format: 'certified_pdf',
      recordTypes: ['messages', 'expenses', 'calendar'],
      dateFrom: '2026-01-01',
      dateTo: '2026-06-30',
    });

    expect(res.exportId).toBeDefined();
    expect(res.recordId).toBeDefined();
    const createdRecordId = res.recordId ?? '';
    expect(isValidRecordId(createdRecordId)).toBe(true);
    expect(res.fingerprint).toHaveLength(64);
    expect(service.exports().length).toBe(beforeCount + 1);
  });

  it('verifies records by ID', async () => {
    const service = createService();
    const firstExport = service.exports()[0];
    expect(firstExport).toBeDefined();
    if (!firstExport) return;

    const recordId = firstExport.recordId ?? '';
    const lookup = await service.verifyRecord(recordId);
    expect(lookup.result).toBe('valid');
    expect(lookup.exportItem?.exportId).toBe(firstExport.exportId);

    const nonExistent = await service.verifyRecord('ZZZZ-ZZZZ-ZZZZ-ZZZZ');
    expect(nonExistent.result).toBe('not_found');
  });

  it('adds, edits with versioning, and voids journal entries', async () => {
    const service = createService();

    // Add entry
    const entry = await service.addJournalEntry({
      entryType: 'note',
      title: 'Doctor Appointment Observation',
      happenedAt: '2026-06-10T14:00:00Z',
      details: 'Child arrived on time and seemed relaxed during the appointment.',
    });

    expect(entry.entryId).toBeDefined();
    expect(entry.versions.length).toBe(1);

    // Update entry (creates version 2)
    const updated = await service.updateJournalEntry(entry.entryId, {
      title: 'Doctor Appointment Observation (Updated)',
      happenedAt: '2026-06-10T14:00:00Z',
      details: 'Child arrived on time and pediatrician noted healthy growth percentiles.',
    });

    expect(updated.versions.length).toBe(2);

    // Void entry
    const voided = await service.voidJournalEntry(entry.entryId);
    expect(voided.status).toBe('voided');
  });

  it('submits and reviews affidavit requests', async () => {
    const service = createService();

    // Create a new export to request an affidavit for
    const exp = await service.createExport({
      format: 'certified_pdf',
      recordTypes: ['messages'],
      dateFrom: '2026-01-01',
      dateTo: '2026-05-31',
    });

    const recordId = exp.recordId ?? '';
    const req = await service.requestAffidavit({
      recordId,
      delivery: 'electronic',
      note: 'Hearing scheduled for next month',
    });

    expect(req.requestId).toBeDefined();
    expect(req.status).toBe('submitted');

    const reviewed = await service.reviewAffidavit(req.requestId, 'approve');
    expect(reviewed.status).toBe('ready');
  });

  it('submits third-party subpoenas and requests data deletion', async () => {
    const service = createService();

    const sub = await service.submitSubpoena({
      requesterName: 'Jane Smith, Esq.',
      organization: 'Smith & Partners Family Law',
      email: 'jsmith@smithlaw.com',
      notes: 'Subpoena duces tecum regarding case FL-2026-3011',
    });
    expect(sub.requestId).toBeDefined();

    // Release any active legal hold first so deletion succeeds
    const activeHold = service.activeLegalHold();
    if (activeHold) {
      await service.releaseLegalHold(activeHold.holdId);
    }

    const del = await service.requestDeletion();
    expect(del.deletionId).toBeDefined();
    expect(del.status).toBe('requested');
  });

  it('places and releases legal holds', async () => {
    const service = createService();

    // Ensure no hold is active
    const existingHold = service.activeLegalHold();
    if (existingHold) {
      await service.releaseLegalHold(existingHold.holdId);
    }

    const hold = await service.placeLegalHold('CASE-12345', 'Pending custody trial');
    expect(hold.status).toBe('on');
    expect(service.activeLegalHold()?.holdId).toBe(hold.holdId);

    // Deletion should now throw while legal hold is active
    await expect(service.requestDeletion()).rejects.toThrow(/legal hold is currently active/);

    const released = await service.releaseLegalHold(hold.holdId);
    expect(released.status).toBe('released');
    expect(service.activeLegalHold()).toBeNull();
  });
});
