// Phase 6 Calendar & Parenting Time database row definitions

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CalendarEntryRow = {
  id: string;
  household_id: string;
  entry_type: 'Event' | 'Parenting time' | 'Holiday' | 'Pet';
  title: string;
  details: string | null;
  location: string | null;
  start_at: string;
  end_at: string;
  responsible_parent_id: string | null;
  drop_off_parent_id: string | null;
  pick_up_parent_id: string | null;
  visibility: 'Shared' | 'Private';
  status: 'Proposed' | 'Active' | 'Cancelled';
  repeat_rule: 'None' | 'Daily' | 'Weekly' | 'Biweekly' | 'Monthly' | 'Custom' | null;
  series_id: string | null;
  source: 'Parent' | 'Request' | 'Schedule' | 'Holiday' | 'Agency item' | 'Outside calendar';
  pet_id: string | null;
  archived_at: string | null;
  archived_by: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CalendarEntryChildRow = {
  id: string;
  entry_id: string;
  child_id: string;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CalendarEntryVersionRow = {
  id: string;
  entry_id: string;
  version_number: number;
  details_snapshot: Record<string, unknown>;
  change_type: 'Created' | 'Edited' | 'Cancelled' | 'Confirmed' | 'Changed by request';
  request_id: string | null;
  device_type: string | null;
  changed_by: string;
  changed_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ScheduleChangeRequestRow = {
  id: string;
  household_id: string;
  request_type: 'Swap days' | 'Change of parenting time' | 'Change of exchange time or place';
  requested_by: string;
  change_start_at: string;
  change_end_at: string;
  trade_start_at: string | null;
  trade_end_at: string | null;
  reason: string;
  respond_by_at: string;
  status: 'Pending' | 'Approved' | 'Declined' | 'Expired' | 'Withdrawn';
  response_reason: string | null;
  responded_by: string | null;
  responded_at: string | null;
  device_type: string | null;
  undo_until: string | null;
  applied_at: string | null;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ScheduleChangeRequestChildRow = {
  id: string;
  request_id: string;
  child_id: string;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ScheduleTemplateRow = {
  id: string;
  household_id: string;
  name: string;
  pattern_type:
    'alternating_weeks' | '2_2_3' | '2_2_5_5' | '3_4_4_3' | 'every_other_weekend' | 'custom';
  cycle_days: number;
  cycle_definition: Record<string, unknown>;
  start_date: string;
  end_date: string | null;
  child_id: string | null;
  created_by: string;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CalendarHolidayRow = {
  id: string;
  household_id: string;
  holiday_key: string;
  name: string;
  assigned_parent_id: string | null;
  rule: 'Every year' | 'Even years' | 'Odd years' | 'Split';
  custom_start_date: string | null;
  custom_end_date: string | null;
  status: 'Proposed' | 'Active';
  created_by: string;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CalendarSyncSettingsRow = {
  id: string;
  household_id: string;
  user_id: string;
  provider: 'google' | 'outlook' | 'ics' | 'apple';
  ics_token: string;
  send_mode: 'both' | 'own_only';
  is_connected: boolean;
  last_synced_at: string | null;
  created_at: string;
  updated_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CustodyExchangeRow = {
  id: string;
  household_id: string;
  entry_id: string | null;
  handed_over_by: string;
  received_by: string | null;
  scheduled_time: string;
  actual_time: string;
  status: 'Unconfirmed' | 'Confirmed' | 'Disputed';
  dispute_reason: string | null;
  notes: string | null;
  created_by: string;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ExchangeCheckInRow = {
  id: string;
  household_id: string;
  exchange_id: string | null;
  entry_id: string | null;
  user_id: string;
  checked_in_at: string;
  latitude: number;
  longitude: number;
  accuracy_meters: number | null;
  address: string | null;
  is_shared: boolean;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ParentingPlanRow = {
  id: string;
  household_id: string;
  title: string;
  answers: Record<string, unknown>;
  is_shared: boolean;
  legal_review_completed: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type HouseholdPetRow = {
  id: string;
  household_id: string;
  name: string;
  species: string;
  breed: string | null;
  notes: string | null;
  created_by: string;
  created_at: string;
};
