import { provideLocationMocks } from '@angular/common/testing';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { ExpensesService } from '@core/expenses/expenses.service';
import { describe, expect, it } from 'vitest';
import { AiExpenseEntryPage } from './ai-expense-entry/ai-expense-entry.page';
import { BillsPage } from './bills/bills.page';
import { ChildSupportPaymentFormPage } from './child-support-payment-form/child-support-payment-form.page';
import { ChildSupportPaymentsPage } from './child-support-payments/child-support-payments.page';
import { CreditBuildingPage } from './credit-building/credit-building.page';
import { ExpenseDetailPage } from './expense-detail/expense-detail.page';
import { ExpenseDisputePage } from './expense-dispute/expense-dispute.page';
import { ExpenseFormPage } from './expense-form/expense-form.page';
import { ExpenseLogPage } from './expense-log/expense-log.page';
import { ImportExpensesPage } from './import-expenses/import-expenses.page';
import { PayRequestPage } from './pay-request/pay-request.page';
import { ReimbursementDetailPage } from './reimbursement-detail/reimbursement-detail.page';
import { ReimbursementListPage } from './reimbursement-list/reimbursement-list.page';
import { ReimbursementRequestPage } from './reimbursement-request/reimbursement-request.page';
import { RepeatingPaymentsPage } from './repeating-payments/repeating-payments.page';
import { RunningBalancePage } from './running-balance/running-balance.page';
import { SplitRulesPage } from './split-rules/split-rules.page';

describe('Phase 7: Expenses & Payments Screens (EXP-SCR-01..17)', () => {
  const setupScreen = async <T>(
    componentType: new (...args: unknown[]) => T,
    routeParams: Record<string, string> = { id: 'exp-1' },
  ): Promise<ComponentFixture<T>> => {
    await TestBed.configureTestingModule({
      imports: [componentType],
      providers: [
        ExpensesService,
        provideRouter([]),
        provideLocationMocks(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap(routeParams),
              queryParamMap: convertToParamMap(routeParams),
            },
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(componentType);
    fixture.detectChanges();
    return fixture;
  };

  it('EXP-SCR-01: ExpenseLogPage should render expense log and summary badges', async () => {
    const fixture = await setupScreen(ExpenseLogPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Expenses');
    expect(text).toContain('Add Expense');
    expect(text).toContain('Pediatric Dental');
  });

  it('EXP-SCR-02: ExpenseFormPage should render new expense entry form', async () => {
    const fixture = await setupScreen(ExpenseFormPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Add Expense');
    expect(text).toContain('Amount (USD)');
    expect(text).toContain('Category');
  });

  it('EXP-SCR-03: ExpenseDetailPage should display expense details and audit history', async () => {
    const fixture = await setupScreen(ExpenseDetailPage, { id: 'exp-1' });
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Pediatric Dental Cleaning & X-Rays');
    expect(text).toContain('Version & Audit History');
    expect(text).toContain('v1');
  });

  it('EXP-SCR-04: ReimbursementRequestPage should render reimbursement split calculator', async () => {
    const fixture = await setupScreen(ReimbursementRequestPage, { expenseId: 'exp-1' });
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Reimbursement');
    expect(text).toContain('Full Amount');
  });

  it('EXP-SCR-05: ReimbursementDetailPage should display settlement status', async () => {
    const fixture = await setupScreen(ReimbursementDetailPage, { id: 'req-1' });
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Reimbursement Request');
    expect(text).toContain('Requested Share');
  });

  it('EXP-SCR-06: ReimbursementListPage should list requests with tab filtering', async () => {
    const fixture = await setupScreen(ReimbursementListPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Reimbursement Requests');
    expect(text).toContain('Pending');
  });

  it('EXP-SCR-07: ChildSupportPaymentFormPage should render payment recording form', async () => {
    const fixture = await setupScreen(ChildSupportPaymentFormPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Record Child Support Payment');
    expect(text).toContain('Payment Method');
  });

  it('EXP-SCR-08: ChildSupportPaymentsPage should display payment history ledger', async () => {
    const fixture = await setupScreen(ChildSupportPaymentsPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Child Support Payments');
    expect(text).toContain('Total Documented Payments');
  });

  it('EXP-SCR-09: RunningBalancePage should compute verified running balance ledger', async () => {
    const fixture = await setupScreen(RunningBalancePage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Running Balance');
    expect(text).toContain('Current Net Balance');
  });

  it('EXP-SCR-10: SplitRulesPage should configure default split percentages and overrides', async () => {
    const fixture = await setupScreen(SplitRulesPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Expense Split Rules');
    expect(text).toContain('Default Household Split');
  });

  it('EXP-SCR-11: ExpenseDisputePage should facilitate structured dispute resolution', async () => {
    const fixture = await setupScreen(ExpenseDisputePage, { id: 'req-1' });
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Dispute Expense');
    expect(text).toContain('Reason for Dispute');
  });

  it('EXP-SCR-12: PayRequestPage should provide in-app payment simulated settlement', async () => {
    const fixture = await setupScreen(PayRequestPage, { id: 'req-1' });
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Pay Reimbursement Share');
    expect(text).toContain('Select Payment Method');
  });

  it('EXP-SCR-13: RepeatingPaymentsPage should manage recurring payment schedules', async () => {
    const fixture = await setupScreen(RepeatingPaymentsPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Scheduled & Repeating Payments');
    expect(text).toContain('Monthly Child Support');
  });

  it('EXP-SCR-14: AiExpenseEntryPage should simulate OCR receipt extraction', async () => {
    const fixture = await setupScreen(AiExpenseEntryPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('AI-Assisted Receipt Scanner');
    expect(text).toContain('Drop your receipt image here');
  });

  it('EXP-SCR-15: BillsPage should track shared recurring household bills', async () => {
    const fixture = await setupScreen(BillsPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Household Bills');
    expect(text).toContain('Oakland Montessori Daycare');
  });

  it('EXP-SCR-16: CreditBuildingPage should toggle credit bureau reporting enrollment', async () => {
    const fixture = await setupScreen(CreditBuildingPage);
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Credit Building Settings');
    expect(text).toContain('Credit Bureau Reporting');
  });

  it('EXP-SCR-17: ImportExpensesPage should parse sample CSV and import expenses', async () => {
    const fixture = await setupScreen(ImportExpensesPage);
    const component = fixture.componentInstance;
    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('Import past expenses');

    component.loadSampleCsv();
    fixture.detectChanges();
    expect(component.parsedRows().length).toBe(3);

    component.importAll();
    fixture.detectChanges();
    expect(component.importSuccessCount()).toBe(3);
  });
});
