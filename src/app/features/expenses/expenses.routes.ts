import type { Routes } from '@angular/router';

export const EXPENSES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./expense-log/expense-log.page').then((m) => m.ExpenseLogPage),
    data: { screenId: 'EXP-SCR-01', title: 'Expense Log' },
  },
  {
    path: 'new',
    loadComponent: () => import('./expense-form/expense-form.page').then((m) => m.ExpenseFormPage),
    data: { screenId: 'EXP-SCR-02', title: 'Log Expense' },
  },
  {
    path: 'reimbursements',
    loadComponent: () =>
      import('./reimbursement-list/reimbursement-list.page').then((m) => m.ReimbursementListPage),
    data: { screenId: 'EXP-SCR-06', title: 'Reimbursement Requests' },
  },
  {
    path: 'reimbursements/new',
    loadComponent: () =>
      import('./reimbursement-request/reimbursement-request.page').then(
        (m) => m.ReimbursementRequestPage,
      ),
    data: { screenId: 'EXP-SCR-04', title: 'Request Reimbursement' },
  },
  {
    path: 'reimbursements/:id',
    loadComponent: () =>
      import('./reimbursement-detail/reimbursement-detail.page').then(
        (m) => m.ReimbursementDetailPage,
      ),
    data: { screenId: 'EXP-SCR-05', title: 'Reimbursement Detail' },
  },
  {
    path: 'child-support',
    loadComponent: () =>
      import('./child-support-payments/child-support-payments.page').then(
        (m) => m.ChildSupportPaymentsPage,
      ),
    data: { screenId: 'EXP-SCR-08', title: 'Child Support Payments' },
  },
  {
    path: 'child-support/new',
    loadComponent: () =>
      import('./child-support-payment-form/child-support-payment-form.page').then(
        (m) => m.ChildSupportPaymentFormPage,
      ),
    data: { screenId: 'EXP-SCR-07', title: 'Record Child Support Payment' },
  },
  {
    path: 'balance',
    loadComponent: () =>
      import('./running-balance/running-balance.page').then((m) => m.RunningBalancePage),
    data: { screenId: 'EXP-SCR-09', title: 'Running Balance' },
  },
  {
    path: 'split-rules',
    loadComponent: () => import('./split-rules/split-rules.page').then((m) => m.SplitRulesPage),
    data: { screenId: 'EXP-SCR-10', title: 'Split Rules' },
  },
  {
    path: 'dispute/:id',
    loadComponent: () =>
      import('./expense-dispute/expense-dispute.page').then((m) => m.ExpenseDisputePage),
    data: { screenId: 'EXP-SCR-11', title: 'Dispute Expense' },
  },
  {
    path: 'pay/:id',
    loadComponent: () => import('./pay-request/pay-request.page').then((m) => m.PayRequestPage),
    data: { screenId: 'EXP-SCR-12', title: 'Pay Reimbursement' },
  },
  {
    path: 'recurring',
    loadComponent: () =>
      import('./repeating-payments/repeating-payments.page').then((m) => m.RepeatingPaymentsPage),
    data: { screenId: 'EXP-SCR-13', title: 'Repeating Payments' },
  },
  {
    path: 'ai-entry',
    loadComponent: () =>
      import('./ai-expense-entry/ai-expense-entry.page').then((m) => m.AiExpenseEntryPage),
    data: { screenId: 'EXP-SCR-14', title: 'AI Expense Entry' },
  },
  {
    path: 'bills',
    loadComponent: () => import('./bills/bills.page').then((m) => m.BillsPage),
    data: { screenId: 'EXP-SCR-15', title: 'Shared Bills' },
  },
  {
    path: 'credit-building',
    loadComponent: () =>
      import('./credit-building/credit-building.page').then((m) => m.CreditBuildingPage),
    data: { screenId: 'EXP-SCR-16', title: 'Credit Building' },
  },
  {
    path: 'import',
    loadComponent: () =>
      import('./import-expenses/import-expenses.page').then((m) => m.ImportExpensesPage),
    data: { screenId: 'EXP-SCR-17', title: 'Import Expenses' },
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./expense-detail/expense-detail.page').then((m) => m.ExpenseDetailPage),
    data: { screenId: 'EXP-SCR-03', title: 'Expense Detail' },
  },
];
