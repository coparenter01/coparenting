import type { Routes } from '@angular/router';

export const CALENDAR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./calendar-overview/calendar-overview.page').then((m) => m.CalendarOverviewPage),
    data: { screenId: 'CAL-SCR-01', title: 'Calendar (week view)' },
  },
  {
    path: 'add-event',
    loadComponent: () => import('./event-form/event-form.page').then((m) => m.EventFormPage),
    data: { screenId: 'CAL-SCR-02', title: 'Event form' },
  },
  {
    path: 'add-parenting-time',
    loadComponent: () =>
      import('./parenting-time-form/parenting-time-form.page').then((m) => m.ParentingTimeFormPage),
    data: { screenId: 'CAL-SCR-03', title: 'Parenting time form' },
  },
  {
    path: 'request-swap',
    loadComponent: () =>
      import('./schedule-change-request/schedule-change-request.page').then(
        (m) => m.ScheduleChangeRequestPage,
      ),
    data: { screenId: 'CAL-SCR-04', title: 'Schedule change request' },
  },
  {
    path: 'request-detail/:id',
    loadComponent: () =>
      import('./request-detail/request-detail.page').then((m) => m.RequestDetailPage),
    data: {
      screenId: 'CAL-SCR-05',
      title: 'Request detail, answer and undo',
    },
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./entry-history/entry-history.page').then((m) => m.EntryHistoryPage),
    data: { screenId: 'CAL-SCR-06', title: 'Entry and request history' },
  },
  {
    path: 'templates',
    loadComponent: () =>
      import('./schedule-templates/schedule-templates.page').then((m) => m.ScheduleTemplatesPage),
    data: {
      screenId: 'CAL-SCR-07',
      title: 'Schedule templates and builder',
    },
  },
  {
    path: 'holidays',
    loadComponent: () => import('./holidays/holidays.page').then((m) => m.HolidaysPage),
    data: { screenId: 'CAL-SCR-08', title: 'Holidays' },
  },
  {
    path: 'sync',
    loadComponent: () =>
      import('./calendar-sync/calendar-sync.page').then((m) => m.CalendarSyncPage),
    data: { screenId: 'CAL-SCR-09', title: 'Calendar sync settings' },
  },
  {
    path: 'exchanges',
    loadComponent: () =>
      import('./exchange-record/exchange-record.page').then((m) => m.ExchangeRecordPage),
    data: { screenId: 'CAL-SCR-10', title: 'Exchange record' },
  },
  {
    path: 'compliance',
    loadComponent: () =>
      import('./compliance-view/compliance-view.page').then((m) => m.ComplianceViewPage),
    data: { screenId: 'CAL-SCR-11', title: 'Compliance view' },
  },
  {
    path: 'plan-builder',
    loadComponent: () =>
      import('./parenting-plan-builder/parenting-plan-builder.page').then(
        (m) => m.ParentingPlanBuilderPage,
      ),
    data: { screenId: 'CAL-SCR-12', title: 'Parenting plan builder' },
  },
  {
    path: 'check-in',
    loadComponent: () => import('./check-in/check-in.page').then((m) => m.CheckInPage),
    data: { screenId: 'CAL-SCR-13', title: 'Check-in' },
  },
  {
    path: 'pets',
    loadComponent: () => import('./pets/pets.page').then((m) => m.PetsPage),
    data: { screenId: 'CAL-SCR-14', title: 'Pets' },
  },
];
