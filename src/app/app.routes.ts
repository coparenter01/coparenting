import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/app-shell/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/accounts/pages/home/home.page').then((m) => m.HomePage),
        data: { screenId: 'ACC-SCR-19', title: 'Home' },
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('./features/messaging/messaging.routes').then((m) => m.MESSAGING_ROUTES),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./features/notifications/notifications.routes').then(
            (m) => m.NOTIFICATIONS_ROUTES,
          ),
      },
      {
        path: 'calls',
        loadChildren: () =>
          import('./features/calling/calling.routes').then((m) => m.CALLING_ROUTES),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./features/calendar/calendar.routes').then((m) => m.CALENDAR_ROUTES),
      },
      {
        path: 'expenses',
        loadChildren: () =>
          import('./features/expenses/expenses.routes').then((m) => m.EXPENSES_ROUTES),
      },
      {
        path: 'child-support',
        loadChildren: () =>
          import('./features/child-support/child-support.routes').then(
            (m) => m.CHILD_SUPPORT_ROUTES,
          ),
      },
      {
        path: 'children',
        loadChildren: () =>
          import('./features/children/children.routes').then((m) => m.CHILDREN_ROUTES),
      },
      {
        path: 'documents',
        loadChildren: () =>
          import('./features/children/documents.routes').then((m) => m.DOCUMENTS_ROUTES),
      },
      {
        path: 'records',
        loadChildren: () =>
          import('./features/records/records.routes').then((m) => m.RECORDS_ROUTES),
      },
      {
        path: 'professionals',
        loadChildren: () =>
          import('./features/professionals/professionals.routes').then(
            (m) => m.PROFESSIONALS_ROUTES,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/accounts/pages/settings/settings.page').then((m) => m.SettingsPage),
        data: { screenId: 'ACC-SCR-20', title: 'Settings' },
      },
      {
        path: 'settings/app-lock',
        loadComponent: () =>
          import('./features/accounts/pages/app-lock-settings/app-lock-settings.page').then(
            (m) => m.AppLockSettingsPage,
          ),
        data: { screenId: 'ACC-SCR-04', title: 'Security and app lock' },
      },
      {
        path: 'help',
        loadChildren: () =>
          import('./features/support/support.routes').then((m) => m.SUPPORT_ROUTES),
      },
      {
        path: 'safety',
        loadComponent: () =>
          import('./features/safety/pages/safety-settings/safety-settings.page').then(
            (m) => m.SafetySettingsPage,
          ),
        data: { screenId: 'SAF-SCR-01', title: 'Safety Mode settings' },
      },
      {
        path: 'safety/turn-on',
        loadComponent: () =>
          import('./features/safety/pages/safety-notice/safety-notice.page').then(
            (m) => m.SafetyNoticePage,
          ),
        data: { screenId: 'SAF-SCR-02', title: 'Safety notice and confirm' },
      },
      {
        path: 'safety/turn-off',
        loadComponent: () =>
          import('./features/safety/pages/safety-turn-off/safety-turn-off.page').then(
            (m) => m.SafetyTurnOffPage,
          ),
        data: { screenId: 'SAF-SCR-03', title: 'Enter code to turn off' },
      },
      {
        path: 'safety/exit-neutral',
        loadComponent: () =>
          import('./features/safety/pages/exit-neutral/exit-neutral.page').then(
            (m) => m.ExitNeutralPage,
          ),
        data: { screenId: 'SAF-SCR-04', title: 'Exit now and neutral page' },
      },
      {
        path: 'safety/family-violence-offer',
        loadComponent: () =>
          import('./features/safety/pages/family-violence-offer/family-violence-offer.page').then(
            (m) => m.FamilyViolenceOfferPage,
          ),
        data: { screenId: 'SAF-SCR-06', title: 'Offer from family violence flag' },
      },
      {
        path: 'safety/alerts-images',
        loadComponent: () =>
          import('./features/safety/pages/alerts-images-settings/alerts-images-settings.page').then(
            (m) => m.AlertsImagesSettingsPage,
          ),
        data: { screenId: 'SAF-SCR-07', title: 'Alerts and images settings' },
      },
      {
        path: 'safety/alerts-warning',
        loadComponent: () =>
          import('./features/safety/pages/alerts-warning/alerts-warning.page').then(
            (m) => m.AlertsWarningPage,
          ),
        data: { screenId: 'SAF-SCR-08', title: 'Warning for Name and text' },
      },
      {
        path: 'safety/hidden-image',
        loadComponent: () =>
          import('./features/safety/pages/hidden-image-preview/hidden-image-preview.page').then(
            (m) => m.HiddenImagePreviewPage,
          ),
        data: { screenId: 'SAF-SCR-09', title: 'Hidden image placeholder' },
      },
      {
        path: 'safety/ai-data',
        loadComponent: () =>
          import('./features/safety/pages/ai-data/ai-data.page').then((m) => m.AiDataPage),
        data: { screenId: 'SAF-SCR-10', title: 'AI and your data' },
      },
      {
        path: 'safety/ai-log',
        loadComponent: () =>
          import('./features/safety/pages/ai-use-log/ai-use-log.page').then((m) => m.AiUseLogPage),
        data: { screenId: 'SAF-SCR-11', title: 'AI use log' },
      },
      {
        path: 'safety/exit-confirmation',
        loadComponent: () =>
          import('./features/safety/pages/exit-confirmation/exit-confirmation.page').then(
            (m) => m.ExitConfirmationPage,
          ),
        data: { screenId: 'SAF-SCR-12', title: 'Exit now confirmation' },
      },
      {
        path: 'accounts/household',
        loadComponent: () =>
          import('./features/accounts/pages/household-overview/household-overview.page').then(
            (m) => m.HouseholdOverviewPage,
          ),
        data: { screenId: 'ACC-SCR-B01', title: 'Household overview' },
      },
      {
        path: 'accounts/invite-coparent',
        loadComponent: () =>
          import('./features/accounts/pages/invite-coparent/invite-coparent.page').then(
            (m) => m.InviteCoParentPage,
          ),
        data: { screenId: 'ACC-SCR-05', title: 'Invite co-parent' },
      },
      {
        path: 'accounts/invites',
        loadComponent: () =>
          import('./features/accounts/pages/invite-list/invite-list.page').then(
            (m) => m.InviteListPage,
          ),
        data: { screenId: 'ACC-SCR-06', title: 'Invite list and status' },
      },
      {
        path: 'accounts/contact-nonapp',
        loadComponent: () =>
          import('./features/accounts/pages/contact-nonapp/contact-nonapp.page').then(
            (m) => m.ContactNonAppPage,
          ),
        data: { screenId: 'ACC-SCR-09', title: 'Contact co-parent not on app' },
      },
      {
        path: 'accounts/contact-attempts',
        loadComponent: () =>
          import('./features/accounts/pages/contact-attempt-log/contact-attempt-log.page').then(
            (m) => m.ContactAttemptLogPage,
          ),
        data: { screenId: 'ACC-SCR-10', title: 'Contact-attempt log' },
      },
      {
        path: 'accounts/household/members',
        loadComponent: () =>
          import('./features/accounts/pages/household-members/household-members.page').then(
            (m) => m.HouseholdMembersPage,
          ),
        data: { screenId: 'ACC-SCR-12', title: 'Household members and roles' },
      },
      {
        path: 'accounts/profile',
        loadComponent: () =>
          import('./features/accounts/pages/profile/profile.page').then((m) => m.ProfilePage),
        data: { screenId: 'ACC-SCR-16', title: 'Profile' },
      },
      {
        path: 'accounts/settings/session',
        loadComponent: () =>
          import('./features/accounts/pages/session-draft-settings/session-draft-settings.page').then(
            (m) => m.SessionDraftSettingsPage,
          ),
        data: { screenId: 'ACC-SCR-11', title: 'Session and draft settings' },
      },
      {
        path: 'accounts/close-account',
        loadComponent: () =>
          import('./features/accounts/pages/close-account/close-account.page').then(
            (m) => m.CloseAccountPage,
          ),
        data: { screenId: 'ACC-SCR-18', title: 'Close account' },
      },
      {
        path: 'notifications/send-status',
        loadComponent: () =>
          import('./features/accounts/pages/system-send-status/system-send-status.page').then(
            (m) => m.SystemSendStatusPage,
          ),
        data: { screenId: 'NTF-SCR-B04', title: 'System send status' },
      },
      {
        path: 'dev/ui',
        loadComponent: () =>
          import('./features/dev/pages/ui-gallery/ui-gallery.page').then((m) => m.UiGalleryPage),
        data: { screenId: 'DEV-UI-01', title: 'UI Gallery' },
      },
    ],
  },
  // Public Authentication & Onboarding Screens (outside app shell)
  {
    path: 'auth/create-account',
    loadComponent: () =>
      import('./features/accounts/pages/create-account/create-account.page').then(
        (m) => m.CreateAccountPage,
      ),
    data: { screenId: 'ACC-SCR-01', title: 'Create account' },
  },
  {
    path: 'auth/sign-in',
    loadComponent: () =>
      import('./features/accounts/pages/sign-in/sign-in.page').then((m) => m.SignInPage),
    data: { screenId: 'ACC-SCR-02', title: 'Sign in' },
  },
  {
    path: 'auth/second-check',
    loadComponent: () =>
      import('./features/accounts/pages/second-check/second-check.page').then(
        (m) => m.SecondCheckPage,
      ),
    data: { screenId: 'ACC-SCR-03', title: 'Second check' },
  },
  {
    path: 'auth/verify-email',
    loadComponent: () =>
      import('./features/accounts/pages/verify-email/verify-email.page').then(
        (m) => m.VerifyEmailPage,
      ),
    data: { screenId: 'ACC-SCR-14', title: 'Verify email' },
  },
  {
    path: 'auth/reset-password',
    loadComponent: () =>
      import('./features/accounts/pages/reset-password/reset-password.page').then(
        (m) => m.ResetPasswordPage,
      ),
    data: { screenId: 'ACC-SCR-15', title: 'Reset password' },
  },
  {
    path: 'auth/passcode',
    loadComponent: () =>
      import('./features/accounts/pages/enter-passcode/enter-passcode.page').then(
        (m) => m.EnterPasscodePage,
      ),
    data: { screenId: 'ACC-SCR-17', title: 'Enter passcode' },
  },
  {
    path: 'accounts/choose-solo-mode',
    loadComponent: () =>
      import('./features/accounts/pages/choose-solo-mode/choose-solo-mode.page').then(
        (m) => m.ChooseSoloModePage,
      ),
    data: { screenId: 'ACC-SCR-08', title: 'Choose Solo Mode' },
  },
  {
    path: 'accounts/accept-invite',
    loadComponent: () =>
      import('./features/accounts/pages/accept-invite/accept-invite.page').then(
        (m) => m.AcceptInvitePage,
      ),
    data: { screenId: 'ACC-SCR-07', title: 'Accept invite' },
  },
  {
    path: 'safety/resources',
    loadComponent: () =>
      import('./features/safety/pages/safety-resources/safety-resources.page').then(
        (m) => m.SafetyResourcesPage,
      ),
    data: { screenId: 'SAF-SCR-05', title: 'Public safety resources' },
  },
  {
    path: 'share/:token',
    loadComponent: () =>
      import('./features/children/pages/public-share/public-share.page').then(
        (m) => m.PublicSharePage,
      ),
    data: { screenId: 'DOC-SCR-13', title: 'Public share link page' },
  },
  {
    path: 'emergency-consent/:token',
    loadComponent: () =>
      import('./features/children/pages/emergency-consent/emergency-consent.page').then(
        (m) => m.EmergencyConsentPage,
      ),
    data: { screenId: 'DOC-SCR-15', title: 'Emergency contact consent page' },
  },
  {
    path: 'auth/support-request',
    redirectTo: 'help/public-request',
    pathMatch: 'full',
  },
  {
    path: 'staff/support',
    redirectTo: 'help/staff/queue',
    pathMatch: 'full',
  },
  {
    path: 'operations/support-measures',
    redirectTo: 'help/operations/measures',
    pathMatch: 'full',
  },
  // System screens (no shell chrome)
  {
    path: 'error',
    loadComponent: () =>
      import('./features/accounts/pages/error/error.page').then((m) => m.ErrorPage),
    data: { screenId: 'ACC-SCR-21', title: 'Error' },
  },
  {
    path: 'maintenance',
    loadComponent: () =>
      import('./features/accounts/pages/maintenance/maintenance.page').then(
        (m) => m.MaintenancePage,
      ),
    data: { screenId: 'ACC-SCR-23', title: 'Planned Maintenance' },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/accounts/pages/not-found/not-found.page').then((m) => m.NotFoundPage),
    data: { screenId: 'ACC-SCR-22', title: 'Page not found' },
  },
];
