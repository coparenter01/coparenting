import type {
  AffidavitDelivery,
  AffidavitRequestItem,
  ExportFormat,
  ExportItem,
  JournalAttachment,
  JournalEntry,
  JournalType,
  LegalContentItem,
  RecordTypeOption,
} from './records.types';

export const RECORD_ID_REGEX = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

export function generateRecordId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Base32 excluding I, O, 0, 1 for visual clarity
  const pick = (len: number): string => {
    let res = '';
    for (let i = 0; i < len; i++) {
      const idx = Math.floor(Math.random() * chars.length);
      res += chars[idx] ?? '';
    }
    return res;
  };
  return `${pick(4)}-${pick(4)}-${pick(4)}-${pick(4)}`;
}

export function isValidRecordId(recordId: string): boolean {
  if (!recordId) return false;
  return RECORD_ID_REGEX.test(recordId.trim().toUpperCase());
}

export function formatRecordId(raw: string): string {
  const clean = raw
    .replace(/[^A-Za-z0-9]/g, '')
    .toUpperCase()
    .slice(0, 16);
  const parts: string[] = [];
  for (let i = 0; i < clean.length; i += 4) parts.push(clean.slice(i, i + 4));
  return parts.join('-');
}

export function generateCaseNumber(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `AFF-${String(year)}-${String(num)}`;
}

export function validateExportDates(startDateStr: string, endDateStr: string): string | null {
  if (!startDateStr || !endDateStr) {
    return 'Please select both a start date and an end date.';
  }
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  if (start > end) {
    return 'The start date cannot be after the end date.';
  }
  if (end > today) {
    return 'The end date cannot be in the future.';
  }
  return null;
}

export function sanitizeCsvValue(val: string): string {
  if (!val) return '';
  const first = val.charAt(0);
  if (first === '=' || first === '+' || first === '-' || first === '@') {
    return `'${val}`;
  }
  return val;
}

export function checkVerificationRateLimit(
  key: string,
  historyMap: Map<string, number[]>,
): boolean {
  const now = Date.now();
  const tenMinutesAgo = now - 10 * 60 * 1000;
  const attempts = (historyMap.get(key) ?? []).filter((time) => time > tenMinutesAgo);

  if (attempts.length >= 10) {
    return true; // Rate limited
  }
  historyMap.set(key, attempts);
  return false;
}

export function recordFailedLookup(key: string, historyMap: Map<string, number[]>): void {
  const now = Date.now();
  const attempts = historyMap.get(key) ?? [];
  attempts.push(now);
  historyMap.set(key, attempts);
}

export const DEFAULT_COURT_NOTES: LegalContentItem[] = [
  {
    contentId: 'cn-ca',
    contentType: 'court_note',
    state: 'California',
    version: 1,
    title: 'California Family Code § 3020 & Evidence Code § 1561',
    text: 'California courts accept certified digital communications under Evidence Code § 1561 business records declarations. The 16-character Record ID allows immediate bench verification without party login. Subpoenas must identify the account email and specify the date range.',
    lastReviewedOn: '2026-06-15',
    approvedByCounsel: true,
    publishedAt: '2026-06-16T00:00:00Z',
  },
  {
    contentId: 'cn-tx',
    contentType: 'court_note',
    state: 'Texas',
    version: 1,
    title: 'Texas Family Code Title 5 & Rule 902(10) Business Records',
    text: 'Texas family courts require self-authenticating affidavits under TRE 902(10). Certified PDF exports from ParentPath provide verifiable SHA-256 digital fingerprints. Formal subpoenas duces tecum may be served via electronic submission on our public records request portal.',
    lastReviewedOn: '2026-07-20',
    approvedByCounsel: true,
    publishedAt: '2026-07-21T00:00:00Z',
  },
  {
    contentId: 'cn-fl',
    contentType: 'court_note',
    state: 'Florida',
    version: 1,
    title: 'Florida Statutes § 90.803(6) & Family Law Rule 12.285',
    text: 'Florida family division judges routinely admit verifiable co-parenting app logs. Our certified exports carry immutable page numbering and cryptographic hashes conforming to § 90.902 self-authentication requirements.',
    lastReviewedOn: '2026-05-10',
    approvedByCounsel: true,
    publishedAt: '2026-05-12T00:00:00Z',
  },
  {
    contentId: 'cn-ny',
    contentType: 'court_note',
    state: 'New York',
    version: 1,
    title: 'New York CPLR 4518 Business Records Standard',
    text: 'In New York Supreme and Family Courts, records made in regular course of family coordination are admissible with appropriate foundation. ParentPath notary-ready affidavits satisfy CPLR 4518(a) certification.',
    lastReviewedOn: '2026-08-01',
    approvedByCounsel: true,
    publishedAt: '2026-08-02T00:00:00Z',
  },
  {
    contentId: 'cn-il',
    contentType: 'court_note',
    state: 'Illinois',
    version: 1,
    title: 'Illinois Supreme Court Rule 236 & 750 ILCS 5/602',
    text: 'Illinois parenting allocation determinations consider documented communication history. Tamper-evident records with verified timestamps provide objective evidence for custody and schedule compliance hearings.',
    lastReviewedOn: '2026-04-18',
    approvedByCounsel: true,
    publishedAt: '2026-04-20T00:00:00Z',
  },
];

