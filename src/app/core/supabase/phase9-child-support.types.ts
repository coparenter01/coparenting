export type CaseStatus = 'active' | 'unlinked' | 'pending_consent' | 'sync_error';
export type SyncSource = 'api' | 'batch';
export type AgencyPaymentStatus = 'disbursed' | 'received' | 'pending' | 'reversed';
export type MatchStatus = 'matched' | 'not_on_agency' | 'not_recorded' | 'amounts_differ';
export type HearingStatus = 'scheduled' | 'completed' | 'continued' | 'cancelled';
export type SharedItemType = 'hearing' | 'payment_receipt' | 'order_summary' | 'arrears_notice';
export type ProofPaymentMethod =
  'cashiers_check' | 'bank_transfer' | 'money_order' | 'certified_check' | 'other';
export type ProofSubmissionStatus = 'submitted' | 'accepted' | 'rejected' | 'in_review';
export type SafetyOfferDecision = 'pending' | 'accepted' | 'declined';
export type AgencyInviteStatus = 'sent' | 'accepted' | 'expired';
export type SyncLogStatus = 'success' | 'failed' | 'held_back' | 'late';
export type SyncLogChannel = 'api' | 'batch';
