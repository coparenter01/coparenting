export type ExportFormat = 'certified_pdf' | 'pdf' | 'csv';
export type ExportStatus = 'preparing' | 'ready' | 'failed';
export type VerificationResult =
  'valid' | 'not_found' | 'file_matches' | 'file_does_not_match' | 'rate_limited';
export type JournalType = 'incident' | 'note';
export type JournalStatus = 'active' | 'voided';
export type AffidavitDelivery = 'electronic' | 'mailed';
export type AffidavitStatus = 'submitted' | 'in_review' | 'ready' | 'declined' | 'delivered';
export type SubpoenaStatus = 'submitted' | 'in_review' | 'processed' | 'declined';
export type LegalContentType = 'court_note' | 'model_order_language' | 'retention_policy';
export type DeletionRequestStatus = 'requested' | 'completed' | 'blocked';
export type LegalHoldStatus = 'on' | 'released';
export type LegalHoldSetBy = 'parent' | 'counsel';
export type ScanStatus = 'clean' | 'scanning' | 'flagged';
