import { expect, test } from '@playwright/test';

test.describe('Phase 12 User Journeys: Trust, Safety, Support & System Resilience', () => {
  test('Journey 10: Giving a professional access (PRO-SCR-01..10)', async ({ page }) => {
    // 1. Professionals list (PRO-SCR-01)
    await page.goto('/professionals');
    await expect(page.getByRole('heading', { level: 1, name: /Professional/i })).toBeVisible();

    // 2. Invite professional (PRO-SCR-02)
    await page.goto('/professionals/invite');
    await expect(page.getByRole('heading', { level: 1, name: /Invite/i })).toBeVisible();

    // 3. Access log (PRO-SCR-05)
    await page.goto('/professionals/access-log');
    await expect(page.getByRole('heading', { level: 1, name: /Access Log/i })).toBeVisible();

    // 4. Professional portal (PRO-SCR-07)
    await page.goto('/professionals/portal');
    await expect(
      page.getByRole('heading', { level: 1, name: /Professional Workspace|Clients|Workspace/i }),
    ).toBeVisible();

    // 5. Send message to professional (PRO-SCR-09)
    await page.goto('/professionals/message');
    await expect(page.getByRole('heading', { level: 1, name: /Message/i })).toBeVisible();
  });

  test('Journey 11: Staying safe (SAF-SCR-01..12)', async ({ page }) => {
    // 1. Safety Mode settings (SAF-SCR-01)
    await page.goto('/safety');
    await expect(
      page.getByRole('heading', { level: 1, name: /Privacy and safety|Safety/i }),
    ).toBeVisible();

    // 2. Safety notice (SAF-SCR-02)
    await page.goto('/safety/turn-on');
    await expect(
      page.getByRole('heading', { level: 1, name: /Safety Notice|Turn on Safety|Notice/i }),
    ).toBeVisible();

    // 3. Neutral disguise page (SAF-SCR-04)
    await page.goto('/safety/exit-neutral');
    await expect(page.getByRole('heading', { name: 'What Exit now does' })).toBeVisible();

    // 4. Public safety resources (SAF-SCR-05)
    await page.goto('/safety/resources');
    await expect(page.getByRole('heading', { level: 1, name: /Resource|Safety/i })).toBeVisible();

    // 5. Alert & media masking settings (SAF-SCR-07)
    await page.goto('/safety/alerts-images');
    await expect(
      page.getByRole('heading', { level: 1, name: /Privacy and safety|Alert/i }),
    ).toBeVisible();

    // 6. AI & Privacy disclosure (SAF-SCR-10)
    await page.goto('/safety/ai-data');
    await expect(page.getByRole('heading', { name: /AI and your data/i })).toBeVisible();

    // 7. AI Use log (SAF-SCR-11)
    await page.goto('/safety/ai-log');
    await expect(page.getByRole('heading', { level: 1, name: /AI Use Log|Audit/i })).toBeVisible();
  });

  test('Journey 12: Settings and notifications (ACC-SCR-20, NTF-SCR-01..04, ACC-SCR-04)', async ({
    page,
  }) => {
    // 1. Settings hub (ACC-SCR-20)
    await page.goto('/settings');
    await expect(page.getByRole('heading', { level: 1, name: /Settings/i })).toBeVisible();

    // 2. App lock settings (ACC-SCR-04)
    await page.goto('/settings/app-lock');
    await expect(page.getByRole('heading', { level: 1, name: /Security|Lock/i })).toBeVisible();

    // 3. Notification settings (NTF-SCR-01)
    await page.goto('/notifications/settings');
    await expect(page.getByRole('heading', { level: 1, name: /Notification/i })).toBeVisible();

    // 4. Health check (NTF-SCR-02)
    await page.goto('/notifications/health-check');
    await expect(page.getByRole('heading', { level: 1, name: /Health Check|Test/i })).toBeVisible();

    // 5. Quiet windows (NTF-SCR-04)
    await page.goto('/notifications/quiet-windows');
    await expect(page.getByRole('heading', { level: 1, name: /Quiet/i })).toBeVisible();
  });

  test('Journey 13: Getting help & Support (SUP-SCR-01..14)', async ({ page }) => {
    // 1. Help center (SUP-SCR-01)
    await page.goto('/help');
    await expect(page.getByRole('heading', { level: 1, name: /Help/i })).toBeVisible();

    // 2. Search results (SUP-SCR-02)
    await page.goto('/help/search');
    await expect(page.getByRole('heading', { level: 1, name: /Search/i })).toBeVisible();

    // 3. New request form (SUP-SCR-04)
    await page.goto('/help/request');
    await expect(page.getByRole('heading', { level: 1, name: /Request|Support/i })).toBeVisible();

    // 4. My requests (SUP-SCR-06)
    await page.goto('/help/my-requests');
    await expect(page.getByRole('heading', { level: 1, name: /Request/i })).toBeVisible();

    // 5. Staff queue (SUP-SCR-09)
    await page.goto('/help/staff/queue');
    await expect(
      page.getByRole('heading', { level: 1, name: /Open cases|Staff Queue|Queue/i }),
    ).toBeVisible();

    // 6. Service notices (SUP-SCR-11)
    await page.goto('/help/staff/notices');
    await expect(
      page.getByRole('heading', { level: 1, name: /Service notices|Notice/i }),
    ).toBeVisible();

    // 7. Reply templates (SUP-SCR-13)
    await page.goto('/help/staff/templates');
    await expect(page.getByRole('heading', { level: 1, name: /Template/i })).toBeVisible();

    // 8. Support measures (SUP-SCR-14)
    await page.goto('/help/operations/measures');
    await expect(page.getByRole('heading', { level: 1, name: /Measure|Report/i })).toBeVisible();
  });

  test('Journey 14: System resilience and error handling (ACC-SCR-21..23)', async ({ page }) => {
    // 1. System error screen (ACC-SCR-21)
    await page.goto('/error');
    await expect(
      page.getByRole('heading', { level: 1, name: /Something went wrong|Error|Problem/i }),
    ).toBeVisible();

    // 2. Planned maintenance screen (ACC-SCR-23)
    await page.goto('/maintenance');
    await expect(
      page.getByRole('heading', { level: 1, name: /Down for planned maintenance|Maintenance/i }),
    ).toBeVisible();

    // 3. Page not found / wildcard (ACC-SCR-22)
    await page.goto('/unknown-nonexistent-route-for-404-check');
    await expect(page.getByRole('heading', { level: 1, name: /Not found|404/i })).toBeVisible();
  });
});
