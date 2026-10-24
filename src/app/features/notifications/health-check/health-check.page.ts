import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, type OnInit } from '@angular/core';
import { NotificationsService } from '../../../core/notifications/notifications.service';
import type { HealthCheckResult } from '../../../core/notifications/notifications.types';

@Component({
  selector: 'pp-health-check-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './health-check.page.html',
  styleUrls: ['./health-check.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationHealthCheckPage implements OnInit {
  private readonly notificationsService = inject(NotificationsService);

  public readonly healthData = signal<HealthCheckResult | null>(null);
  public readonly testSent = signal(false);

  public ngOnInit(): void {
    const res = this.notificationsService.runHealthCheck();
    this.healthData.set(res);
  }

  public onSendTest(): void {
    this.testSent.set(true);
    setTimeout(() => {
      this.testSent.set(false);
    }, 3000);
  }
}
