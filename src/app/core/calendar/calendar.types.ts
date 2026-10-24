// Domain & UI models for Calendar and Parenting Time module

export type CalendarEntryType = 'Event' | 'Parenting time' | 'Holiday' | 'Pet';
export type CalendarEntryVisibility = 'Shared' | 'Private';
export type CalendarEntryStatus = 'Proposed' | 'Active' | 'Cancelled';
export type CalendarRepeatRule = 'None' | 'Daily' | 'Weekly' | 'Biweekly' | 'Monthly' | 'Custom';
export type CalendarEntrySource =
  'Parent' | 'Request' | 'Schedule' | 'Holiday' | 'Agency item' | 'Outside calendar';

export interface CalendarEntryModel {
  id: string;
  householdId: string;
  entryType: CalendarEntryType;
  title: string;
  details?: string;
  location?: string;
  startAt: string; // ISO UTC
  endAt: string; // ISO UTC
  responsibleParentId?: string;
  responsibleParentName?: string;
  responsibleParentColor?: string;
  dropOffParentId?: string;
  dropOffParentName?: string;
  pickUpParentId?: string;
  pickUpParentName?: string;
  visibility: CalendarEntryVisibility;
  status: CalendarEntryStatus;
  repeatRule?: CalendarRepeatRule;
  seriesId?: string;
  source: CalendarEntrySource;
  petId?: string;
  childIds: string[];
  childNames: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type ScheduleChangeRequestType =
  'Swap days' | 'Change of parenting time' | 'Change of exchange time or place';

export type ScheduleChangeRequestStatus =
  'Pending' | 'Approved' | 'Declined' | 'Expired' | 'Withdrawn';

export interface ScheduleChangeRequestModel {
  id: string;
  householdId: string;
  requestType: ScheduleChangeRequestType;
  requestedBy: string;
  requestedByName?: string;
  changeStartAt: string;
  changeEndAt: string;
  tradeStartAt?: string;
  tradeEndAt?: string;
  reason: string;
  respondByAt: string;
  status: ScheduleChangeRequestStatus;
  responseReason?: string;
  respondedBy?: string;
  respondedByName?: string;
  respondedAt?: string;
  deviceType?: string;
  undoUntil?: string; // 10 minutes window after approval
  appliedAt?: string;
  childIds: string[];
  childNames: string[];
  createdAt: string;
}

export type SchedulePatternType =
  'alternating_weeks' | '2_2_3' | '2_2_5_5' | '3_4_4_3' | 'every_other_weekend' | 'custom';

export interface ScheduleTemplateModel {
  id: string;
  householdId: string;
  name: string;
  patternType: SchedulePatternType;
  cycleDays: number;
  cycleDefinition: {
    parentDays: { dayIndex: number; parentRole: 'Parent' | 'Co-parent' }[];
  };
  startDate: string;
  endDate?: string;
  childId?: string;
  childName?: string;
  createdBy: string;
  createdAt: string;
}

export type HolidayRule = 'Every year' | 'Even years' | 'Odd years' | 'Split';

export interface CalendarHolidayModel {
  id: string;
  householdId: string;
  holidayKey: string;
  name: string;
  assignedParentId?: string;
  assignedParentName?: string;
  rule: HolidayRule;
  customStartDate?: string;
  customEndDate?: string;
  status: 'Proposed' | 'Active';
  createdBy: string;
  createdAt: string;
}

export interface CalendarSyncSettingsModel {
  id: string;
  householdId: string;
  userId: string;
  provider: 'google' | 'outlook' | 'ics' | 'apple';
  icsToken: string;
  icsFeedUrl: string;
  sendMode: 'both' | 'own_only';
  isConnected: boolean;
  lastSyncedAt?: string;
}

export type ExchangeStatus = 'Unconfirmed' | 'Confirmed' | 'Disputed';

export interface CustodyExchangeModel {
  id: string;
  householdId: string;
  entryId?: string;
  entryTitle?: string;
  handedOverBy: string;
  handedOverByName?: string;
  receivedBy?: string;
  receivedByName?: string;
  scheduledTime: string;
  actualTime: string;
  isLate: boolean; // > 15 minutes after scheduled
  status: ExchangeStatus;
  disputeReason?: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
}

export interface ExchangeCheckInModel {
  id: string;
  householdId: string;
  exchangeId?: string;
  entryId?: string;
  userId: string;
  userName?: string;
  checkedInAt: string;
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
  address?: string;
  mapUrl: string;
  isShared: boolean;
  createdAt: string;
}

export interface ParentingPlanModel {
  id: string;
  householdId: string;
  title: string;
  answers: {
    scheduleRoutine?: string;
    holidayApproach?: string;
    exchangeLocations?: string;
    transportation?: string;
    communicationRules?: string;
    medicalDecisions?: string;
    schoolDecisions?: string;
    travelNoticeDays?: number;
  };
  isShared: boolean;
  legalReviewCompleted: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface HouseholdPetModel {
  id: string;
  householdId: string;
  name: string;
  species: string;
  breed?: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
}

export interface CalendarComplianceMetrics {
  month: string;
  parentAScheduledHours: number;
  parentAActualHours: number;
  parentBScheduledHours: number;
  parentBActualHours: number;
  totalScheduledHours: number;
  totalActualHours: number;
  lateExchangesCount: number;
  unconfirmedCount: number;
  disputedCount: number;
  changeRequestsPending: number;
  changeRequestsApproved: number;
  changeRequestsDeclined: number;
}
