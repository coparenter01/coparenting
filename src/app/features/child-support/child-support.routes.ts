import type { Routes } from '@angular/router';

export const CHILD_SUPPORT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/css-overview/css-overview.page').then((m) => m.CssOverviewPage),
    data: { screenId: 'CSS-SCR-03', title: 'Child Support' },
  },
  {
    path: 'link',
    loadComponent: () => import('./pages/link-case/link-case.page').then((m) => m.LinkCasePage),
    data: { screenId: 'CSS-SCR-01', title: 'Link a case' },
  },
  {
    path: 'consent',
    loadComponent: () => import('./pages/consent/consent.page').then((m) => m.ConsentPage),
    data: { screenId: 'CSS-SCR-02', title: 'Scope of sync & consent' },
  },
  {
    path: 'payments-comparison',
    loadComponent: () =>
      import('./pages/payments-comparison/payments-comparison.page').then(
        (m) => m.PaymentsComparisonPage,
      ),
    data: { screenId: 'CSS-SCR-04', title: 'Payments side by side' },
  },
  {
    path: 'due-dates',
    loadComponent: () => import('./pages/due-dates/due-dates.page').then((m) => m.DueDatesPage),
    data: { screenId: 'CSS-SCR-05', title: 'Due dates & reminder times' },
  },
  {
    path: 'agency-calendar',
    loadComponent: () =>
      import('./pages/agency-calendar/agency-calendar.page').then((m) => m.AgencyCalendarPage),
    data: { screenId: 'CSS-SCR-06', title: 'Agency items in calendar' },
  },
  {
    path: 'share-item',
    loadComponent: () => import('./pages/share-item/share-item.page').then((m) => m.ShareItemPage),
    data: { screenId: 'CSS-SCR-07', title: 'Share an item' },
  },
  {
    path: 'shared-items',
    loadComponent: () =>
      import('./pages/shared-items/shared-items.page').then((m) => m.SharedItemsPage),
    data: { screenId: 'CSS-SCR-08', title: 'Shared with you' },
  },
  {
    path: 'unlink-export',
    loadComponent: () =>
      import('./pages/unlink-export/unlink-export.page').then((m) => m.UnlinkExportPage),
    data: { screenId: 'CSS-SCR-09', title: 'Unlink and export' },
  },
  {
    path: 'send-proof',
    loadComponent: () => import('./pages/send-proof/send-proof.page').then((m) => m.SendProofPage),
    data: { screenId: 'CSS-SCR-10', title: 'Send proof to agency' },
  },
  {
    path: 'proof-package',
    loadComponent: () =>
      import('./pages/proof-package/proof-package.page').then((m) => m.ProofPackagePage),
    data: { screenId: 'CSS-SCR-11', title: 'Proof package' },
  },
  {
    path: 'safety-offer',
    loadComponent: () =>
      import('./pages/safety-offer/safety-offer.page').then((m) => m.SafetyOfferPage),
    data: { screenId: 'CSS-SCR-12', title: 'Offer of Safety Mode' },
  },
  {
    path: 'agency-invite',
    loadComponent: () =>
      import('./pages/agency-invite/agency-invite.page').then((m) => m.AgencyInvitePage),
    data: { screenId: 'CSS-SCR-13', title: 'Invite through agency notice' },
  },
  {
    path: 'timeline',
    loadComponent: () => import('./pages/timeline/timeline.page').then((m) => m.TimelinePage),
    data: { screenId: 'CSS-SCR-14', title: 'Timeline' },
  },
  {
    path: 'hearing-packet',
    loadComponent: () =>
      import('./pages/hearing-packet/hearing-packet.page').then((m) => m.HearingPacketPage),
    data: { screenId: 'CSS-SCR-15', title: 'Hearing packet' },
  },
  {
    path: 'load-log',
    loadComponent: () => import('./pages/load-log/load-log.page').then((m) => m.LoadLogPage),
    data: { screenId: 'CSS-SCR-16', title: 'Load log for operations' },
  },
];
