import type {
  AffidavitDelivery,
  AffidavitStatus,
  DeletionRequestStatus,
  ExportFormat,
  ExportStatus,
  JournalStatus,
  JournalType,
  LegalContentType,
  LegalHoldSetBy,
  LegalHoldStatus,
  ScanStatus,
  SubpoenaStatus,
  VerificationResult,
} from '../supabase/phase8-records.types';

export type {
  AffidavitDelivery,
  AffidavitStatus,
  DeletionRequestStatus,
  ExportFormat,
  ExportStatus,
  JournalStatus,
  JournalType,
  LegalContentType,
  LegalHoldSetBy,
  LegalHoldStatus,
  ScanStatus,
  SubpoenaStatus,
  VerificationResult,
};

export type RecordTypeOption =
  | 'messages'
  | 'calendar'
  | 'expenses'
  | 'child_support'
  | 'contact_attempts'
  | 'journal'
  | 'agency_data';

export interface ExportItem {
  exportId: string;
  householdId: string;
  requestedByUserId: string;
  format: ExportFormat;
  recordTypes: RecordTypeOption[];
  dateFrom: string;
  dateTo: string;
  status: ExportStatus;
  recordId: string | null;
  fingerprint: string | null;
  pageCount: number | null;
  fileName: string | null;
  fileSizeBytes: number | null;
  downloadUrl?: string;
  generatedAt: string | null;
  errorMessage: string | null;
  createdAt: string;
}

export interface VerificationLookupResult {
  lookupId: string;
  recordId: string;
  result: VerificationResult;
  checkedAt: string;
  exportItem?: ExportItem | null;
  matchDetails?: {
    isSameFile: boolean;
    pageCountMatch: boolean;
    fingerprintMatch: boolean;
  };
}

export interface JournalAttachment {
  attachmentId: string;
  entryId: string;
  fileName: string;
  fileSizeBytes: number;
  mimeType: string;
  storagePath: string;
  scanStatus: ScanStatus;
  createdAt: string;
}

export interface JournalVersion {
  versionId: string;
  entryId: string;
  versionNumber: number;
  title: string;
  details: string;
  happenedAt: string;
  createdAt: string;
  createdByUserId: string;
  deviceType: string;
}

export interface JournalEntry {
  entryId: string;
  householdId: string;
  userId: string;
  entryType: JournalType;
  title: string;
  happenedAt: string;
  details: string;
  children: string[];
  status: JournalStatus;
  attachments: JournalAttachment[];
  versions: JournalVersion[];
  createdAt: string;
  updatedAt: string;
}

export interface AffidavitRequestItem {
  requestId: string;
  caseNumber: string;
  requestedByUserId: string;
  exportId: string;
  recordId: string;
  delivery: AffidavitDelivery;
  mailingAddress: string | null;
  courtDate: string | null;
  note: string | null;
  status: AffidavitStatus;
  declineReason: string | null;
  flagged: boolean;
  pageCount: number;
  recordTypes: RecordTypeOption[];
  dateRange: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubpoenaRequestItem {
  requestId: string;
  requesterName: string;
  organization: string;
  email: string;
  subpoenaFilePath: string | null;
  status: SubpoenaStatus;
  notes: string | null;
  createdAt: string;
}

export interface LegalContentItem {
  contentId: string;
  contentType: LegalContentType;
  state: string | null;
  version: number;
  title: string;
  text: string;
  lastReviewedOn: string;
  approvedByCounsel: boolean;
  publishedAt: string | null;
}

export interface DeletionRequestItem {
  deletionId: string;
  householdId: string;
  userId: string;
  status: DeletionRequestStatus;
  requestedAt: string;
  completedAt: string | null;
  keptSummary: string;
}

export interface LegalHoldItem {
  holdId: string;
  householdId: string;
  setBy: LegalHoldSetBy;
  setByUserId: string | null;
  caseNumber: string | null;
  status: LegalHoldStatus;
  reason: string | null;
  setAt: string;
  releasedAt: string | null;
}
