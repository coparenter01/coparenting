import type { Routes } from '@angular/router';

export const DOCUMENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/documents-list/documents-list.page').then((m) => m.DocumentsListPage),
    data: { screenId: 'DOC-SCR-05', title: 'Documents' },
  },
  {
    path: 'upload',
    loadComponent: () =>
      import('./pages/upload-document/upload-document.page').then((m) => m.UploadDocumentPage),
    data: { screenId: 'DOC-SCR-06', title: 'Upload document' },
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./pages/document-detail/document-detail.page').then((m) => m.DocumentDetailPage),
    data: { screenId: 'DOC-SCR-07', title: 'Document detail' },
  },
  {
    path: 'trash',
    loadComponent: () =>
      import('./pages/recently-deleted/recently-deleted.page').then((m) => m.RecentlyDeletedPage),
    data: { screenId: 'DOC-SCR-08', title: 'Recently deleted' },
  },
  {
    path: 'photos',
    loadComponent: () =>
      import('./pages/photo-albums/photo-albums.page').then((m) => m.PhotoAlbumsPage),
    data: { screenId: 'DOC-SCR-09', title: 'Photo albums' },
  },
  {
    path: 'share-links',
    loadComponent: () =>
      import('./pages/share-links/share-links.page').then((m) => m.ShareLinksPage),
    data: { screenId: 'DOC-SCR-12', title: 'Share links' },
  },
];
