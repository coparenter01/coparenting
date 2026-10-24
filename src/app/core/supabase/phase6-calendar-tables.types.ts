import type {
  CalendarEntryChildRow,
  CalendarEntryRow,
  CalendarEntryVersionRow,
  CalendarHolidayRow,
  CalendarSyncSettingsRow,
  CustodyExchangeRow,
  ExchangeCheckInRow,
  HouseholdPetRow,
  ParentingPlanRow,
  ScheduleChangeRequestChildRow,
  ScheduleChangeRequestRow,
  ScheduleTemplateRow,
} from './phase6-calendar.types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Phase6CalendarTables = {
  calendar_entries: {
    Row: CalendarEntryRow;
    Insert: {
      id?: string;
      household_id: string;
      entry_type: CalendarEntryRow['entry_type'];
      title: string;
      details?: string | null;
      location?: string | null;
      start_at: string;
      end_at: string;
      responsible_parent_id?: string | null;
      drop_off_parent_id?: string | null;
      pick_up_parent_id?: string | null;
      visibility?: CalendarEntryRow['visibility'];
      status?: CalendarEntryRow['status'];
      repeat_rule?: CalendarEntryRow['repeat_rule'];
      series_id?: string | null;
      source?: CalendarEntryRow['source'];
      pet_id?: string | null;
      archived_at?: string | null;
      archived_by?: string | null;
      created_by: string;
      created_at?: string;
      updated_at?: string;
    };
    Update: Partial<CalendarEntryRow>;
    Relationships: [];
  };
  calendar_entry_children: {
    Row: CalendarEntryChildRow;
    Insert: {
      id?: string;
      entry_id: string;
      child_id: string;
      created_at?: string;
    };
    Update: Partial<CalendarEntryChildRow>;
    Relationships: [];
  };
  calendar_entry_versions: {
    Row: CalendarEntryVersionRow;
    Insert: {
      id?: string;
      entry_id: string;
      version_number: number;
      details_snapshot: Record<string, unknown>;
      change_type: CalendarEntryVersionRow['change_type'];
      request_id?: string | null;
      device_type?: string | null;
      changed_by: string;
      changed_at?: string;
    };
    Update: Partial<CalendarEntryVersionRow>;
    Relationships: [];
  };
  schedule_change_requests: {
    Row: ScheduleChangeRequestRow;
    Insert: {
      id?: string;
      household_id: string;
      request_type: ScheduleChangeRequestRow['request_type'];
      requested_by: string;
      change_start_at: string;
      change_end_at: string;
      trade_start_at?: string | null;
      trade_end_at?: string | null;
      reason: string;
      respond_by_at: string;
      status?: ScheduleChangeRequestRow['status'];
      response_reason?: string | null;
      responded_by?: string | null;
      responded_at?: string | null;
      device_type?: string | null;
      undo_until?: string | null;
      applied_at?: string | null;
      created_at?: string;
    };
    Update: Partial<ScheduleChangeRequestRow>;
    Relationships: [];
  };
  schedule_change_request_children: {
    Row: ScheduleChangeRequestChildRow;
    Insert: {
      id?: string;
      request_id: string;
      child_id: string;
      created_at?: string;
    };
    Update: Partial<ScheduleChangeRequestChildRow>;
    Relationships: [];
  };
  schedule_templates: {
    Row: ScheduleTemplateRow;
    Insert: {
      id?: string;
      household_id: string;
      name: string;
      pattern_type: ScheduleTemplateRow['pattern_type'];
      cycle_days?: number;
      cycle_definition: Record<string, unknown>;
      start_date: string;
      end_date?: string | null;
      child_id?: string | null;
      created_by: string;
      created_at?: string;
    };
    Update: Partial<ScheduleTemplateRow>;
    Relationships: [];
  };
  calendar_holidays: {
    Row: CalendarHolidayRow;
    Insert: {
      id?: string;
      household_id: string;
      holiday_key: string;
      name: string;
      assigned_parent_id?: string | null;
      rule: CalendarHolidayRow['rule'];
      custom_start_date?: string | null;
      custom_end_date?: string | null;
      status?: CalendarHolidayRow['status'];
      created_by: string;
      created_at?: string;
    };
    Update: Partial<CalendarHolidayRow>;
    Relationships: [];
  };
  calendar_sync_settings: {
    Row: CalendarSyncSettingsRow;
    Insert: {
      id?: string;
      household_id: string;
      user_id: string;
      provider?: CalendarSyncSettingsRow['provider'];
      ics_token: string;
      send_mode?: CalendarSyncSettingsRow['send_mode'];
      is_connected?: boolean;
      last_synced_at?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: Partial<CalendarSyncSettingsRow>;
    Relationships: [];
  };
  custody_exchanges: {
    Row: CustodyExchangeRow;
    Insert: {
      id?: string;
      household_id: string;
      entry_id?: string | null;
      handed_over_by: string;
      received_by?: string | null;
      scheduled_time: string;
      actual_time: string;
      status?: CustodyExchangeRow['status'];
      dispute_reason?: string | null;
      notes?: string | null;
      created_by: string;
      created_at?: string;
    };
    Update: Partial<CustodyExchangeRow>;
    Relationships: [];
  };
  exchange_check_ins: {
    Row: ExchangeCheckInRow;
    Insert: {
      id?: string;
      household_id: string;
      exchange_id?: string | null;
      entry_id?: string | null;
      user_id: string;
      checked_in_at?: string;
      latitude: number;
      longitude: number;
      accuracy_meters?: number | null;
      address?: string | null;
      is_shared?: boolean;
      created_at?: string;
    };
    Update: Partial<ExchangeCheckInRow>;
    Relationships: [];
  };
  parenting_plans: {
    Row: ParentingPlanRow;
    Insert: {
      id?: string;
      household_id: string;
      title?: string;
      answers?: Record<string, unknown>;
      is_shared?: boolean;
      legal_review_completed?: boolean;
      created_by: string;
      created_at?: string;
      updated_at?: string;
    };
    Update: Partial<ParentingPlanRow>;
    Relationships: [];
  };
  household_pets: {
    Row: HouseholdPetRow;
    Insert: {
      id?: string;
      household_id: string;
      name: string;
      species?: string;
      breed?: string | null;
      notes?: string | null;
      created_by: string;
      created_at?: string;
    };
    Update: Partial<HouseholdPetRow>;
    Relationships: [];
  };
};
