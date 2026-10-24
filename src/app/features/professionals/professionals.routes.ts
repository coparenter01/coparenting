import type { Routes } from '@angular/router';

export const PROFESSIONALS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/professionals-list/professionals-list.page').then(
        (m) => m.ProfessionalsListPage,
      ),
    data: { screenId: 'PRO-SCR-01', title: 'My professionals' },
  },
  {
    path: 'invite',
    loadComponent: () =>
      import('./pages/invite-professional/invite-professional.page').then(
        (m) => m.InviteProfessionalPage,
      ),
    data: { screenId: 'PRO-SCR-02', title: 'Invite a professional' },
  },
  {
    path: 'share',
    loadComponent: () => import('./pages/share-item/share-item.page').then((m) => m.ShareItemPage),
    data: { screenId: 'PRO-SCR-04', title: 'Share an item' },
  },
  {
    path: 'access-log',
    loadComponent: () => import('./pages/access-log/access-log.page').then((m) => m.AccessLogPage),
    data: { screenId: 'PRO-SCR-05', title: 'Access log' },
  },
  {
    path: 'message',
    loadComponent: () =>
      import('./pages/send-message/send-message.page').then((m) => m.SendMessagePage),
    data: { screenId: 'PRO-SCR-09', title: 'Send message' },
  },
  {
    path: 'accept/:token',
    loadComponent: () =>
      import('./pages/accept-invite/accept-invite.page').then((m) => m.AcceptInvitePage),
    data: { screenId: 'PRO-SCR-06', title: 'Accept invitation' },
  },
  {
    path: 'portal',
    loadComponent: () =>
      import('./pages/professional-home/professional-home.page').then(
        (m) => m.ProfessionalHomePage,
      ),
    data: { screenId: 'PRO-SCR-07', title: 'Professional workspace' },
  },
  {
    path: 'portal/client/:clientId',
    loadComponent: () =>
      import('./pages/client-view/client-view.page').then((m) => m.ClientViewPage),
    data: { screenId: 'PRO-SCR-08', title: 'Client view' },
  },
  {
    path: 'portal/messages',
    loadComponent: () =>
      import('./pages/client-messages/client-messages.page').then((m) => m.ClientMessagesPage),
    data: { screenId: 'PRO-SCR-10', title: 'Messages from parents' },
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/access-settings/access-settings.page').then((m) => m.AccessSettingsPage),
    data: { screenId: 'PRO-SCR-03', title: 'Access settings' },
  },
];
