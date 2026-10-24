export type NotificationChannel = 'Push' | 'SMS' | 'Email';

export type NotificationType = 'Message' | 'Reminder' | 'Hearing' | 'Agency' | 'System' | 'Urgent';

export type DeliveryResult = 'Delivered' | 'Sent' | 'Failed' | 'Delayed_Quiet_Hours';

export type NotificationSourceModule =
  'Messaging' | 'Calendar' | 'Child Support' | 'Expenses' | 'Safety' | 'System';

export type ToneSeverity = 'Notice' | 'Warning' | 'Shield_Held';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type NotificationPreferencesRow = {
  id: string;
  user_id: string;
  push_enabled: boolean;
  sms_enabled: boolean;
  email_enabled: boolean;
  sms_wait_minutes: number;
  email_wait_minutes: number;
  event_reminder_minutes: number;
  hearing_reminder_days: number;
  agency_reminder_days: number;
  quiet_hours_enabled: boolean;
  quiet_hours_start: string;
  quiet_hours_end: string;
  quiet_hours_allow_urgent: boolean;
  max_alerts_per_day: number;
  created_at: string;
  updated_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type InAppNotificationRow = {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  body: string;
  link_url: string | null;
  is_read: boolean;
  created_at: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type NotificationDeliveryLogRow = {
  id: string;
  household_id: string;
  user_id: string;
  event_type: string;
  channel: NotificationChannel;
  recipient: string;
  attempt_time: string;
  result: DeliveryResult;
  retry_count: number;
  source_module: NotificationSourceModule;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AiToneFlagRow = {
  id: string;
  user_id: string;
  original_text: string;
  flag_category: string;
  severity: ToneSeverity;
  suggested_rewrite: string | null;
  accepted_rewrite: boolean;
  created_at: string;
};
