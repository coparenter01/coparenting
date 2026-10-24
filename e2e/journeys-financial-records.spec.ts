import { expect, test } from '@playwright/test';

test.describe('Phase 12 User Journeys: Expenses, Child Support & Court-Ready Records', () => {
  test('Journey 7: Sharing child costs (EXP-SCR-01..17)', async ({ page }) => {
    // 1. Expense log (EXP-SCR-01)
    await page.goto('/expenses');
    await expect(page.getByRole('heading', { level: 1, name: /Expense/i })).toBeVisible();

    // 2. Add expense (EXP-SCR-02)
    await page.goto('/expenses/new');
    await expect(page.getByRole('heading', { level: 1, name: /Expense/i })).toBeVisible();

    // 3. Reimbursement list (EXP-SCR-06)
    await page.goto('/expenses/reimbursements');
    await expect(page.getByRole('heading', { level: 1, name: /Reimbursement/i })).toBeVisible();

    // 4. Running balance (EXP-SCR-09)
    await page.goto('/expenses/balance');
    await expect(page.getByRole('heading', { level: 1, name: /Balance/i })).toBeVisible();

    // 5. Split rules (EXP-SCR-10)
    await page.goto('/expenses/split-rules');
    await expect(page.getByRole('heading', { level: 1, name: /Split Rule/i })).toBeVisible();

    // 6. Repeating expenses (EXP-SCR-13)
    await page.goto('/expenses/recurring');
    await expect(
      page.getByRole('heading', { level: 1, name: /Repeating|Recurring/i }),
    ).toBeVisible();

    // 7. Bills (EXP-SCR-15)
    await page.goto('/expenses/bills');
    await expect(page.getByRole('heading', { level: 1, name: /Bill/i })).toBeVisible();

    // 8. Import expenses (EXP-SCR-17)
    await page.goto('/expenses/import');
    await expect(page.getByRole('heading', { level: 1, name: /Import/i })).toBeVisible();
  });

  test('Journey 8: Linking the child support case (CSS-SCR-01..16)', async ({ page }) => {
    // 1. Overview (CSS-SCR-03)
    await page.goto('/child-support');
    await expect(page.getByRole('heading', { level: 1, name: /Child Support/i })).toBeVisible();

    // 2. Link a case (CSS-SCR-01)
    await page.goto('/child-support/link');
    await expect(page.getByRole('heading', { level: 1, name: /Link/i })).toBeVisible();

    // 3. Payments comparison (CSS-SCR-04)
    await page.goto('/child-support/payments-comparison');
    await expect(page.getByRole('heading', { level: 1, name: /Payment/i })).toBeVisible();

    // 4. Due dates (CSS-SCR-05)
    await page.goto('/child-support/due-dates');
    await expect(page.getByRole('heading', { level: 1, name: /Due Date/i })).toBeVisible();

    // 5. Send proof (CSS-SCR-10)
    await page.goto('/child-support/send-proof');
    await expect(page.getByRole('heading', { level: 1, name: /Proof/i })).toBeVisible();

    // 6. Case timeline (CSS-SCR-14)
    await page.goto('/child-support/timeline');
    await expect(page.getByRole('heading', { level: 1, name: /Timeline/i })).toBeVisible();

    // 7. Hearing packet (CSS-SCR-15)
    await page.goto('/child-support/hearing-packet');
    await expect(page.getByRole('heading', { level: 1, name: /Packet|Hearing/i })).toBeVisible();
  });

  test('Journey 9: Keeping a court-ready record (REC-SCR-B01, REC-SCR-01..15)', async ({
    page,
  }) => {
    // 1. Records home (REC-SCR-B01)
    await page.goto('/records');
    await expect(page.getByRole('heading', { level: 1, name: /Record/i })).toBeVisible();

    // 2. Create export (REC-SCR-01)
    await page.goto('/records/export');
    await expect(page.getByRole('heading', { level: 1, name: /Export/i })).toBeVisible();

    // 3. Export history (REC-SCR-02)
    await page.goto('/records/history');
    await expect(page.getByRole('heading', { level: 1, name: /History/i })).toBeVisible();

    // 4. Public record verification (REC-SCR-03)
    await page.goto('/records/verify');
    await expect(page.getByRole('heading', { level: 1, name: /Verif/i })).toBeVisible();

    // 5. Private journal notes (REC-SCR-04)
    await page.goto('/records/journal');
    await expect(page.getByRole('heading', { level: 1, name: /Journal/i })).toBeVisible();

    // 6. Affidavit request (REC-SCR-07)
    await page.goto('/records/affidavit/new');
    await expect(page.getByRole('heading', { level: 1, name: /Affidavit/i })).toBeVisible();

    // 7. Court notes (REC-SCR-11)
    await page.goto('/records/court-notes');
    await expect(page.getByRole('heading', { level: 1, name: /Court/i })).toBeVisible();

    // 8. Retention policy (REC-SCR-13)
    await page.goto('/records/retention');
    await expect(page.getByRole('heading', { level: 1, name: /Retention/i })).toBeVisible();

    // 9. Legal hold (REC-SCR-15)
    await page.goto('/records/legal-hold');
    await expect(page.getByRole('heading', { level: 1, name: /Legal Hold/i })).toBeVisible();
  });
});
