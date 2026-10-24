import type {
  DeliveryResult,
  InAppNotificationRow,
  NotificationChannel,
  NotificationDeliveryLogRow,
  NotificationPreferencesRow,
  NotificationSourceModule,
  NotificationType,
} from '../supabase/phase4-notifications.types';

export interface HealthCheckResult {
  push: {
    status: 'Granted' | 'Denied' | 'Default';
    isReady: boolean;
    details: string;
  };
  sms: {
    status: 'Configured' | 'Simulated' | 'Disabled';
    isReady: boolean;
    details: string;
  };
  email: {
    status: 'Verified' | 'Pending' | 'Disabled';
    isReady: boolean;
    details: string;
  };
  overallHealthy: boolean;
}

export interface LogDeliveryAttemptParams {
  householdId: string;
  userId: string;
  eventType: string;
  channel: NotificationChannel;
  recipient: string;
  result: DeliveryResult;
  sourceModule?: NotificationSourceModule;
}

export type {
  DeliveryResult,
  InAppNotificationRow,
  NotificationChannel,
  NotificationDeliveryLogRow,
  NotificationPreferencesRow,
  NotificationSourceModule,
  NotificationType,
};
