# 0004. Authentication, 2FA, and the Verified-Session Gate

- Status: Accepted
- Date: 2026-10-22
- Related: FR-ACC-01, FR-ACC-02, FR-ACC-03, `docs/plan/02-architecture.md` §4

## Context
ParentPath holds sensitive co-parenting records, legal journal entries, certified court exports, expense disputes, and child personal information. In high-conflict family dynamics or domestic violence situations (Safety Mode), unauthorized access from a shared family device or shoulder-surfing presents severe risks.

## Decision
1. **Primary Authentication:** Supabase Auth using email OTP or email/password with mandatory 6-digit email confirmation code.
2. **Verified Session Gate:** A dual-gate security model (`verified-session.guard.ts`):
   - Standard session allows browsing low-risk public pages.
   - Accessing sensitive routes (child data, safety settings, financial expenses, court exports, legal records) requires an active verified session (verified via passcode or fresh OTP within the last 15 minutes).
3. **Multi-Household Isolation:** Strict PostgreSQL Row Level Security (RLS) on all tables ensures data is accessible only by authorized members of the specific household. Cross-household queries return 0 rows.
4. **Session Timeout:** Automated lock-out after 15 minutes of inactivity with a 2-minute warning modal and redirect to ACC-SCR-24 (Session timeout shell).

## Consequences
- **Positive:** Defense-in-depth protection. Compromised device sessions cannot access sensitive child records or modify Safety Mode without re-verification.
- **Watch:** Re-authentication UX must remain smooth and clear so legitimate parents are not frustrated during stressful moments.

## Alternatives considered
- **Single-factor session cookies:** Rejected; insufficient protection for court-ready sensitive evidence and safety-critical family settings.
- **Third-party Auth0/Okta:** Rejected due to recurring costs and complex external dependency; Supabase Auth native integration satisfies all requirements on zero-cost infrastructure.
