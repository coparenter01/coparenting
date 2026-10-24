import type { Routes } from '@angular/router';

export const CALLING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./call-log/call-log.page').then((m) => m.CallLogPage),
    data: { screenId: 'CLL-SCR-06', title: 'Call Log' },
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./calling-settings/calling-settings.page').then((m) => m.CallingSettingsPage),
    data: { screenId: 'CLL-SCR-01', title: 'Calling Settings' },
  },
  {
    path: 'new',
    loadComponent: () => import('./place-call/place-call.page').then((m) => m.PlaceCallPage),
    data: { screenId: 'CLL-SCR-02', title: 'New Call' },
  },
  {
    path: 'incoming',
    loadComponent: () =>
      import('./incoming-call/incoming-call.page').then((m) => m.IncomingCallPage),
    data: { screenId: 'CLL-SCR-03', title: 'Incoming Call' },
  },
  {
    path: 'active',
    loadComponent: () => import('./call-screen/call-screen.page').then((m) => m.CallScreenPage),
    data: { screenId: 'CLL-SCR-04', title: 'Active Call' },
  },
  {
    path: 'recording-request',
    loadComponent: () =>
      import('./recording-request/recording-request.page').then((m) => m.RecordingRequestPage),
    data: { screenId: 'CLL-SCR-05', title: 'Recording Request' },
  },
  {
    path: 'consent-log',
    loadComponent: () => import('./consent-log/consent-log.page').then((m) => m.ConsentLogPage),
    data: { screenId: 'CLL-SCR-07', title: 'Consent Log' },
  },
];
