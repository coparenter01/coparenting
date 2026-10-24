import { expect, test } from '@playwright/test';

test.describe('Phase 12 Step 12-C: Multi-Viewport Responsive Pass', () => {
  const routesToCheck = ['/home', '/messages', '/calendar', '/expenses', '/help', '/safety'];

  test.describe('Mobile Viewport (375px)', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    for (const route of routesToCheck) {
      test(`Layout on mobile (${route}) should have no horizontal overflow`, async ({ page }) => {
        await page.goto(route);
        await page.waitForLoadState('domcontentloaded');

        // Verify bottom navigation is attached/visible in mobile app shell
        const mainNav = page.getByRole('navigation', { name: /Main navigation/i });
        await expect(mainNav).toBeVisible();

        // Check no horizontal scrollbar / overflow
        const isOverflowing = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });
        expect(isOverflowing).toBe(false);
      });
    }
  });

  test.describe('Tablet Viewport (768px)', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    for (const route of routesToCheck) {
      test(`Layout on tablet (${route}) should have no horizontal overflow`, async ({ page }) => {
        await page.goto(route);
        await page.waitForLoadState('domcontentloaded');

        // Check no horizontal scrollbar / overflow
        const isOverflowing = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });
        expect(isOverflowing).toBe(false);
      });
    }
  });

  test.describe('Desktop Viewport (1280px)', () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    for (const route of routesToCheck) {
      test(`Layout on desktop (${route}) displays full sidebar with zero horizontal overflow`, async ({
        page,
      }) => {
        await page.goto(route);
        await page.waitForLoadState('domcontentloaded');

        // Brand logo should be visible in desktop sidebar
        const brandLink = page.getByRole('link', { name: /ParentPath – go to home/i });
        await expect(brandLink).toBeVisible();

        // Check no horizontal scrollbar / overflow
        const isOverflowing = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });
        expect(isOverflowing).toBe(false);
      });
    }
  });
});
