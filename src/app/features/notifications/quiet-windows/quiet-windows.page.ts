import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationsService } from '../../../core/notifications/notifications.service';

@Component({
  selector: 'pp-quiet-windows-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiet-windows.page.html',
  styleUrls: ['./quiet-windows.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuietWindowsPage implements OnInit {
  private readonly notificationsService = inject(NotificationsService);
  private readonly authService = inject(AuthService);

  public quietHoursEnabled = false;
  public quietStart = '21:00';
  public quietEnd = '07:00';
  public allowUrgent = true;
  public maxAlertsPerDay = 20;
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
        this.quietHoursEnabled = prefs.quiet_hours_enabled;
        this.quietStart = prefs.quiet_hours_start;
        this.quietEnd = prefs.quiet_hours_end;
        this.allowUrgent = prefs.quiet_hours_allow_urgent;
        this.maxAlertsPerDay = prefs.max_alerts_per_day;
      }
    }
  }

  public async onSave(): Promise<void> {
    const userId = this.authService.user()?.id;
    if (!userId) {
      return;
    }

    const ok = await this.notificationsService.updatePreferences(userId, {
      quiet_hours_enabled: this.quietHoursEnabled,
      quiet_hours_start: this.quietStart,
      quiet_hours_end: this.quietEnd,
      quiet_hours_allow_urgent: this.allowUrgent,
      max_alerts_per_day: this.maxAlertsPerDay,
    });

    if (ok) {
      this.isSaved.set(true);
      setTimeout(() => {
        this.isSaved.set(false);
      }, 2500);
    }
  }
}
