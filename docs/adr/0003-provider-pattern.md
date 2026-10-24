# 0003. Provider Pattern and Simulators for External Services

- Status: Accepted
- Date: 2026-10-22
- Related: `docs/plan/01-scope-and-decisions.md` §2, EXP, CSS, NTF

## Context
ParentPath integrates with external services: transactional email, SMS, push notifications, payment processing (ACH/card transfers), and state child support enforcement agency systems. The product owner's requirement is zero operational cost (no paid third-party APIs), yet all 168 screens and full workflows must be functional in the first release.

## Decision
1. **Provider Abstraction:** All external capabilities are defined behind clean TypeScript interfaces in `src/app/core/providers/`:
   - `EmailProvider`
   - `SmsProvider`
   - `PaymentProvider`
   - `AgencySyncProvider`
   - `PushProvider`
2. **Real Implementations:** Free-tier providers (Brevo for email, Web Push API for browser notifications, Supabase Storage for files) are implemented directly.
3. **Labelled Simulators:** Services that have no free production tier (telecom SMS carrier routes, Stripe/Dwolla payment processing, real-time government agency feeds) are implemented as full-fidelity simulators (`SmsSimulator`, `PaymentSimulator`, `CssSimulator`).
4. **Visual Disclosure:** Any screen or component using simulated capabilities displays a visible "Test mode" badge (`pp-test-mode-badge`) so users and testers understand simulated data boundaries.

## Consequences
- **Positive:** Full user journeys (e.g. child support sync, expense reimbursement) work end-to-end without recurring API fees. Swapping a simulator for a paid API in future enterprise deployments requires only replacing the adapter class.
- **Watch:** Simulator behavior must closely match real-world timing and failure scenarios to ensure accurate UX and tests.

## Alternatives considered
- **Omitting Unfunded Features:** Rejected; owner decision D-09 requires all 168 screens and workflows in the first release.
- **Mocking at the HTTP layer only:** Insufficient; simulators need persisted records (outboxes, transaction logs, agency timelines) for court export verifications.
