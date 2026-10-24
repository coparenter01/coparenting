import type {
  BillModel,
  ChildSupportPaymentModel,
  ExpenseAttachmentModel,
  ExpenseCategory,
  ExpenseDisputeModel,
  ExpenseModel,
  ExpenseSplitRuleModel,
  ExpenseVersionModel,
  RecurringPaymentModel,
  ReimbursementRequestModel,
} from './expenses.types';

export function createInitialVersion(params: {
  expenseId: string;
  desc: string;
  category: ExpenseCategory;
  expenseDate: string;
  amountCents: number;
  note?: string;
}): ExpenseVersionModel {
  return {
    id: 'ver-1-' + params.expenseId,
    expenseId: params.expenseId,
    versionNumber: 1,
    description: params.desc,
    category: params.category,
    expenseDate: params.expenseDate,
    amountCents: params.amountCents,
    note: params.note?.trim(),
    changedBy: 'user-1',
    changedByName: 'Elena Rivera',
    deviceInfo: 'Web Browser / Chrome',
    createdAt: new Date().toISOString(),
  };
}

export function buildUpdatedVersion(
  target: ExpenseModel,
  params: {
    description: string;
    category: ExpenseCategory;
    expenseDate: string;
    amountCents: number;
    note?: string;
  },
  nowIso: string,
): ExpenseVersionModel {
  const verNum = target.versions.length + 1;
  return {
    id: `ver-${verNum.toString()}-${target.id}`,
    expenseId: target.id,
    versionNumber: verNum,
    description: params.description.trim(),
    category: params.category,
    expenseDate: params.expenseDate,
    amountCents: params.amountCents,
    note: params.note?.trim(),
    changedBy: 'user-1',
    changedByName: 'Elena Rivera',
    deviceInfo: 'Web Browser / Chrome',
    createdAt: nowIso,
  };
}

export function buildNewAttachment(
  expenseId: string,
  fileName: string,
  sizeBytes: number,
  mimeType: string,
): ExpenseAttachmentModel {
  return {
    id: 'att-' + Date.now().toString(36),
    expenseId,
    fileName,
    fileSizeBytes: sizeBytes,
    mimeType,
    storagePath: `receipts/${expenseId}/${fileName}`,
    uploadedBy: 'user-1',
    uploadedByName: 'Elena Rivera',
    createdAt: new Date().toISOString(),
  };
}

function buildDentalAttachment(nowIso: string): ExpenseAttachmentModel[] {
  return [
    {
      id: 'att-1',
      expenseId: 'exp-1',
      fileName: 'dental-receipt-2026.pdf',
      fileSizeBytes: 245000,
      mimeType: 'application/pdf',
      storagePath: 'receipts/exp-1/dental-receipt-2026.pdf',
      uploadedBy: 'user-1',
      uploadedByName: 'Elena Rivera',
      createdAt: nowIso,
    },
  ];
}

function buildExpenseOne(today: string): ExpenseModel {
  const nowIso = new Date().toISOString();
  const v1 = createInitialVersion({
    expenseId: 'exp-1',
    desc: 'Pediatric Dental Cleaning & X-Rays',
    category: 'Dental',
    expenseDate: today,
    amountCents: 15000,
    note: 'Annual checkup for Maya at Oakland Pediatric Dental.',
  });

  return {
    id: 'exp-1',
    householdId: 'hh-1',
    createdBy: 'user-1',
    createdByName: 'Elena Rivera',
    paidBy: 'user-1',
    paidByName: 'Elena Rivera',
    description: 'Pediatric Dental Cleaning & X-Rays',
    category: 'Dental',
    expenseDate: today,
    amountCents: 15000,
    currency: 'USD',
    note: 'Annual checkup for Maya at Oakland Pediatric Dental.',
    status: 'Active',
    visibility: 'Shared',
    children: [{ id: 'child-1', name: 'Maya Rivera' }],
    attachments: buildDentalAttachment(nowIso),
    versions: [v1],
    createdAt: nowIso,
    updatedAt: nowIso,
  };
}

function buildExpenseTwo(today: string): ExpenseModel {
  const nowIso = new Date().toISOString();
  return {
    id: 'exp-2',
    householdId: 'hh-1',
    createdBy: 'user-2',
    createdByName: 'David Chen',
    paidBy: 'user-2',
    paidByName: 'David Chen',
    description: 'School Shoes & Gym Uniform',
    category: 'Clothing',
    expenseDate: today,
    amountCents: 4550,
    currency: 'USD',
    note: 'Back to school sneakers from Target.',
    status: 'Active',
    visibility: 'Shared',
    children: [{ id: 'child-1', name: 'Maya Rivera' }],
    attachments: [],
    versions: [],
    createdAt: nowIso,
    updatedAt: nowIso,
  };
}

