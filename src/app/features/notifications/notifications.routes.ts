import type { Routes } from '@angular/router';

export const NOTIFICATIONS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'settings',
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./notification-settings/notification-settings.page').then(
        (m) => m.NotificationSettingsPage,
      ),
    data: { screenId: 'NTF-SCR-01', title: 'Notification Settings' },
  },
  {
    path: 'health-check',
    loadComponent: () =>
      import('./health-check/health-check.page').then((m) => m.NotificationHealthCheckPage),
    data: { screenId: 'NTF-SCR-02', title: 'Health Check' },
  },
  {
    path: 'status/:id',
    loadComponent: () =>
      import('./message-status/message-status.page').then((m) => m.MessageStatusPage),
    data: { screenId: 'NTF-SCR-03', title: 'Message Delivery Status' },
  },
  {
    path: 'quiet-windows',
    loadComponent: () =>
      import('./quiet-windows/quiet-windows.page').then((m) => m.QuietWindowsPage),
    data: { screenId: 'NTF-SCR-04', title: 'Quiet Windows' },
  },
  {
    path: 'alert-preview',
    loadComponent: () =>
      import('./message-alert/message-alert.page').then((m) => m.MessageAlertPage),
    data: { screenId: 'NTF-SCR-B01', title: 'Message Alert' },
  },
  {
    path: 'reminder-preview',
    loadComponent: () =>
      import('./reminder-alert/reminder-alert.page').then((m) => m.ReminderAlertPage),
    data: { screenId: 'NTF-SCR-B02', title: 'Reminder Alert' },
  },
  {
    path: 'delivery-log',
    loadComponent: () => import('./delivery-log/delivery-log.page').then((m) => m.DeliveryLogPage),
    data: { screenId: 'NTF-SCR-B03', title: 'Delivery Log' },
  },
];
