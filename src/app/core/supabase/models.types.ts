export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type HouseholdRole = 'Parent' | 'Co-parent' | 'Child' | 'Third party';
export type HouseholdMemberStatus = 'Active' | 'Invited' | 'Suspended' | 'Removed';
export type HouseholdMode = 'Linked' | 'Solo';
export type InviteChannel = 'Text' | 'Email' | 'Link';
export type InviteStatus = 'Sent' | 'Opened' | 'Accepted' | 'Expired' | 'Cancelled';
export type ContactChannel = 'Email' | 'Text' | 'Letter' | 'Phone' | 'In person';
export type ContactResult =
  'Delivered' | 'Failed' | 'Opened' | 'Replied' | 'Refused' | 'No response';
export type AlertPreviewLevel = 'Hidden' | 'Name only' | 'Name and text';
export type ShieldLevel = 'Strict' | 'Standard' | 'Off';
export type AccountStatus = 'Active' | 'Locked' | 'Closed';
export type ChildStatus = 'Active' | 'Archived';
export type ChildSection = 'Medical' | 'School' | 'Contacts' | 'Activities' | 'Other';
export type DocumentCategory =
  'Medical' | 'School' | 'Legal' | 'Financial' | 'Activities' | 'Other';
export type WishItemStatus = 'Active' | 'Purchased' | 'Archived';
export type ShareResourceType = 'ChildEmergencySheet' | 'Document' | 'Album';
export type EmergencyConsentStatus = 'Pending' | 'Consented' | 'Withdrawn';
