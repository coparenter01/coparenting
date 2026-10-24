import type {
  AgencyPaymentStatus,
  CaseStatus,
  HearingStatus,
  MatchStatus,
  ProofPaymentMethod,
  ProofSubmissionStatus,
  SharedItemType,
  SyncLogChannel,
  SyncLogStatus,
  SyncSource,
} from '@core/supabase/database.types';

export interface SubmitProofRequest {
  readonly paymentDate: string;
  readonly amountCents: number;
  readonly paymentMethod: ProofPaymentMethod;
  readonly referenceNumber: string | null;
  readonly fileUrl: string;
}

export interface ChildSupportCase {
  readonly caseId: string;
  readonly householdId: string;
  readonly userId: string;
  readonly agencyCaseNumber: string;
  readonly state: string;
  readonly status: CaseStatus;
  readonly monthlyOrderCents: number;
  readonly balanceOwedCents: number;
  readonly arrearsBalanceCents: number;
  readonly lastPaymentDate: string | null;
  readonly lastPaymentAmountCents: number;
  readonly nextHearingDate: string | null;
  readonly lastSyncedAt: string;
  readonly syncSource: SyncSource;
  readonly familyViolenceFlag: boolean;
  readonly safetyModeOffered: boolean;
  readonly unlinkedAt: string | null;
  readonly purgeAt: string | null;
  readonly isOutOfDate?: boolean;
}

export interface AgencyPaymentItem {
  readonly paymentId: string;
  readonly caseId: string;
  readonly agencyReference: string | null;
  readonly paymentDate: string;
  readonly amountCents: number;
  readonly source: SyncSource;
  readonly status: AgencyPaymentStatus;
  readonly syncedAt: string;
}

export interface AppPaymentItem {
  readonly paymentId: string;
  readonly paymentDate: string;
  readonly amountCents: number;
  readonly description: string;
}

export interface PaymentMatchRow {
  readonly matchId: string;
  readonly date: string;
  readonly agencyAmountCents: number | null;
  readonly appAmountCents: number | null;
  readonly status: MatchStatus;
  readonly flagDismissed: boolean;
  readonly dismissedReason: string | null;
}

export interface AgencyHearingItem {
  readonly hearingId: string;
  readonly caseId: string;
  readonly title: string;
  readonly hearingDate: string;
  readonly location: string;
  readonly docketNumber: string | null;
  readonly requiredDocuments: readonly string[];
  readonly status: HearingStatus;
}

export interface SharedAgencyItem {
  readonly shareId: string;
  readonly caseId: string;
  readonly sharedByUserId: string;
  readonly sharedByName: string;
  readonly itemType: SharedItemType;
  readonly itemId: string;
  readonly title: string;
  readonly sharedDetails: Record<string, unknown>;
  readonly sharedAt: string;
}

export interface ProofSubmissionItem {
  readonly submissionId: string;
  readonly caseId: string;
  readonly submittedByUserId: string;
  readonly paymentDate: string;
  readonly amountCents: number;
  readonly paymentMethod: ProofPaymentMethod;
  readonly referenceNumber: string | null;
  readonly fileUrl: string;
  readonly verificationRecordId: string;
  readonly status: ProofSubmissionStatus;
  readonly createdAt: string;
}

export interface DueDateReminderConfig {
  readonly remind7Days: boolean;
  readonly remind3Days: boolean;
  readonly remind1Day: boolean;
  readonly pushNotifications: boolean;
  readonly emailNotifications: boolean;
}

export interface LinkCaseForm {
  readonly state: string;
  readonly agencyCaseNumber: string;
  readonly legalFirstName: string;
  readonly legalLastName: string;
  readonly dateOfBirth: string;
  readonly oneTimeCode: string;
}

export interface OperationsSyncLogEntry {
  readonly logId: string;
  readonly batchId: string;
  readonly agencyName: string;
  readonly channel: SyncLogChannel;
  readonly startedAt: string;
  readonly finishedAt: string | null;
  readonly latencyMs: number | null;
  readonly recordsCount: number;
  readonly status: SyncLogStatus;
  readonly errorSummary: string | null;
}

export interface HearingPacketData {
  readonly caseNumber: string;
  readonly state: string;
  readonly monthlyOrderFormatted: string;
  readonly arrearsFormatted: string;
  readonly balanceOwedFormatted: string;
  readonly nextHearingFormatted: string;
  readonly complianceStatus: string;
  readonly verificationRecordId: string;
  readonly generatedAt: string;
}

export interface TimelineEvent {
  readonly eventId: string;
  readonly eventType: 'order' | 'payment' | 'hearing' | 'sync' | 'proof';
  readonly title: string;
  readonly timestamp: string;
  readonly summary: string;
  readonly badge: string;
}