export function buildInitialExpenses(): ExpenseModel[] {
  const today = new Date().toISOString().slice(0, 10);
  return [buildExpenseOne(today), buildExpenseTwo(today)];
}

export function buildInitialRequests(): ReimbursementRequestModel[] {
  const today = new Date().toISOString().slice(0, 10);
  const inSevenDays = new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().slice(0, 10);
  return [
    {
      id: 'req-1',
      householdId: 'hh-1',
      expenseId: 'exp-1',
      expenseDescription: 'Pediatric Dental Cleaning & X-Rays',
      expenseTotalCents: 15000,
      requestedBy: 'user-1',
      requestedByName: 'Elena Rivera',
      requestedFrom: 'user-2',
      requestedFromName: 'David Chen',
      amountCents: 7500,
      splitPercentage: 50.0,
      dueDate: inSevenDays,
      note: '50% share per our medical split agreement.',
      status: 'Pending',
      createdAt: today,
      updatedAt: today,
    },
  ];
}

export function buildInitialChildSupport(): ChildSupportPaymentModel[] {
  const today = new Date().toISOString().slice(0, 10);
  return [
    {
      id: 'csp-1',
      householdId: 'hh-1',
      payerId: 'user-2',
      payerName: 'David Chen',
      payeeId: 'user-1',
      payeeName: 'Elena Rivera',
      amountCents: 65000,
      paymentDate: today,
      paymentMethod: 'Bank transfer (ACH)',
      referenceNumber: 'ACH-94021',
      note: 'October child support payment.',
      status: 'Verified',
      createdAt: today,
    },
  ];
}

export function buildInitialSplitRules(): ExpenseSplitRuleModel[] {
  const today = new Date().toISOString().slice(0, 10);
  return [
    {
      id: 'sr-1',
      householdId: 'hh-1',
      category: 'Medical',
      parentAPercentage: 50.0,
      parentBPercentage: 50.0,
      effectiveDate: today,
      createdBy: 'user-1',
      createdByName: 'Elena Rivera',
      createdAt: today,
    },
    {
      id: 'sr-2',
      householdId: 'hh-1',
      category: 'Activities',
      parentAPercentage: 60.0,
      parentBPercentage: 40.0,
      effectiveDate: today,
      createdBy: 'user-1',
      createdByName: 'Elena Rivera',
      createdAt: today,
    },
  ];
}

export function buildInitialDisputes(): ExpenseDisputeModel[] {
  const today = new Date().toISOString().slice(0, 10);
  return [
    {
      id: 'dsp-1',
      householdId: 'hh-1',
      expenseId: 'exp-2',
      expenseDescription: 'School Shoes & Gym Uniform',
      expenseAmountCents: 4550,
      disputedBy: 'user-1',
      disputedByName: 'Elena Rivera',
      reasonCategory: 'Receipt missing',
      explanation: 'Please attach the receipt before requesting reimbursement for the shoes.',
      status: 'Open',
      createdAt: today,
      updatedAt: today,
    },
  ];
}

export function buildInitialRecurringPayments(): RecurringPaymentModel[] {
  const inTwoWeeks = new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString().slice(0, 10);
  return [
    {
      id: 'rec-1',
      householdId: 'hh-1',
      title: 'Monthly Child Support',
      amountCents: 65000,
      frequency: 'Monthly',
      nextDueDate: inTwoWeeks,
      payerId: 'user-2',
      payerName: 'David Chen',
      payeeId: 'user-1',
      payeeName: 'Elena Rivera',
      autoPay: true,
      status: 'Active',
      createdAt: new Date().toISOString(),
    },
  ];
}

export function buildInitialBills(): BillModel[] {
  const inTenDays = new Date(Date.now() + 10 * 24 * 3600 * 1000).toISOString().slice(0, 10);
  return [
    {
      id: 'bill-1',
      householdId: 'hh-1',
      payeeName: 'Oakland Montessori Daycare',
      amountCents: 120000,
      dueDate: inTenDays,
      category: 'Childcare',
      isSplit: true,
      status: 'Upcoming',
      createdAt: new Date().toISOString(),
    },
  ];
}
