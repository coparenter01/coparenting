import { expect, test } from '@playwright/test';

test.describe('Phase 12 User Journeys: Messaging & Calling', () => {
  test('Journey 5: Messaging the co-parent (MSG-SCR-01..13, NTF-SCR-03, NTF-SCR-B03)', async ({
    page,
  }) => {
    // 1. Thread list (MSG-SCR-01)
    await page.goto('/messages');
    await expect(page.getByRole('heading', { level: 1, name: /Messages|Thread/i })).toBeVisible();

    // 2. Compose message (MSG-SCR-03)
    await page.goto('/messages/new');
    await expect(
      page.getByRole('heading', { level: 1, name: /Compose|New Message/i }),
    ).toBeVisible();

    // 3. Drafts list (MSG-SCR-04)
    await page.goto('/messages/drafts');
    await expect(page.getByRole('heading', { level: 1, name: /Draft/i })).toBeVisible();

    // 4. AI settings (MSG-SCR-05)
    await page.goto('/messages/ai-settings');
    await expect(page.getByRole('heading', { level: 1, name: /AI|Tone/i })).toBeVisible();

    // 5. Search messages (MSG-SCR-08)
    await page.goto('/messages/search');
    await expect(page.getByRole('heading', { level: 1, name: /Search/i })).toBeVisible();

    // 6. Folders (MSG-SCR-09)
    await page.goto('/messages/folders');
    await expect(page.getByRole('heading', { level: 1, name: /Folder/i })).toBeVisible();

    // 7. Attachments (MSG-SCR-10)
    await page.goto('/messages/attachments');
    await expect(page.getByRole('heading', { level: 1, name: /Attachment/i })).toBeVisible();

    // 8. AI Coach (MSG-SCR-12)
    await page.goto('/messages/ai-coach');
    await expect(page.getByRole('heading', { level: 1, name: /Coach/i })).toBeVisible();

    // 9. Mediation request (MSG-SCR-13)
    await page.goto('/messages/mediation');
    await expect(page.getByRole('heading', { level: 1, name: /Mediation/i })).toBeVisible();

    // 10. Message status (NTF-SCR-03)
    await page.goto('/notifications/status/msg-sample-1');
    await expect(page.getByRole('heading', { level: 1, name: /Delivery|Status/i })).toBeVisible();

    // 11. Delivery log (NTF-SCR-B03)
    await page.goto('/notifications/delivery-log');
    await expect(page.getByRole('heading', { level: 1, name: /Delivery.*Log/i })).toBeVisible();
  });

  test('Journey 6: Calling the co-parent (CLL-SCR-01..07)', async ({ page }) => {
    // 1. Calling settings (CLL-SCR-01)
    await page.goto('/calls/settings');
    await expect(
      page.getByRole('heading', { level: 1, name: /Calling Settings|Call Settings/i }),
    ).toBeVisible();

    // 2. Place a call (CLL-SCR-02)
    await page.goto('/calls/new');
    await expect(
      page.getByRole('heading', { level: 1, name: /Place.*Call|Start.*Call|Call/i }),
    ).toBeVisible();

    // 3. Call log (CLL-SCR-06)
    await page.goto('/calls');
    await expect(page.getByRole('heading', { level: 1, name: /Call Log|Calls/i })).toBeVisible();

    // 4. Consent log (CLL-SCR-07)
    await page.goto('/calls/consent-log');
    await expect(page.getByRole('heading', { level: 1, name: /Consent/i })).toBeVisible();
  });
});
