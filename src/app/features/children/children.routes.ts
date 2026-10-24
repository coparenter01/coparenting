import type { Routes } from '@angular/router';

export const CHILDREN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/children-list/children-list.page').then((m) => m.ChildrenListPage),
    data: { screenId: 'DOC-SCR-01', title: 'Children' },
  },
  {
    path: 'info',
    loadComponent: () =>
      import('./pages/child-information/child-information.page').then(
        (m) => m.ChildInformationPage,
      ),
    data: { screenId: 'DOC-SCR-02', title: 'Child information' },
  },
  {
    path: 'entry/new',
    loadComponent: () =>
      import('./pages/child-information-entry/child-information-entry.page').then(
        (m) => m.ChildInformationEntryPage,
      ),
    data: { screenId: 'DOC-SCR-03', title: 'Child information entry' },
  },
  {
    path: 'entry/:id',
    loadComponent: () =>
      import('./pages/child-entry-detail/child-entry-detail.page').then(
        (m) => m.ChildEntryDetailPage,
      ),
    data: { screenId: 'DOC-SCR-04', title: 'Child entry detail' },
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/wish-list/wish-list.page').then((m) => m.WishListPage),
    data: { screenId: 'DOC-SCR-10', title: 'Wish list' },
  },
  {
    path: 'tasks',
    loadComponent: () => import('./pages/task-lists/task-lists.page').then((m) => m.TaskListsPage),
    data: { screenId: 'DOC-SCR-11', title: 'Task lists' },
  },
  {
    path: 'emergency',
    loadComponent: () =>
      import('./pages/emergency-contacts/emergency-contacts.page').then(
        (m) => m.EmergencyContactsPage,
      ),
    data: { screenId: 'DOC-SCR-14', title: 'Emergency contacts' },
  },
];
