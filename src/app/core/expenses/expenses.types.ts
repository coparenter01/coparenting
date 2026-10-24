import type {
  BillStatus,
  DisputeStatus,
  ExpenseCategory,
  ExpenseStatus,
  ExpenseVisibility,
  InAppPaymentStatus,
  PaymentMethod,
  RecurringPaymentFrequency,
  RecurringPaymentStatus,
  ReimbursementRequestStatus,
} from '../supabase/phase7-expenses.types';

export type {
  BillStatus,
  DisputeStatus,
  ExpenseCategory,
  ExpenseStatus,
  ExpenseVisibility,
  InAppPaymentStatus,
  PaymentMethod,
  RecurringPaymentFrequency,
  RecurringPaymentStatus,
  ReimbursementRequestStatus,
};

export interface ExpenseAttachmentModel {
  id: string;
  expenseId: string;
  fileName: string;
  fileSizeBytes: number;
  mimeType: string;
  storagePath: string;
  uploadedBy: string;
  uploadedByName: string;
  createdAt: string;
}

export interface ExpenseVersionModel {
  id: string;
  expenseId: string;
  versionNumber: number;
  description: string;
  category: ExpenseCategory;
  expenseDate: string;
  amountCents: number;
  note?: string;
  changedBy: string;
  changedByName: string;
  deviceInfo?: string;
  createdAt: string;
}

export interface ExpenseModel {
  id: string;
  householdId: string;
  createdBy: string;
  createdByName: string;
  paidBy: string;
  paidByName: string;
  description: string;
  category: ExpenseCategory;
  expenseDate: string;
  amountCents: number;
  currency: string;
  note?: string;
  status: ExpenseStatus;
  visibility: ExpenseVisibility;
  children: { id: string; name: string }[];
  attachments: ExpenseAttachmentModel[];
  versions: ExpenseVersionModel[];
  hasPendingRequest?: boolean;
  voidedAt?: string;
  voidedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReimbursementRequestModel {
  id: string;
  householdId: string;
  expenseId: string;
  expenseDescription: string;
  expenseTotalCents: number;
  requestedBy: string;
  requestedByName: string;
  requestedFrom: string;
  requestedFromName: string;
  amountCents: number;
  splitPercentage: number;
  dueDate: string;
  note?: string;
  status: ReimbursementRequestStatus;
  declineReason?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChildSupportPaymentModel {
  id: string;
  householdId: string;
  payerId: string;
  payerName: string;
  payeeId: string;
  payeeName: string;
  amountCents: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  referenceNumber?: string;
  note?: string;
  status: 'Recorded' | 'Verified';
  createdAt: string;
}

export interface ExpenseSplitRuleModel {
  id: string;
  householdId: string;
  category: ExpenseCategory;
  parentAPercentage: number;
  parentBPercentage: number;
  effectiveDate: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
}

export interface ExpenseDisputeModel {
  id: string;
  householdId: string;
  expenseId: string;
  expenseDescription: string;
  expenseAmountCents: number;
  disputedBy: string;
  disputedByName: string;
  reasonCategory: string;
  explanation: string;
  status: DisputeStatus;
  resolutionNotes?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpensePaymentModel {
  id: string;
  reimbursementRequestId: string;
  payerId: string;
  amountCents: number;
  paymentMethod: PaymentMethod;
  status: InAppPaymentStatus;
  transactionRef: string;
  testMode: boolean;
  createdAt: string;
}

export interface RecurringPaymentModel {
  id: string;
  householdId: string;
  title: string;
  amountCents: number;
  frequency: RecurringPaymentFrequency;
  nextDueDate: string;
  payerId: string;
  payerName: string;
  payeeId: string;
  payeeName: string;
  autoPay: boolean;
  status: RecurringPaymentStatus;
  createdAt: string;
}

export interface BillModel {
  id: string;
  householdId: string;
  payeeName: string;
  amountCents: number;
  dueDate: string;
  category: ExpenseCategory;
  isSplit: boolean;
  splitRuleId?: string;
  status: BillStatus;
  createdAt: string;
}

export interface CreditBuildingSettingsModel {
  id: string;
  householdId: string;
  userId: string;
  isEnabled: boolean;
  enrolledAt?: string;
  consentAcceptedAt?: string;
  createdAt: string;
}

export interface RunningBalanceSummary {
  parentAName: string;
  parentBName: string;
  parentAOwedCents: number;
  parentBOwedCents: number;
  netBalanceCents: number;
  netDebtorName: string;
  netCreditorName: string;
  currency: string;
}

export interface OcrReceiptResult {
  merchantName: string;
  date: string;
  amountCents: number;
  suggestedCategory: ExpenseCategory;
  confidenceScore: number;
  rawText: string;
}

export interface CsvImportRow {
  rowNumber: number;
  date: string;
  description: string;
  amountCents: number;
  category: ExpenseCategory;
  isValid: boolean;
  errorMessage?: string;
}
