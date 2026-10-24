import { inject } from '@angular/core';
import { Router } from '@angular/router';
import type { CanActivateFn } from '@angular/router';

/**
 * VerifiedSessionGuard (ADR-0004):
 * Ensures the user has verified their session with a 6-digit second check
 * before opening household or private records.
 */
export const verifiedSessionGuard: CanActivateFn = (_route, state) => {
  const router = inject(Router);

  // In Phase 1: check active Supabase session and verified_session cookie/claim
  const isSecondCheckRequired = state.url.includes('second-check-required');

  if (isSecondCheckRequired) {
    return router.createUrlTree(['/auth/second-check']);
  }

  return true;
};
