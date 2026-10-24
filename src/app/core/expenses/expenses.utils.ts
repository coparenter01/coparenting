import type {
  ChildSupportPaymentModel,
  CsvImportRow,
  ExpenseCategory,
  OcrReceiptResult,
  ReimbursementRequestModel,
  RunningBalanceSummary,
} from './expenses.types';

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Medical',
  'Dental',
  'School',
  'Childcare',
  'Activities',
  'Clothing',
  'Pet',
  'Other',
];

export function formatCurrency(cents: number): string {
  const isNegative = cents < 0;
  const absCents = Math.abs(cents);
  const dollars = Math.floor(absCents / 100);
  const remainder = absCents % 100;
  const padded = remainder < 10 ? `0${remainder.toString()}` : remainder.toString();
  const formatted = `$${dollars.toLocaleString('en-US')}.${padded}`;
  return isNegative ? `-${formatted}` : formatted;
}

export const formatCents = formatCurrency;

export function parseAmountToCents(amountStr: string): number | null {
  if (amountStr.includes('-')) return null;
  const clean = amountStr.replace(/[^0-9.]/g, '').trim();
  if (!clean) return null;
  const parts = clean.split('.');
  if (parts.length > 2) return null;
  const dollars = parseInt(parts[0] ?? '0', 10);
  if (isNaN(dollars)) return null;
  let cents = 0;
  if (parts.length === 2) {
    const rawCents = (parts[1] ?? '').slice(0, 2);
    if (rawCents.length === 1) cents = parseInt(rawCents, 10) * 10;
    else if (rawCents.length === 2) cents = parseInt(rawCents, 10);
  }
  const total = dollars * 100 + cents;
  if (total <= 0 || total > 9999999) return null;
  return total;
}

export function calculateSplit(amountCents: number, percentage: number): number {
  if (percentage <= 0) return 0;
  if (percentage >= 100) return amountCents;
  return Math.round((amountCents * percentage) / 100);
}

export function calculateSplitShares(
  amountCents: number,
  percentageOtherParent: number,
): { payingParentShareCents: number; requestingParentShareCents: number } {
  const payingShare = calculateSplit(amountCents, percentageOtherParent);
  return {
    payingParentShareCents: payingShare,
    requestingParentShareCents: Math.max(0, amountCents - payingShare),
  };
}

export function computeRunningBalance(
  requests: ReimbursementRequestModel[],
  childSupport: ChildSupportPaymentModel[],
): RunningBalanceSummary {
  const parentAName = 'Elena Rivera';
  const parentBName = 'David Chen';
  let parentAOwedCents = 0;
  let parentBOwedCents = 0;

  for (const req of requests) {
    if (req.status === 'Accepted') {
      if (req.requestedBy === 'user-1') {
        parentAOwedCents += req.amountCents;
      } else {
        parentBOwedCents += req.amountCents;
      }
    }
  }

  for (const cs of childSupport) {
    if (cs.payerId === 'user-2' && cs.payeeId === 'user-1') {
      parentAOwedCents = Math.max(0, parentAOwedCents - cs.amountCents);
    } else if (cs.payerId === 'user-1' && cs.payeeId === 'user-2') {
      parentBOwedCents = Math.max(0, parentBOwedCents - cs.amountCents);
    }
  }

  const net = parentAOwedCents - parentBOwedCents;
  return {
    parentAName,
    parentBName,
    parentAOwedCents,
    parentBOwedCents,
    netBalanceCents: Math.abs(net),
    netDebtorName: net >= 0 ? parentBName : parentAName,
    netCreditorName: net >= 0 ? parentAName : parentBName,
    currency: 'USD',
  };
}

interface OcrPattern {
  keywords: string[];
  merchant: string;
  category: ExpenseCategory;
  amountCents: number;
  confidence: number;
}

const OCR_PATTERNS: OcrPattern[] = [
  {
    keywords: ['pharm', 'cvs', 'walgreens'],
    merchant: 'CVS Pharmacy #4192',
    category: 'Medical',
    amountCents: 2840,
    confidence: 0.94,
  },
  {
    keywords: ['dental', 'ortho'],
    merchant: 'Oakland Pediatric Dental Group',
    category: 'Dental',
    amountCents: 15000,
    confidence: 0.98,
  },
  {
    keywords: ['camp', 'soccer', 'swim'],
    merchant: 'Bay Area Youth Sports League',
    category: 'Activities',
    amountCents: 8500,
    confidence: 0.92,
  },
  {
    keywords: ['target', 'shoes', 'clothes'],
    merchant: 'Target Store #112',
    category: 'Clothing',
    amountCents: 4550,
    confidence: 0.89,
  },
];

export function simulateOcrReceipt(fileName: string): OcrReceiptResult {
  const lower = fileName.toLowerCase();
  const today = new Date().toISOString().slice(0, 10);
  const matched = OCR_PATTERNS.find((p) => p.keywords.some((k) => lower.includes(k)));

  if (matched) {
    return {
      merchantName: matched.merchant,
      date: today,
      amountCents: matched.amountCents,
      suggestedCategory: matched.category,
      confidenceScore: matched.confidence,
      rawText: `${matched.merchant}\nTotal Paid: ${formatCurrency(matched.amountCents)}\nDate: ${today}`,
    };
  }

  return {
    merchantName: 'City School Uniforms & Supplies',
    date: today,
    amountCents: 6250,
    suggestedCategory: 'School',
    confidenceScore: 0.88,
    rawText: 'CITY SCHOOL SUPPLY\nWorkbooks & Art Kit\nTotal: $62.50\nReceipt verified',
  };
}

function parseAndValidateRow(parts: string[], rowNum: number, today: string): CsvImportRow {
  const dateStr = parts[0] ?? today;
  const descStr = parts[1] ?? 'Imported expense';
  const amountStr = parts[2] ?? '0.00';
  const cat = (parts[3] ?? 'Other') as ExpenseCategory;

  const parsedCents = parseAmountToCents(amountStr);
  const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(dateStr) && dateStr <= today;
  const isValidDesc = descStr.length >= 1 && descStr.length <= 100;
  const isValidCat = EXPENSE_CATEGORIES.includes(cat);

  let errorMsg: string | undefined;
  if (!isValidDate) errorMsg = 'Invalid date (must be YYYY-MM-DD not in future)';
  else if (!isValidDesc) errorMsg = 'Description must be between 1 and 100 chars';
  else if (parsedCents === null) errorMsg = 'Invalid amount (must be $0.01 - $99,999.99)';

  return {
    rowNumber: rowNum,
    date: dateStr,
    description: descStr,
    amountCents: parsedCents ?? 0,
    category: isValidCat ? cat : 'Other',
    isValid: !errorMsg,
    errorMessage: errorMsg,
  };
}

export function parseCsvContent(csvText: string): CsvImportRow[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length <= 1) return [];

  const rows: CsvImportRow[] = [];
  const today = new Date().toISOString().slice(0, 10);

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i] ?? '';
    const parts = line.split(',').map((p) => p.replace(/^["']|["']$/g, '').trim());
    if (parts.length >= 3) {
      rows.push(parseAndValidateRow(parts, i, today));
    }
  }

  return rows;
}
