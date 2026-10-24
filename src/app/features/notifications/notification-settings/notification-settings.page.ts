import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationsService } from '../../../core/notifications/notifications.service';

@Component({
  selector: 'pp-notification-settings-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification-settings.page.html',
  styleUrls: ['./notification-settings.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationSettingsPage implements OnInit {
  private readonly notificationsService = inject(NotificationsService);
  private readonly authService = inject(AuthService);

  public smsWaitMinutes = 30;
  public emailWaitMinutes = 120;
  public eventReminderMinutes = 1440;
  public hearingReminderDays = 7;
  public agencyReminderDays = 3;
  public readonly isSaved = signal(false);

  public ngOnInit(): void {
    void this.initData();
  }

  private async initData(): Promise<void> {
    const userId = this.authService.user()?.id;
    if (userId) {
      await this.notificationsService.loadPreferences(userId);
      const prefs = this.notificationsService.preferences();
      if (prefs) {
        this.smsWaitMinutes = prefs.sms_wait_minutes;
        this.emailWaitMinutes = prefs.email_wait_minutes;
        this.eventReminderMinutes = prefs.event_reminder_minutes;
        this.hearingReminderDays = prefs.hearing_reminder_days;
        this.agencyReminderDays = prefs.agency_reminder_days;
      }
    }
  }

  public async onSave(): Promise<void> {
    const userId = this.authService.user()?.id;
    if (!userId) {
      return;
    }

    const ok = await this.notificationsService.updatePreferences(userId, {
      sms_wait_minutes: this.smsWaitMinutes,
      email_wait_minutes: this.emailWaitMinutes,
      event_reminder_minutes: this.eventReminderMinutes,
      hearing_reminder_days: this.hearingReminderDays,
      agency_reminder_days: this.agencyReminderDays,
    });

    if (ok) {
      this.isSaved.set(true);
      setTimeout(() => {
        this.isSaved.set(false);
      }, 2500);
    }
  }
}
