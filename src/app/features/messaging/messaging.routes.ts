import type { Routes } from '@angular/router';

export const MESSAGING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./threads-list/threads-list.page').then((m) => m.ThreadsListPage),
    data: { screenId: 'MSG-SCR-01', title: 'Messages' },
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./compose-message/compose-message.page').then((m) => m.ComposeMessagePage),
    data: { screenId: 'MSG-SCR-03', title: 'New Message' },
  },
  {
    path: 'drafts',
    loadComponent: () => import('./drafts-list/drafts-list.page').then((m) => m.DraftsListPage),
    data: { screenId: 'MSG-SCR-04', title: 'Drafts' },
  },
  {
    path: 'ai-settings',
    loadComponent: () => import('./ai-settings/ai-settings.page').then((m) => m.AiSettingsPage),
    data: { screenId: 'MSG-SCR-05', title: 'AI & Shield Settings' },
  },
  {
    path: 'held/:id',
    loadComponent: () => import('./held-message/held-message.page').then((m) => m.HeldMessagePage),
    data: { screenId: 'MSG-SCR-06', title: 'Held Message' },
  },
  {
    path: 'report/:id',
    loadComponent: () =>
      import('./report-message/report-message.page').then((m) => m.ReportMessagePage),
    data: { screenId: 'MSG-SCR-07', title: 'Report Message' },
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./search-messages/search-messages.page').then((m) => m.SearchMessagesPage),
    data: { screenId: 'MSG-SCR-08', title: 'Search Messages' },
  },
  {
    path: 'folders',
    loadComponent: () => import('./folders/folders.page').then((m) => m.FoldersPage),
    data: { screenId: 'MSG-SCR-09', title: 'Folders and Topics' },
  },
  {
    path: 'attachments',
    loadComponent: () => import('./attachments/attachments.page').then((m) => m.AttachmentsPage),
    data: { screenId: 'MSG-SCR-10', title: 'Attachments' },
  },
  {
    path: 'ai-coach',
    loadComponent: () => import('./ai-coach/ai-coach.page').then((m) => m.AiCoachPage),
    data: { screenId: 'MSG-SCR-12', title: 'AI Coach' },
  },
  {
    path: 'mediation',
    loadComponent: () =>
      import('./mediation-request/mediation-request.page').then((m) => m.MediationRequestPage),
    data: { screenId: 'MSG-SCR-13', title: 'Request Mediation' },
  },
  {
    path: 'ai-rewrite',
    loadComponent: () => import('./ai-rewrite/ai-rewrite.page').then((m) => m.AiRewritePage),
    data: { screenId: 'MSG-SCR-B01', title: 'AI Rewrite' },
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./thread-detail/thread-detail.page').then((m) => m.ThreadDetailPage),
    data: { screenId: 'MSG-SCR-02', title: 'Conversation' },
  },
  {
    path: ':id/members',
    loadComponent: () =>
      import('./group-members/group-members.page').then((m) => m.GroupMembersPage),
    data: { screenId: 'MSG-SCR-11', title: 'Thread Members' },
  },
];
