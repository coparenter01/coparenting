// ==============================================================================
// Phase 7: Expenses & Payments Schema Types
// ==============================================================================

export type ExpenseStatus = 'Active' | 'Voided';
export type ExpenseVisibility = 'Shared' | 'Private';

export type ExpenseCategory =
  'Medical' | 'Dental' | 'School' | 'Childcare' | 'Activities' | 'Clothing' | 'Pet' | 'Other';

export type ReimbursementRequestStatus = 'Pending' | 'Accepted' | 'Declined' | 'Paid' | 'Withdrawn';

export type DisputeStatus = 'Open' | 'Resolved';

export type PaymentMethod =
  | 'Bank transfer (ACH)'
  | 'Debit/Credit Card'
  | 'Check'
  | 'Direct transfer'
  | 'Cash'
  | 'App'
  | 'State agency';

export type InAppPaymentStatus = 'Processing' | 'Completed' | 'Failed';

export type RecurringPaymentFrequency = 'Weekly' | 'Bi-weekly' | 'Monthly';

export type RecurringPaymentStatus = 'Active' | 'Paused';

export type BillStatus = 'Upcoming' | 'Paid' | 'Overdue';
