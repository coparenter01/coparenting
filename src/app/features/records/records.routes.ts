import type { Routes } from '@angular/router';

export const RECORDS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/records-home/records-home.page').then((m) => m.RecordsHomePage),
    data: { screenId: 'REC-SCR-B01', title: 'Records Hub' },
  },
  {
    path: 'export',
    loadComponent: () =>
      import('./pages/create-export/create-export.page').then((m) => m.CreateExportPage),
    data: { screenId: 'REC-SCR-01', title: 'Create Export' },
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./pages/export-history/export-history.page').then((m) => m.ExportHistoryPage),
    data: { screenId: 'REC-SCR-02', title: 'Export History' },
  },
  {
    path: 'verify',
    loadComponent: () =>
      import('./pages/verify-record/verify-record.page').then((m) => m.VerifyRecordPage),
    data: { screenId: 'REC-SCR-03', title: 'Verify Record' },
  },
  {
    path: 'verify/:id',
    loadComponent: () =>
      import('./pages/verify-record/verify-record.page').then((m) => m.VerifyRecordPage),
    data: { screenId: 'REC-SCR-03', title: 'Verify Record' },
  },
  {
    path: 'journal',
    loadComponent: () =>
      import('./pages/journal-list/journal-list.page').then((m) => m.JournalListPage),
    data: { screenId: 'REC-SCR-04', title: 'Parenting Journal' },
  },
  {
    path: 'journal/new',
    loadComponent: () =>
      import('./pages/journal-entry-form/journal-entry-form.page').then(
        (m) => m.JournalEntryFormPage,
      ),
    data: { screenId: 'REC-SCR-05', title: 'New Journal Entry' },
  },
  {
    path: 'journal/:id/edit',
    loadComponent: () =>
      import('./pages/journal-entry-form/journal-entry-form.page').then(
        (m) => m.JournalEntryFormPage,
      ),
    data: { screenId: 'REC-SCR-05', title: 'Edit Journal Entry' },
  },
  {
    path: 'journal/:id',
    loadComponent: () =>
      import('./pages/journal-detail/journal-detail.page').then((m) => m.JournalDetailPage),
    data: { screenId: 'REC-SCR-06', title: 'Journal Entry Detail' },
  },
  {
    path: 'affidavit/new',
    loadComponent: () =>
      import('./pages/request-affidavit/request-affidavit.page').then(
        (m) => m.RequestAffidavitPage,
      ),
    data: { screenId: 'REC-SCR-07', title: 'Request Business Records Affidavit' },
  },
  {
    path: 'affidavits',
    loadComponent: () =>
      import('./pages/affidavit-requests/affidavit-requests.page').then(
        (m) => m.AffidavitRequestsPage,
      ),
    data: { screenId: 'REC-SCR-08', title: 'Affidavit Requests' },
  },
  {
    path: 'affidavits/review',
    loadComponent: () =>
      import('./pages/affidavit-reviews/affidavit-reviews.page').then(
        (m) => m.AffidavitReviewsPage,
      ),
    data: { screenId: 'REC-SCR-09', title: 'Affidavit Operations Review' },
  },
  {
    path: 'request',
    loadComponent: () =>
      import('./pages/public-records-request/public-records-request.page').then(
        (m) => m.PublicRecordsRequestPage,
      ),
    data: { screenId: 'REC-SCR-10', title: 'Public Records & Subpoenas' },
  },
  {
    path: 'court-notes',
    loadComponent: () =>
      import('./pages/court-notes/court-notes.page').then((m) => m.CourtNotesPage),
    data: { screenId: 'REC-SCR-11', title: 'Court Notes & Evidentiary Standard' },
  },
  {
    path: 'model-order',
    loadComponent: () =>
      import('./pages/model-order-language/model-order-language.page').then(
        (m) => m.ModelOrderLanguagePage,
      ),
    data: { screenId: 'REC-SCR-12', title: 'Model Order Language' },
  },
  {
    path: 'retention',
    loadComponent: () =>
      import('./pages/retention-policy/retention-policy.page').then((m) => m.RetentionPolicyPage),
    data: { screenId: 'REC-SCR-13', title: 'Retention Policy' },
  },
  {
    path: 'delete',
    loadComponent: () =>
      import('./pages/delete-data-request/delete-data-request.page').then(
        (m) => m.DeleteDataRequestPage,
      ),
    data: { screenId: 'REC-SCR-14', title: 'Ask to Delete Data' },
  },
  {
    path: 'legal-hold',
    loadComponent: () => import('./pages/legal-hold/legal-hold.page').then((m) => m.LegalHoldPage),
    data: { screenId: 'REC-SCR-15', title: 'Legal Hold' },
  },
];
