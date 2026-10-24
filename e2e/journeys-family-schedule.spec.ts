import { expect, test } from '@playwright/test';

test.describe('Phase 12 User Journeys: Family, Children & Scheduling', () => {
  test('Journey 3: Children and their information (DOC-SCR-01..15, CAL-SCR-14)', async ({
    page,
  }) => {
    // 1. Children overview (DOC-SCR-01)
    await page.goto('/children');
    await expect(page.getByRole('heading', { level: 1, name: /Children/i })).toBeVisible();

    // 2. Child information (DOC-SCR-02)
    await page.goto('/children/info');
    await expect(
      page.getByRole('heading', { level: 1, name: /Children|Information/i }),
    ).toBeVisible();

    // 3. Documents list (DOC-SCR-05)
    await page.goto('/documents');
    await expect(page.getByRole('heading', { level: 1, name: /Documents/i })).toBeVisible();

    // 4. Upload document (DOC-SCR-06)
    await page.goto('/documents/upload');
    await expect(
      page.getByRole('heading', { level: 1, name: /Upload a document|Upload document/i }),
    ).toBeVisible();

    // 5. Photo albums (DOC-SCR-09)
    await page.goto('/documents/photos');
    await expect(page.getByRole('heading', { level: 1, name: /Photo albums/i })).toBeVisible();

    // 6. Wish list (DOC-SCR-10)
    await page.goto('/children/wishlist');
    await expect(page.getByRole('heading', { level: 1, name: /Wish list/i })).toBeVisible();

    // 7. Tasks (DOC-SCR-11)
    await page.goto('/children/tasks');
    await expect(page.getByRole('heading', { level: 1, name: /Task lists/i })).toBeVisible();

    // 8. Emergency contacts (DOC-SCR-14)
    await page.goto('/children/emergency');
    await expect(
      page.getByRole('heading', { level: 1, name: /Emergency contacts/i }),
    ).toBeVisible();

    // 9. Pets (CAL-SCR-14)
    await page.goto('/calendar/pets');
    await expect(page.getByRole('heading', { level: 1, name: /Pets/i })).toBeVisible();
  });

  test('Journey 4: Planning parenting time & Calendar (CAL-SCR-01..13)', async ({ page }) => {
    // 1. Calendar overview (CAL-SCR-01)
    await page.goto('/calendar');
    await expect(page.getByRole('heading', { level: 1, name: /Calendar/i })).toBeVisible();

    // 2. Event form (CAL-SCR-02)
    await page.goto('/calendar/add-event');
    await expect(page.getByRole('heading', { level: 1, name: /Event/i })).toBeVisible();

    // 3. Parenting time form (CAL-SCR-03)
    await page.goto('/calendar/add-parenting-time');
    await expect(page.getByRole('heading', { level: 1, name: /Parenting Time/i })).toBeVisible();

    // 4. Schedule change request (CAL-SCR-04)
    await page.goto('/calendar/request-swap');
    await expect(
      page.getByRole('heading', { level: 1, name: /Schedule Change|Change Request/i }),
    ).toBeVisible();

    // 5. Schedule templates (CAL-SCR-07)
    await page.goto('/calendar/templates');
    await expect(
      page.getByRole('heading', { level: 1, name: /Schedule builder|Template/i }),
    ).toBeVisible();

    // 6. Holidays (CAL-SCR-08)
    await page.goto('/calendar/holidays');
    await expect(page.getByRole('heading', { level: 1, name: /Holiday/i })).toBeVisible();

    // 7. Exchanges (CAL-SCR-10)
    await page.goto('/calendar/exchanges');
    await expect(page.getByRole('heading', { level: 1, name: /Exchange/i })).toBeVisible();

    // 8. Compliance view (CAL-SCR-11)
    await page.goto('/calendar/compliance');
    await expect(page.getByRole('heading', { level: 1, name: /Compliance/i })).toBeVisible();

    // 9. Parenting plan builder (CAL-SCR-12)
    await page.goto('/calendar/plan-builder');
    await expect(page.getByRole('heading', { level: 1, name: /Parenting Plan/i })).toBeVisible();

    // 10. Check-in (CAL-SCR-13)
    await page.goto('/calendar/check-in');
    await expect(page.getByRole('heading', { level: 1, name: /Check[- ]in/i })).toBeVisible();
  });
});