export const DEFAULT_MODEL_ORDER_CLAUSES: LegalContentItem[] = [
  {
    contentId: 'mo-1',
    contentType: 'model_order_language',
    state: null,
    version: 1,
    title: '1. Neutral Platform Mandate (Non-Monopolistic)',
    text: 'The parties shall communicate regarding the minor child(ren) exclusively through a secure, mutual co-parenting application that meets standard evidentiary integrity requirements (including but not limited to ParentPath or any application offering equivalent non-editable audit logs, tamper-evident timestamps, and certified export capabilities).',
    lastReviewedOn: '2026-09-01',
    approvedByCounsel: true,
    publishedAt: '2026-09-05T00:00:00Z',
  },
  {
    contentId: 'mo-2',
    contentType: 'model_order_language',
    state: null,
    version: 1,
    title: '2. Immutability and Audit Integrity Standards',
    text: 'Any communication tool utilized pursuant to this Order must guarantee that sent messages cannot be altered, redacted, or expunged by either party, and that all calendar changes and expense submissions preserve a permanent chronological version history.',
    lastReviewedOn: '2026-09-01',
    approvedByCounsel: true,
    publishedAt: '2026-09-05T00:00:00Z',
  },
  {
    contentId: 'mo-3',
    contentType: 'model_order_language',
    state: null,
    version: 1,
    title: '3. Certified Exports and Public Verification',
    text: 'Records submitted to the Court from the approved platform shall feature a unique alphanumeric Record ID and a publicly accessible verification portal allowing the Court, counsel, and guardians ad litem to authenticate the unaltered nature of the submission.',
    lastReviewedOn: '2026-09-01',
    approvedByCounsel: true,
    publishedAt: '2026-09-05T00:00:00Z',
  },
  {
    contentId: 'mo-4',
    contentType: 'model_order_language',
    state: null,
    version: 1,
    title: '4. Expense and Reimbursement Protocol',
    text: 'All shared child-related expenses, medical bills, and reimbursement requests shall be logged through the designated application within thirty (30) days of incurrence, with accompanying receipts or proof of payment attached.',
    lastReviewedOn: '2026-09-01',
    approvedByCounsel: true,
    publishedAt: '2026-09-05T00:00:00Z',
  },
  {
    contentId: 'mo-5',
    contentType: 'model_order_language',
    state: null,
    version: 1,
    title: '5. Business Records Affidavit Support',
    text: 'Upon reasonable written notice of hearing or trial, either parent may request and obtain a formal business records affidavit from the service provider certifying compliance with state evidence rules.',
    lastReviewedOn: '2026-09-01',
    approvedByCounsel: true,
    publishedAt: '2026-09-05T00:00:00Z',
  },
];

export const DEFAULT_RETENTION_SECTIONS: LegalContentItem[] = [
  {
    contentId: 'ret-1',
    contentType: 'retention_policy',
    state: null,
    version: 1,
    title: 'Definition of Evidentiary Records vs. Non-Record Data',
    text: 'Under ParentPath court-readiness policy, "Records" comprise all sent communications, shared parenting schedule entries, financial transactions, reimbursement ledgers, delivery receipts, and certified exports. "Non-Record Data" consists of unshared drafts, private local settings, and general preferences.',
    lastReviewedOn: '2026-08-15',
    approvedByCounsel: true,
    publishedAt: '2026-08-16T00:00:00Z',
  },
  {
    contentId: 'ret-2',
    contentType: 'retention_policy',
    state: null,
    version: 1,
    title: 'Standard Retention Period and Legal Hold Safeguards',
    text: 'Evidentiary records are retained for a minimum of seven (7) years following the youngest child reaching the age of majority, or until all accounts within the household are closed with no active legal hold in effect. A legal hold placed by either parent or legal counsel indefinitely suspends all automated purging.',
    lastReviewedOn: '2026-08-15',
    approvedByCounsel: true,
    publishedAt: '2026-08-16T00:00:00Z',
  },
  {
    contentId: 'ret-3',
    contentType: 'retention_policy',
    state: null,
    version: 1,
    title: 'Non-Record Deletion Protocol (30-Day Completion)',
    text: 'Parents may request deletion of non-record data at any time. Upon confirmation, temporary drafts and local configurations are permanently wiped within 30 days. Shared records remain intact to ensure compliance with judicial discovery obligations.',
    lastReviewedOn: '2026-08-15',
    approvedByCounsel: true,
    publishedAt: '2026-08-16T00:00:00Z',
  },
];

