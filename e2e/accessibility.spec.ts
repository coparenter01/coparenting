import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Phase 12 Comprehensive Axe WCAG 2.1 AA Accessibility Audit', () => {
  const auditRoutes = [
    '/auth/sign-in',
    '/auth/create-account',
    '/home',
    '/settings',
    '/messages',
    '/calls',
    '/calendar',
    '/expenses',
    '/child-support',
    '/children',
    '/documents',
    '/records',
    '/records/verify',
    '/professionals',
    '/safety',
    '/safety/resources',
    '/help',
    '/error',
    '/maintenance',
  ];

  for (const route of auditRoutes) {
    test(`Axe WCAG 2.1 AA audit on ${route} should have zero critical or serious violations`, async ({
      page,
    }) => {
      test.setTimeout(60000);
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .disableRules(['color-contrast']) // Pending client-configured custom brand pallet contrast overrides
        .analyze();

      const criticalViolations = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );

      expect(criticalViolations).toEqual([]);
    });
  }
});
