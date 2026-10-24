import type { Routes } from '@angular/router';

export const SUPPORT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/help-center/help-center.page').then((m) => m.HelpCenterPage),
    data: { screenId: 'SUP-SCR-01', title: 'Help' },
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search-results/search-results.page').then((m) => m.SearchResultsPage),
    data: { screenId: 'SUP-SCR-02', title: 'Help Search Results' },
  },
  {
    path: 'article/:id',
    loadComponent: () =>
      import('./pages/article-detail/article-detail.page').then((m) => m.ArticleDetailPage),
    data: { screenId: 'SUP-SCR-03', title: 'Help Article' },
  },
  {
    path: 'request',
    loadComponent: () =>
      import('./pages/new-request-form/new-request-form.page').then((m) => m.NewRequestFormPage),
    data: { screenId: 'SUP-SCR-04', title: 'Contact Support' },
  },
  {
    path: 'confirmation/:id',
    loadComponent: () =>
      import('./pages/request-confirmation/request-confirmation.page').then(
        (m) => m.RequestConfirmationPage,
      ),
    data: { screenId: 'SUP-SCR-05', title: 'Request Confirmation' },
  },
  {
    path: 'my-requests',
    loadComponent: () =>
      import('./pages/my-requests/my-requests.page').then((m) => m.MyRequestsPage),
    data: { screenId: 'SUP-SCR-06', title: 'My Requests' },
  },
  {
    path: 'thread/:id',
    loadComponent: () =>
      import('./pages/request-thread/request-thread.page').then((m) => m.RequestThreadPage),
    data: { screenId: 'SUP-SCR-07', title: 'Request Thread' },
  },
  {
    path: 'public-request',
    loadComponent: () =>
      import('./pages/sign-in-request-form/sign-in-request-form.page').then(
        (m) => m.SignInRequestFormPage,
      ),
    data: { screenId: 'SUP-SCR-08', title: 'Ask for Help' },
  },
  {
    path: 'staff/queue',
    loadComponent: () =>
      import('./pages/staff-queue/staff-queue.page').then((m) => m.StaffQueuePage),
    data: { screenId: 'SUP-SCR-09', title: 'Staff Support Queue' },
  },
  {
    path: 'staff/case/:id',
    loadComponent: () =>
      import('./pages/staff-case-view/staff-case-view.page').then((m) => m.StaffCaseViewPage),
    data: { screenId: 'SUP-SCR-10', title: 'Staff Case View' },
  },
  {
    path: 'staff/notices',
    loadComponent: () =>
      import('./pages/service-notices/service-notices.page').then((m) => m.ServiceNoticesPage),
    data: { screenId: 'SUP-SCR-11', title: 'Service Notices' },
  },
  {
    path: 'staff/articles',
    loadComponent: () =>
      import('./pages/help-article-editor/help-article-editor.page').then(
        (m) => m.HelpArticleEditorPage,
      ),
    data: { screenId: 'SUP-SCR-12', title: 'Help Article Editor' },
  },
  {
    path: 'staff/templates',
    loadComponent: () =>
      import('./pages/reply-templates/reply-templates.page').then((m) => m.ReplyTemplatesPage),
    data: { screenId: 'SUP-SCR-13', title: 'Reply Templates' },
  },
  {
    path: 'operations/measures',
    loadComponent: () =>
      import('./pages/support-measures/support-measures.page').then((m) => m.SupportMeasuresPage),
    data: { screenId: 'SUP-SCR-14', title: 'Support Measures Report' },
  },
];