export function getRecordTypeLabel(type: RecordTypeOption): string {
  switch (type) {
    case 'messages':
      return 'Messages';
    case 'calendar':
      return 'Calendar';
    case 'expenses':
      return 'Expenses';
    case 'child_support':
      return 'Child support payments I recorded';
    case 'contact_attempts':
      return 'Contact attempts';
    case 'journal':
      return 'Journal notes';
    case 'agency_data':
      return 'Agency data';
  }
}

export function buildExportItem(
  params: {
    format: ExportFormat;
    recordTypes: RecordTypeOption[];
    dateFrom: string;
    dateTo: string;
  },
  userId: string,
  householdId: string,
): ExportItem {
  const isCertified = params.format === 'certified_pdf';
  const nowTs = String(Date.now());
  const ext = params.format === 'csv' ? 'zip' : 'pdf';
  return {
    exportId: `exp-${nowTs}`,
    householdId,
    requestedByUserId: userId,
    format: params.format,
    recordTypes: [...params.recordTypes],
    dateFrom: params.dateFrom,
    dateTo: params.dateTo,
    status: 'ready',
    recordId: isCertified ? generateRecordId() : null,
    fingerprint: isCertified
      ? 'c2b489a69b18361b9a95143a7b9739097e8841a547fae5e69e02c52db894101e'
      : null,
    pageCount: isCertified ? 14 : 8,
    fileName: `parentpath-export-${params.format}-${nowTs}.${ext}`,
    fileSizeBytes: 2097152,
    downloadUrl: `/downloads/export-${nowTs}`,
    generatedAt: new Date().toISOString(),
    errorMessage: null,
    createdAt: new Date().toISOString(),
  };
}

export function buildJournalAttachments(
  files: File[] | undefined,
  entryId: string,
  userId: string,
): JournalAttachment[] {
  const nowTs = String(Date.now());
  return (files ?? []).map((file, idx) => ({
    attachmentId: `att-${nowTs}-${String(idx)}`,
    entryId,
    fileName: file.name,
    fileSizeBytes: file.size,
    mimeType: file.type ? file.type : 'application/pdf',
    storagePath: `journal/${userId}/${file.name}`,
    scanStatus: 'clean' as const,
    createdAt: new Date().toISOString(),
  }));
}

export function buildJournalEntry(
  params: {
    entryType: JournalType;
    title: string;
    happenedAt: string;
    details: string;
    children?: string[];
    files?: File[];
  },
  userId: string,
  householdId: string,
): JournalEntry {
  const entryId = `jrn-${String(Date.now())}`;
  const attachments = buildJournalAttachments(params.files, entryId, userId);

  return {
    entryId,
    householdId,
    userId,
    entryType: params.entryType,
    title: params.title.trim(),
    happenedAt: params.happenedAt,
    details: params.details.trim(),
    children: params.children ? [...params.children] : [],
    status: 'active',
    attachments,
    versions: [
      {
        versionId: `ver-${entryId}-1`,
        entryId,
        versionNumber: 1,
        title: params.title.trim(),
        details: params.details.trim(),
        happenedAt: params.happenedAt,
        createdAt: new Date().toISOString(),
        createdByUserId: userId,
        deviceType: 'web',
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function buildAffidavitRequest(
  params: {
    recordId: string;
    delivery: AffidavitDelivery;
    mailingAddress?: string;
    courtDate?: string;
    note?: string;
  },
  matchingExport: ExportItem,
  userId: string,
): AffidavitRequestItem {
  return {
    requestId: `aff-${String(Date.now())}`,
    caseNumber: generateCaseNumber(),
    requestedByUserId: userId,
    exportId: matchingExport.exportId,
    recordId: matchingExport.recordId ?? params.recordId,
    delivery: params.delivery,
    mailingAddress: params.mailingAddress?.trim() ?? null,
    courtDate: params.courtDate ?? null,
    note: params.note?.trim() ?? null,
    status: 'submitted',
    declineReason: null,
    flagged: false,
    pageCount: matchingExport.pageCount ?? 1,
    recordTypes: matchingExport.recordTypes,
    dateRange: `${matchingExport.dateFrom} – ${matchingExport.dateTo}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
