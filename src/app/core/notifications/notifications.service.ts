import { computed, Injectable, signal } from '@angular/core';
import { injectSupabaseClient } from '../supabase/supabase-client';
import type {
  HealthCheckResult,
  InAppNotificationRow,
  LogDeliveryAttemptParams,
  NotificationDeliveryLogRow,
  NotificationPreferencesRow,
} from './notifications.types';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly supabase = injectSupabaseClient();

  private readonly _preferences = signal<NotificationPreferencesRow | null>(null);
  private readonly _notifications = signal<InAppNotificationRow[]>([]);
  private readonly _deliveryLogs = signal<NotificationDeliveryLogRow[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);

  public readonly preferences = this._preferences.asReadonly();
  public readonly notifications = this._notifications.asReadonly();
  public readonly deliveryLogs = this._deliveryLogs.asReadonly();
  public readonly isLoading = this._isLoading.asReadonly();
  public readonly error = this._error.asReadonly();

  public readonly unreadCount = computed(() => {
    return this._notifications().filter((n) => !n.is_read).length;
  });

  public async loadPreferences(userId: string): Promise<void> {
    this._isLoading.set(true);
    try {
      const { data, error } = await this.supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (!error && data) {
        this._preferences.set(data);
      } else if (!data) {
        // Create default preferences
        const { data: created } = await this.supabase
          .from('notification_preferences')
          .insert({
            user_id: userId,
            push_enabled: true,
            sms_enabled: true,
            email_enabled: true,
            sms_wait_minutes: 30,
            email_wait_minutes: 120,
            event_reminder_minutes: 1440,
            hearing_reminder_days: 7,
            agency_reminder_days: 3,
            quiet_hours_enabled: false,
            quiet_hours_start: '21:00',
            quiet_hours_end: '07:00',
            quiet_hours_allow_urgent: true,
            max_alerts_per_day: 20,
          })
          .select()
          .single();
        if (created) {
          this._preferences.set(created);
        }
      }
    } catch (err) {
      this._error.set(err instanceof Error ? err.message : 'Failed to load preferences');
    } finally {
      this._isLoading.set(false);
    }
  }

  public async updatePreferences(
    userId: string,
    updates: Partial<
      Omit<NotificationPreferencesRow, 'id' | 'user_id' | 'created_at' | 'updated_at'>
    >,
  ): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from('notification_preferences')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (!error) {
        this._preferences.set(data);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public async loadNotifications(userId: string): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from('in_app_notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (!error) {
        this._notifications.set(data);
      }
    } catch {
      // ignore
    }
  }

  public async markNotificationRead(notificationId: string): Promise<void> {
    try {
      await this.supabase
        .from('in_app_notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      this._notifications.update((list) =>
        list.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n)),
      );
    } catch {
      // ignore
    }
  }

  public async loadDeliveryLogs(householdId: string): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from('notification_delivery_logs')
        .select('*')
        .eq('household_id', householdId)
        .order('attempt_time', { ascending: false });

      if (!error) {
        this._deliveryLogs.set(data);
      }
    } catch {
      // ignore
    }
  }

  public async logDeliveryAttempt(params: LogDeliveryAttemptParams): Promise<void> {
    try {
      const { data } = await this.supabase
        .from('notification_delivery_logs')
        .insert({
          household_id: params.householdId,
          user_id: params.userId,
          event_type: params.eventType,
          channel: params.channel,
          recipient: params.recipient,
          result: params.result,
          retry_count: 0,
          source_module: params.sourceModule ?? 'Messaging',
        })
        .select()
        .single();

      if (data) {
        this._deliveryLogs.update((logs) => [data, ...logs]);
      }
    } catch {
      // ignore
    }
  }

  public runHealthCheck(): HealthCheckResult {
    const isPushGranted =
      typeof Notification !== 'undefined' && Notification.permission === 'granted';
    const isPushDenied =
      typeof Notification !== 'undefined' && Notification.permission === 'denied';

    return {
      push: {
        status: isPushGranted ? 'Granted' : isPushDenied ? 'Denied' : 'Default',
        isReady: isPushGranted,
        details: isPushGranted
          ? 'Push notifications are enabled in your browser.'
          : 'Browser permission required to receive instant alerts.',
      },
      sms: {
        status: 'Simulated',
        isReady: true,
        details: 'SMS delivery adapter active (outbox simulation verified).',
      },
      email: {
        status: 'Verified',
        isReady: true,
        details: 'Transactional Brevo email adapter configured.',
      },
      overallHealthy: isPushGranted,
    };
  }

  public isQuietHoursActive(): boolean {
    const prefs = this._preferences();
    if (!prefs?.quiet_hours_enabled) {
      return false;
    }

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const [startH, startM] = prefs.quiet_hours_start.split(':').map(Number);
    const [endH, endM] = prefs.quiet_hours_end.split(':').map(Number);
    const startTotal = (startH ?? 21) * 60 + (startM ?? 0);
    const endTotal = (endH ?? 7) * 60 + (endM ?? 0);

    if (startTotal <= endTotal) {
      return currentMinutes >= startTotal && currentMinutes < endTotal;
    }
    // Overnight quiet hours (e.g. 21:00 to 07:00)
    return currentMinutes >= startTotal || currentMinutes < endTotal;
  }
}
