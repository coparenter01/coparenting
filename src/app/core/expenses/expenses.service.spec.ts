import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { ExpensesService } from './expenses.service';
import {
  calculateSplitShares,
  formatCents,
  parseAmountToCents,
  parseCsvContent,
} from './expenses.utils';

describe('ExpensesService & Utilities', () => {
  it('should format cents and parse currency amounts accurately', () => {
    expect(formatCents(1250)).toBe('$12.50');
    expect(formatCents(0)).toBe('$0.00');
    expect(formatCents(100000)).toBe('$1,000.00');

    expect(parseAmountToCents('45.50')).toBe(4550);
    expect(parseAmountToCents('$1,234.56')).toBe(123456);
    expect(parseAmountToCents('invalid')).toBeNull();
    expect(parseAmountToCents('-10')).toBeNull();
  });

  it('should calculate split shares according to split percentage', () => {
    const split50 = calculateSplitShares(10000, 50);
    expect(split50.payingParentShareCents).toBe(5000);
    expect(split50.requestingParentShareCents).toBe(5000);

    const split60 = calculateSplitShares(10000, 60);
    expect(split60.payingParentShareCents).toBe(6000);
    expect(split60.requestingParentShareCents).toBe(4000);
  });

  it('should parse valid CSV rows and flag invalid rows', () => {
    const csv = `Date,Description,Amount,Category
2026-10-15,Dental Checkup,150.00,Dental
2099-01-01,Future Event,50.00,School
2026-10-16,,0.00,InvalidCat`;

    const parsed = parseCsvContent(csv);
    expect(parsed.length).toBe(3);
    expect(parsed[0]?.isValid).toBe(true);
    expect(parsed[0]?.amountCents).toBe(15000);
    expect(parsed[1]?.isValid).toBe(false);
    expect(parsed[2]?.isValid).toBe(false);
  });

  it('should manage expenses lifecycle, versions, and running balance', () => {
    TestBed.configureTestingModule({
      providers: [ExpensesService],
    });
    const service = TestBed.inject(ExpensesService);

    const initialCount = service.expenses().length;
    const created = service.createExpense({
      description: 'Orthodontics Consultation',
      category: 'Dental',
      expenseDate: '2026-10-20',
      amountCents: 25000,
      note: 'Initial scan and retainer fitting',
    });

    expect(service.expenses().length).toBe(initialCount + 1);
    expect(created.amountCents).toBe(25000);
    expect(created.versions.length).toBe(1);

    const updated = service.updateExpense(created.id, {
      description: 'Orthodontics Consultation & Retainers',
      category: 'Dental',
      expenseDate: '2026-10-20',
      amountCents: 27500,
    });
    expect(updated).toBe(true);

    const refetched = service.expenses().find((e) => e.id === created.id);
    expect(refetched?.versions.length).toBe(2);
    expect(refetched?.amountCents).toBe(27500);

    const req = service.createReimbursementRequest({
      expenseId: created.id,
      splitPercentage: 50,
      dueDate: '2026-11-01',
      note: 'Please reimburse 50%',
    });
    expect(req.status).toBe('Pending');
    expect(req.amountCents).toBe(13750);

    const cannotEdit = service.updateExpense(created.id, {
      description: 'Attempted edit during active request',
      category: 'Dental',
      expenseDate: '2026-10-20',
      amountCents: 30000,
    });
    expect(cannotEdit).toBe(false);

    service.answerReimbursementRequest(req.id, 'Accepted');
    expect(service.reimbursementRequests().find((r) => r.id === req.id)?.status).toBe('Accepted');

    service.payRequest(req.id, 'Debit/Credit Card');
    expect(service.reimbursementRequests().find((r) => r.id === req.id)?.status).toBe('Paid');

    const balance = service.runningBalance();
    expect(balance.currency).toBe('USD');
  });

  it('should support split rules, recurring payments, bills, and credit building', () => {
    TestBed.configureTestingModule({
      providers: [ExpensesService],
    });
    const service = TestBed.inject(ExpensesService);

    const rule = service.createSplitRule({
      category: 'Dental',
      parentAPercentage: 40,
      parentBPercentage: 60,
      effectiveDate: '2026-11-01',
    });
    expect(rule.parentBPercentage).toBe(60);

    const recurring = service.createRecurringPayment({
      title: 'Piano Lessons',
      amountCents: 12000,
      frequency: 'Monthly',
      nextDueDate: '2026-11-01',
      autoPay: false,
    });
    expect(recurring.title).toBe('Piano Lessons');

    const bill = service.createBill({
      payeeName: 'City Daycare',
      amountCents: 45000,
      dueDate: '2026-11-05',
      category: 'Childcare',
      isSplit: true,
    });
    expect(bill.status).toBe('Upcoming');
    service.markBillPaid(bill.id);
    expect(service.bills().find((b) => b.id === bill.id)?.status).toBe('Paid');

    service.toggleCreditBuilding(true);
    expect(service.creditBuilding().isEnabled).toBe(true);
  });
});
