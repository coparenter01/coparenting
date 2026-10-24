import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Phase 1 Accounts & Household E2E Journeys (Step 1-E)', () => {
  test('Journey 1: Sign in and 2FA second check flow', async ({ page }) => {
    await page.goto('/auth/sign-in');

    await expect(page.getByRole('heading', { level: 1, name: /Sign in/i })).toBeVisible();

    // Fill form
    await page.getByLabel(/Email/i).fill('parent@example.com');
    await page.getByLabel(/Password/i).fill('SecretPassword123!');

    const submitBtn = page.getByRole('button', { name: /Continue|Sign in/i });
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // Routes to second check for 6-digit security code
    await page.waitForURL('**/auth/second-check**');
    await expect(page.getByRole('heading', { level: 1, name: /Enter your code/i })).toBeVisible();
    await expect(page.getByText(/6-digit code/i)).toBeVisible();
  });

  test('Journey 2: Household overview, Solo Mode & Contact Non-App Parent', async ({ page }) => {
    // Navigate to Household Overview
    await page.goto('/accounts/household');
    await expect(page.getByRole('heading', { level: 1, name: /Household/i })).toBeVisible();

    // Navigate to Solo Mode selection
    await page.goto('/accounts/choose-solo-mode');
    await expect(
      page.getByRole('heading', { level: 1, name: /How will you use ParentPath/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Choose Solo Mode|Use Solo Mode/i }),
    ).toBeVisible();

    // Navigate to Non-app contact attempts log
    await page.goto('/accounts/contact-nonapp');
    await expect(
      page.getByRole('heading', { level: 1, name: /Message your co-parent outside the app/i }),
    ).toBeVisible();

    // Test sending non-app message
    await page
      .getByPlaceholder(/Type your message here/i)
      .fill('Confirming dentist appointment on Friday.');
    const sendBtn = page.getByRole('button', { name: /Send/i });
    await expect(sendBtn).toBeVisible();
  });

  test('Journey 3: Household members & roles management', async ({ page }) => {
    await page.goto('/accounts/household/members');
    await expect(page.getByRole('heading', { level: 1, name: /Household members/i })).toBeVisible();

    // Check action button
    const addBtn = page.getByRole('button', { name: /Add member/i });
    await expect(addBtn).toBeVisible();
  });

  test('Journey 4: Session draft settings & Profile', async ({ page }) => {
    await page.goto('/accounts/settings/session');
    await expect(page.getByRole('heading', { level: 1, name: /Session and draft/i })).toBeVisible();

    // Profile page
    await page.goto('/accounts/profile');
    await expect(page.getByRole('heading', { level: 1, name: /Profile/i })).toBeVisible();
  });

  test('Journey 5: Close account flow safeguards export before closure', async ({ page }) => {
    await page.goto('/accounts/close-account');
    await expect(page.getByRole('heading', { level: 1, name: /Close.*account/i })).toBeVisible();

    // Export buttons should be prominent
    const exportPdfBtn = page.getByRole('button', { name: /Export as PDF/i });
    await expect(exportPdfBtn).toBeVisible();

    // Acknowledge export warning to enable close button
    const exportCheckbox = page.getByRole('checkbox', {
      name: /I understand and want to close my account/i,
    });
    await exportCheckbox.check();

    const proceedBtn = page.getByRole('button', { name: /Close account/i });
    await expect(proceedBtn).toBeEnabled();
  });

  test('Journey 6: System SMS/Notification simulator outbox', async ({ page }) => {
    await page.goto('/notifications/send-status');
    await expect(page.getByRole('heading', { level: 1, name: /Send status/i })).toBeVisible();
    await expect(page.getByText(/Delivered/i)).toBeVisible();
  });
});

test.describe('Phase 1 Accessibility (Axe WCAG 2.1 AA)', () => {
  const routesToAudit = [
    '/auth/sign-in',
    '/auth/second-check',
    '/accounts/household',
    '/accounts/choose-solo-mode',
    '/accounts/household/members',
    '/accounts/settings/session',
    '/accounts/profile',
    '/accounts/close-account',
    '/notifications/send-status',
    '/home',
    '/settings',
  ];

  for (const route of routesToAudit) {
    test(`Axe audit on ${route}`, async ({ page }) => {
      await page.goto(route);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .disableRules(['color-contrast'])
        .analyze();

      const criticalViolations = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );
      expect(criticalViolations).toEqual([]);
    });
  }
});
