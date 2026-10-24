import type {
  AiToneFlagRow,
  InAppNotificationRow,
  NotificationDeliveryLogRow,
  NotificationPreferencesRow,
} from './phase4-notifications.types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Phase4NotificationsTables = {
  notification_preferences: {
    Row: NotificationPreferencesRow;
    Insert: {
      id?: string;
      user_id: string;
      push_enabled?: boolean;
      sms_enabled?: boolean;
      email_enabled?: boolean;
      sms_wait_minutes?: number;
      email_wait_minutes?: number;
      event_reminder_minutes?: number;
      hearing_reminder_days?: number;
      agency_reminder_days?: number;
      quiet_hours_enabled?: boolean;
      quiet_hours_start?: string;
      quiet_hours_end?: string;
      quiet_hours_allow_urgent?: boolean;
      max_alerts_per_day?: number;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      user_id?: string;
      push_enabled?: boolean;
      sms_enabled?: boolean;
      email_enabled?: boolean;
      sms_wait_minutes?: number;
      email_wait_minutes?: number;
      event_reminder_minutes?: number;
      hearing_reminder_days?: number;
      agency_reminder_days?: number;
      quiet_hours_enabled?: boolean;
      quiet_hours_start?: string;
      quiet_hours_end?: string;
      quiet_hours_allow_urgent?: boolean;
      max_alerts_per_day?: number;
      created_at?: string;
      updated_at?: string;
    };
    Relationships: [];
  };
  in_app_notifications: {
    Row: InAppNotificationRow;
    Insert: {
      id?: string;
      user_id: string;
      type: InAppNotificationRow['type'];
      title: string;
      body: string;
      link_url?: string | null;
      is_read?: boolean;
      created_at?: string;
    };
    Update: {
      id?: string;
      user_id?: string;
      type?: InAppNotificationRow['type'];
      title?: string;
      body?: string;
      link_url?: string | null;
      is_read?: boolean;
      created_at?: string;
    };
    Relationships: [];
  };
  notification_delivery_logs: {
    Row: NotificationDeliveryLogRow;
    Insert: {
      id?: string;
      household_id: string;
      user_id: string;
      event_type: string;
      channel: NotificationDeliveryLogRow['channel'];
      recipient: string;
      attempt_time?: string;
      result: NotificationDeliveryLogRow['result'];
      retry_count?: number;
      source_module?: NotificationDeliveryLogRow['source_module'];
    };
    Update: {
      id?: string;
      household_id?: string;
      user_id?: string;
      event_type?: string;
      channel?: NotificationDeliveryLogRow['channel'];
      recipient?: string;
      attempt_time?: string;
      result?: NotificationDeliveryLogRow['result'];
      retry_count?: number;
      source_module?: NotificationDeliveryLogRow['source_module'];
    };
    Relationships: [];
  };
  ai_tone_flags: {
    Row: AiToneFlagRow;
    Insert: {
      id?: string;
      user_id: string;
      original_text: string;
      flag_category: string;
      severity: AiToneFlagRow['severity'];
      suggested_rewrite?: string | null;
      accepted_rewrite?: boolean;
      created_at?: string;
    };
    Update: {
      id?: string;
      user_id?: string;
      original_text?: string;
      flag_category?: string;
      severity?: AiToneFlagRow['severity'];
      suggested_rewrite?: string | null;
      accepted_rewrite?: boolean;
      created_at?: string;
    };
    Relationships: [];
  };
};
