import { computed, Injectable, signal } from '@angular/core';
import {
  buildInitialBills,
  buildInitialChildSupport,
  buildInitialDisputes,
  buildInitialExpenses,
  buildInitialRecurringPayments,
  buildInitialRequests,
  buildInitialSplitRules,
  buildNewAttachment,
  buildUpdatedVersion,
  createInitialVersion,
} from './expenses.mock';
import type {
  BillModel,
  ChildSupportPaymentModel,
  CreditBuildingSettingsModel,
  ExpenseCategory,
  ExpenseDisputeModel,
  ExpenseModel,
  ExpensePaymentModel,
  ExpenseSplitRuleModel,
  ExpenseVisibility,
  PaymentMethod,
  RecurringPaymentFrequency,
  RecurringPaymentModel,
  ReimbursementRequestModel,
  ReimbursementRequestStatus,
  RunningBalanceSummary,
} from './expenses.types';
import { calculateSplit, computeRunningBalance } from './expenses.utils';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  readonly expenses = signal<ExpenseModel[]>(buildInitialExpenses());
  readonly reimbursementRequests = signal<ReimbursementRequestModel[]>(buildInitialRequests());
  readonly childSupportPayments = signal<ChildSupportPaymentModel[]>(buildInitialChildSupport());
  readonly splitRules = signal<ExpenseSplitRuleModel[]>(buildInitialSplitRules());
  readonly disputes = signal<ExpenseDisputeModel[]>(buildInitialDisputes());
  readonly payments = signal<ExpensePaymentModel[]>([]);
  readonly recurringPayments = signal<RecurringPaymentModel[]>(buildInitialRecurringPayments());
  readonly bills = signal<BillModel[]>(buildInitialBills());
  readonly creditBuilding = signal<CreditBuildingSettingsModel>({
    id: 'cb-1',
    householdId: 'hh-1',
    userId: 'user-1',
    isEnabled: false,
    createdAt: new Date().toISOString(),
  });

  readonly activeExpenses = computed(() => this.expenses().filter((e) => e.status === 'Active'));

  readonly runningBalance = computed<RunningBalanceSummary>(() =>
    computeRunningBalance(this.reimbursementRequests(), this.childSupportPayments()),
  );

  readonly pendingRequestsCount = computed(
    () =>
      this.reimbursementRequests().filter(
        (r) => r.status === 'Pending' && r.requestedFrom === 'user-1',
      ).length,
  );

  createExpense(params: {
    householdId?: string;
    description: string;
    category: ExpenseCategory;
    expenseDate: string;
    amountCents: number;
    visibility?: ExpenseVisibility;
    note?: string;
    children?: { id: string; name: string }[];
  }): ExpenseModel {
    const newId = 'exp-' + Date.now().toString(36);
    const nowIso = new Date().toISOString();
    const cleanDesc = params.description.trim();
    const firstVer = createInitialVersion({
      expenseId: newId,
      desc: cleanDesc,
      category: params.category,
      expenseDate: params.expenseDate,
      amountCents: params.amountCents,
      note: params.note,
    });

    const newExpense: ExpenseModel = {
      id: newId,
      householdId: params.householdId ?? 'hh-1',
      createdBy: 'user-1',
      createdByName: 'Elena Rivera',
      paidBy: 'user-1',
      paidByName: 'Elena Rivera',
      description: cleanDesc,
      category: params.category,
      expenseDate: params.expenseDate,
      amountCents: params.amountCents,
      currency: 'USD',
      note: params.note?.trim(),
      status: 'Active',
      visibility: params.visibility ?? 'Shared',
      children: params.children ?? [{ id: 'child-1', name: 'Maya Rivera' }],
      attachments: [],
      versions: [firstVer],
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    this.expenses.update((list) => [newExpense, ...list]);
    return newExpense;
  }

  updateExpense(
    id: string,
    params: {
      description: string;
      category: ExpenseCategory;
      expenseDate: string;
      amountCents: number;
      note?: string;
    },
  ): boolean {
    const target = this.expenses().find((e) => e.id === id);
    if (!target) return false;

    const hasActiveReq = this.reimbursementRequests().some(
      (r) => r.expenseId === id && r.status !== 'Withdrawn',
    );
    if (hasActiveReq) return false;

    const nowIso = new Date().toISOString();
    const newVer = buildUpdatedVersion(target, params, nowIso);

    this.expenses.update((list) =>
      list.map((e) =>
        e.id === id
          ? {
              ...e,
              description: params.description.trim(),
              category: params.category,
              expenseDate: params.expenseDate,
              amountCents: params.amountCents,
              note: params.note?.trim(),
              versions: [...e.versions, newVer],
              updatedAt: nowIso,
            }
          : e,
      ),
    );
    return true;
  }

  voidExpense(id: string): boolean {
    const target = this.expenses().find((e) => e.id === id);
    if (!target) return false;

    const hasActiveReq = this.reimbursementRequests().some(
      (r) => r.expenseId === id && r.status !== 'Withdrawn',
    );
    if (hasActiveReq) return false;

    const nowIso = new Date().toISOString();
    this.expenses.update((list) =>
      list.map((e) =>
        e.id === id
          ? { ...e, status: 'Voided', voidedAt: nowIso, voidedBy: 'user-1', updatedAt: nowIso }
          : e,
      ),
    );
    return true;
  }

  shareExpense(id: string): void {
    this.expenses.update((list) =>
      list.map((e) =>
        e.id === id ? { ...e, visibility: 'Shared', updatedAt: new Date().toISOString() } : e,
      ),
    );
  }

  addAttachment(expenseId: string, fileName: string, sizeBytes: number, mimeType: string): void {
    const att = buildNewAttachment(expenseId, fileName, sizeBytes, mimeType);
    this.expenses.update((list) =>
      list.map((e) =>
        e.id === expenseId
          ? { ...e, attachments: [...e.attachments, att], updatedAt: new Date().toISOString() }
          : e,
      ),
    );
  }

  createReimbursementRequest(params: {
    householdId?: string;
    expenseId: string;
    splitPercentage: number;
    dueDate: string;
    note?: string;
  }): ReimbursementRequestModel {
    const exp = this.expenses().find((e) => e.id === params.expenseId);
    const amountCents = exp ? calculateSplit(exp.amountCents, params.splitPercentage) : 0;

    const newReq: ReimbursementRequestModel = {
      id: 'req-' + Date.now().toString(36),
      householdId: params.householdId ?? 'hh-1',
      expenseId: params.expenseId,
      expenseDescription: exp?.description ?? 'Shared expense',
      expenseTotalCents: exp?.amountCents ?? 0,
      requestedBy: 'user-1',
      requestedByName: 'Elena Rivera',
      requestedFrom: 'user-2',
      requestedFromName: 'David Chen',
      amountCents,
      splitPercentage: params.splitPercentage,
      dueDate: params.dueDate,
      note: params.note?.trim(),
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.reimbursementRequests.update((list) => [newReq, ...list]);
    return newReq;
  }

  answerReimbursementRequest(
    id: string,
    status: ReimbursementRequestStatus,
    declineReason?: string,
  ): void {
    const nowIso = new Date().toISOString();
    this.reimbursementRequests.update((list) =>
      list.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              declineReason: declineReason ?? r.declineReason,
              paidAt: status === 'Paid' ? nowIso : r.paidAt,
              updatedAt: nowIso,
            }
          : r,
      ),
    );
  }

  recordChildSupportPayment(params: {
    householdId?: string;
    amountCents: number;
    paymentDate: string;
    paymentMethod: PaymentMethod;
    referenceNumber?: string;
    note?: string;
  }): ChildSupportPaymentModel {
    const newPayment: ChildSupportPaymentModel = {
      id: 'csp-' + Date.now().toString(36),
      householdId: params.householdId ?? 'hh-1',
      payerId: 'user-1',
      payerName: 'Elena Rivera',
      payeeId: 'user-2',
      payeeName: 'David Chen',
      amountCents: params.amountCents,
      paymentDate: params.paymentDate,
      paymentMethod: params.paymentMethod,
      referenceNumber: params.referenceNumber?.trim(),
      note: params.note?.trim(),
      status: 'Recorded',
      createdAt: new Date().toISOString(),
    };
    this.childSupportPayments.update((list) => [newPayment, ...list]);
    return newPayment;
  }

  createSplitRule(params: {
    householdId?: string;
    category: ExpenseCategory;
    parentAPercentage: number;
    parentBPercentage: number;
    effectiveDate: string;
  }): ExpenseSplitRuleModel {
    const newRule: ExpenseSplitRuleModel = {
      id: 'sr-' + Date.now().toString(36),
      householdId: params.householdId ?? 'hh-1',
      category: params.category,
      parentAPercentage: params.parentAPercentage,
      parentBPercentage: params.parentBPercentage,
      effectiveDate: params.effectiveDate,
      createdBy: 'user-1',
      createdByName: 'Elena Rivera',
      createdAt: new Date().toISOString(),
    };
    this.splitRules.update((list) => [newRule, ...list]);
    return newRule;
  }

  createDispute(params: {
    householdId?: string;
    expenseId: string;
    reasonCategory: string;
    explanation: string;
  }): ExpenseDisputeModel {
    const exp = this.expenses().find((e) => e.id === params.expenseId);
    const newDispute: ExpenseDisputeModel = {
      id: 'dsp-' + Date.now().toString(36),
      householdId: params.householdId ?? 'hh-1',
      expenseId: params.expenseId,
      expenseDescription: exp?.description ?? 'Disputed expense',
      expenseAmountCents: exp?.amountCents ?? 0,
      disputedBy: 'user-1',
      disputedByName: 'Elena Rivera',
      reasonCategory: params.reasonCategory,
      explanation: params.explanation.trim(),
      status: 'Open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.disputes.update((list) => [newDispute, ...list]);
    return newDispute;
  }

  payRequest(requestId: string, method: PaymentMethod): ExpensePaymentModel {
    const req = this.reimbursementRequests().find((r) => r.id === requestId);
    const newPayment: ExpensePaymentModel = {
      id: 'pay-' + Date.now().toString(36),
      reimbursementRequestId: requestId,
      payerId: 'user-1',
      amountCents: req?.amountCents ?? 0,
      paymentMethod: method,
      status: 'Completed',
      transactionRef: 'txn_test_' + Math.random().toString(36).substring(2, 10),
      testMode: true,
      createdAt: new Date().toISOString(),
    };
    this.payments.update((list) => [newPayment, ...list]);
    this.answerReimbursementRequest(requestId, 'Paid');
    return newPayment;
  }

  createRecurringPayment(params: {
    householdId?: string;
    title: string;
    amountCents: number;
    frequency: RecurringPaymentFrequency;
    nextDueDate: string;
    autoPay: boolean;
  }): RecurringPaymentModel {
    const item: RecurringPaymentModel = {
      id: 'rec-' + Date.now().toString(36),
      householdId: params.householdId ?? 'hh-1',
      title: params.title.trim(),
      amountCents: params.amountCents,
      frequency: params.frequency,
      nextDueDate: params.nextDueDate,
      payerId: 'user-1',
      payerName: 'Elena Rivera',
      payeeId: 'user-2',
      payeeName: 'David Chen',
      autoPay: params.autoPay,
      status: 'Active',
      createdAt: new Date().toISOString(),
    };
    this.recurringPayments.update((list) => [item, ...list]);
    return item;
  }

  toggleRecurringPayment(id: string): void {
    this.recurringPayments.update((list) =>
      list.map((r) =>
        r.id === id ? { ...r, status: r.status === 'Active' ? 'Paused' : 'Active' } : r,
      ),
    );
  }

  createBill(params: {
    householdId?: string;
    payeeName: string;
    amountCents: number;
    dueDate: string;
    category: ExpenseCategory;
    isSplit: boolean;
  }): BillModel {
    const newBill: BillModel = {
      id: 'bill-' + Date.now().toString(36),
      householdId: params.householdId ?? 'hh-1',
      payeeName: params.payeeName.trim(),
      amountCents: params.amountCents,
      dueDate: params.dueDate,
      category: params.category,
      isSplit: params.isSplit,
      status: 'Upcoming',
      createdAt: new Date().toISOString(),
    };
    this.bills.update((list) => [newBill, ...list]);
    return newBill;
  }

  markBillPaid(id: string): void {
    this.bills.update((list) => list.map((b) => (b.id === id ? { ...b, status: 'Paid' } : b)));
  }

  toggleCreditBuilding(enabled: boolean): void {
    const nowIso = new Date().toISOString();
    this.creditBuilding.update((s) => ({
      ...s,
      isEnabled: enabled,
      enrolledAt: enabled ? nowIso : s.enrolledAt,
      consentAcceptedAt: enabled ? nowIso : s.consentAcceptedAt,
    }));
  }
}
