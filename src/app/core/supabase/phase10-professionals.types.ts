export type ProfessionalType = 'Attorney' | 'Mediator' | 'Therapist';

export type ProfessionalAccessStatus = 'Invited' | 'Active' | 'Paused' | 'Ended';

export type ProfessionalInviteStatus = 'Sent' | 'Opened' | 'Accepted' | 'Expired' | 'Cancelled';

export type ProfessionalShareItemType =
  | 'Certified export'
  | 'Document'
  | 'Child information entry'
  | 'Message thread'
  | 'Journal note'
  | 'Recorded child support payment'
  | 'Agency data item';
