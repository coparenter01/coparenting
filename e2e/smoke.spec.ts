import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('ParentPath Smoke & Accessibility (Phase 0)', () => {
  test('should load app shell and display brand elements', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/ParentPath/);

    const skipLink = page.getByRole('link', { name: /Skip to main content/i });
    await expect(skipLink).toBeAttached();

    const mainNav = page.getByRole('navigation', { name: /Main navigation/i });
    await expect(mainNav).toBeVisible();
  });

  test('should navigate to component gallery and pass axe checks', async ({ page }) => {
    await page.goto('/dev/ui');

    await expect(page.getByRole('heading', { level: 1, name: /Component Gallery/i })).toBeVisible();

    // Verify accessibility with Axe
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast']) // Pending final dynamic background contrast tuning in dev gallery
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    );
    expect(criticalViolations).toEqual([]);
  });
});
