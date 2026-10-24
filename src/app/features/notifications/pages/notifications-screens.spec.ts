import { provideLocationMocks } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { NotificationsService } from '../../../core/notifications/notifications.service';
import { SafetyModeService } from '../../../core/safety/safety-mode.service';
import { DeliveryLogPage } from '../delivery-log/delivery-log.page';
import { NotificationHealthCheckPage } from '../health-check/health-check.page';
import { MessageAlertPage } from '../message-alert/message-alert.page';
import { MessageStatusPage } from '../message-status/message-status.page';
import { NotificationSettingsPage } from '../notification-settings/notification-settings.page';
import { QuietWindowsPage } from '../quiet-windows/quiet-windows.page';
import { ReminderAlertPage } from '../reminder-alert/reminder-alert.page';

describe('Phase 4: Notifications Module Screens (NTF-SCR-01..04, B01..03)', () => {
  it('NotificationsService should run health checks and quiet hour checks', () => {
    TestBed.configureTestingModule({
      providers: [NotificationsService, SafetyModeService, provideRouter([])],
    });
    const service = TestBed.inject(NotificationsService);
    const health = service.runHealthCheck();

    expect(health.sms.status).toBe('Simulated');
    expect(health.email.status).toBe('Verified');
    expect(service.isQuietHoursActive()).toBe(false);
  });

  it('NotificationSettingsPage (NTF-SCR-01) should render escalation intervals', async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationSettingsPage],
      providers: [provideRouter([]), provideLocationMocks(), NotificationsService],
    }).compileComponents();

    const fixture = TestBed.createComponent(NotificationSettingsPage);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Notification Preferences',
    );
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'SMS Escalation Wait Time',
    );
  });

  it('NotificationHealthCheckPage (NTF-SCR-02) should render channel health diagnostics', async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationHealthCheckPage],
      providers: [provideRouter([]), provideLocationMocks(), NotificationsService],
    }).compileComponents();

    const fixture = TestBed.createComponent(NotificationHealthCheckPage);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Notification Health Check',
    );
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Web Push Notifications');
  });

  it('MessageStatusPage (NTF-SCR-03) should render delivery and first-read timeline', async () => {
    await TestBed.configureTestingModule({
      imports: [MessageStatusPage],
      providers: [provideRouter([]), provideLocationMocks()],
    }).compileComponents();

    const fixture = TestBed.createComponent(MessageStatusPage);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Message Delivery Status');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Message Sent');
  });

  it('QuietWindowsPage (NTF-SCR-04) should render quiet hours toggles', async () => {
    await TestBed.configureTestingModule({
      imports: [QuietWindowsPage],
      providers: [provideRouter([]), provideLocationMocks(), NotificationsService],
    }).compileComponents();

    const fixture = TestBed.createComponent(QuietWindowsPage);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Quiet Windows & Daily Limits',
    );
  });

  it('MessageAlertPage (NTF-SCR-B01) should render preview respectful of Safety Mode', async () => {
    await TestBed.configureTestingModule({
      imports: [MessageAlertPage],
      providers: [provideRouter([]), provideLocationMocks(), SafetyModeService],
    }).compileComponents();

    const fixture = TestBed.createComponent(MessageAlertPage);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Message Alert Preview');
  });

  it('ReminderAlertPage (NTF-SCR-B02) should render simulated calendar alert preview', async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderAlertPage],
      providers: [provideRouter([]), provideLocationMocks(), SafetyModeService],
    }).compileComponents();

    const fixture = TestBed.createComponent(ReminderAlertPage);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Reminder Alert Preview');
  });

  it('DeliveryLogPage (NTF-SCR-B03) should render audit table of outbound deliveries', async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryLogPage],
      providers: [provideRouter([]), provideLocationMocks(), NotificationsService],
    }).compileComponents();

    const fixture = TestBed.createComponent(DeliveryLogPage);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Notification Delivery Audit Log',
    );
  });
});
