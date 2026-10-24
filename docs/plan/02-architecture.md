# 02 · Architecture

## 1. Overview

```
Browser (Angular PWA, Cloudflare Pages)
   │  supabase-js (anon/publishable key + user JWT)
   ▼
Supabase project (US region)
   ├─ Postgres  — tables, RLS policies, triggers, SQL functions (RPC)
   ├─ Auth      — email + password, email codes (custom SMTP = Brevo)
   ├─ Storage   — private buckets: documents, receipts, exports, recordings
   ├─ Realtime  — new messages, receipts, call signalling, live badges
   ├─ Edge Functions (Deno) — anything needing secrets or trusted logic
   └─ pg_cron + pg_net — runs the "dispatcher" function every minute
          │
          ├─ Brevo API (email)      └─ Web Push (VAPID)
```

Rule of thumb: **simple reads and writes** go straight from Angular to Postgres, protected by RLS. **Anything that must be trusted** (sign-in counting, codes, exports, invite acceptance, sending email/push, file checks, scheduled work) runs in an Edge Function or a `security definer` SQL function.

## 2. Environments

| Env | Supabase project | Frontend | Notes |
|---|---|---|---|
| Local | `parentpath-dev` | `ng serve` on http://localhost:4200 | No Docker needed: migrations are pushed to the dev project with `supabase db push` |
| Live | `parentpath-prod` | Cloudflare Pages from `main` | Migrations applied after they pass on dev |

`src/environments/environment.ts` holds the dev URL and publishable key; `environment.prod.ts` holds prod. These keys are public by design; security comes from RLS.

## 3. Repository layout

> The authoritative, detailed structure and layer rules are in `08-engineering-standards.md` §1. The sketch below is a summary.

```
parentpath/
├─ AGENTS.md  CLAUDE.md  GEMINI.md
├─ docs/                       (specification + plan; do not edit specs)
├─ src/
│  ├─ app/
│  │  ├─ core/                 auth, guards, interceptors, session timeout, time zone, error handler, safety-mode service, feature flags
│  │  ├─ (no global data folder: each feature has its own data-access/; generated types live in core/supabase/)
│  │  ├─ layout/               app shell: sidebar, top bar, mobile bottom nav, Exit now button, offline banner
│  │  ├─ shared/ui/            page-header, data-list, empty-state, error-state, loading-skeleton, confirm-dialog, status-chip, file-upload, date-time display
│  │  ├─ public/               sign-up, sign-in, verify, reset, accept invite, verification page, safety resources, public share link, help (public)
│  │  └─ features/
│  │     ├─ home/ settings/ household/ notifications/ messaging/ calling/ calendar/
│  │     ├─ expenses/ child-support/ records/ children/ documents/
│  │     ├─ professionals/ safety/ help/
│  │     └─ staff/             support + operations workspace (separate layout)
│  ├─ styles/                  tokens.scss, theme.scss (Material M3), typography.scss, utilities.scss
│  └─ assets/brand/            logo files from the kit
├─ supabase/
│  ├─ migrations/              timestamped SQL
│  ├─ functions/               one folder per Edge Function; _shared/ for email, push, cors, auth helpers
│  └─ seed/                    fake data for dev only
├─ e2e/                        Playwright tests
└─ .github/workflows/          ci.yml (build + tests), keepalive.yml
```

Routes: `/` public landing → sign in; signed-in app under `/app/...` with one lazy route per module (`/app/messages`, `/app/calendar`, …); staff under `/staff/...`; professionals under `/pro/...`; public pages under `/verify`, `/safety`, `/help`, `/share/:token`, `/invite/:token`.

## 4. Authentication and the second check (ACC-01)

1. **Sign-up** (ACC-SCR-01): `supabase.auth.signUp`. "Confirm email" is on and the email template sends the 6-digit `{{ .Token }}` (ACC-09, ACC-SCR-14). Set the OTP expiry to 600 seconds in Auth settings.
2. **Sign-in step 1**: Edge Function `auth-signin` receives email + password, checks `profiles.locked_until`, calls Supabase Auth, counts failures (5 → Locked for 15 min, ERR-11) and returns the session. The client never counts failures.
3. **Sign-in step 2** (ACC-SCR-03): Edge Function `auth-otp` with `send` / `verify`. Codes: 6 digits, stored hashed in `otp_codes`, valid 10 minutes, single use, resend after 60 s, max 5 per hour. On success it inserts the current JWT `session_id` into `verified_sessions`.
4. **Gate**: every RLS policy on household data includes `public.is_verified_session()`:

```sql
create or replace function public.is_verified_session()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from verified_sessions v
    where v.session_id = (auth.jwt() ->> 'session_id')::uuid
      and v.user_id = auth.uid()
      and v.revoked_at is null);
$$;
```

   An Angular route guard also sends unverified sessions to the second-check screen, but the database gate is what actually protects the data.
5. **Passcode lock** (ACC-SCR-04, ACC-SCR-17): 6-digit passcode hashed server-side; asked on reopen and after idle; 5 wrong → sign out (ERR-12).
6. **Session timeout** (FR-SYS-05-08): idle timer; warning 2 minutes before (ACC-SCR-25).
7. **Password reset** (ACC-10): `resetPasswordForEmail` with a code template; all sessions revoked after reset.
8. Every sign-in, lock and passcode change writes to `audit_log`.

## 5. Authorisation model

- `household_members(household_id, user_id, role, status)`; roles: `parent`, `co_parent`, `child`, `third_party`. Professionals use `professional_access` grants (PRO-01). Staff use `staff_members(user_id, staff_role)` with roles `support_agent`, `support_lead`, `operations`, `platform_admin`.
- Helper SQL functions (all `stable security definer`): `is_household_member(hid)`, `household_role(hid)`, `is_parent_in(hid)`, `is_staff(role)`, `can_see_item(owner_id, visibility)`.
- Standard policy for a household table:

```sql
create policy "members read shared or own" on public.events for select
using ( public.is_verified_session()
        and public.is_household_member(household_id)
        and (visibility = 'shared' or created_by = auth.uid()) );
```

- Staff can **never** read messages, recordings, journal or agency data (manual §1.3). Do not create staff policies on those tables.
- Safety Mode hiding (addresses, locations, contact details) is applied in **views or RPCs that mask columns** for viewers other than the owner, not only in the UI.

## 6. Records that cannot change

For append-only tables (`messages`, `message_receipts` events, `audit_log`, `contact_attempts`, `contact_attempt_results`, `*_history`, `*_versions`, `verification_lookups`), add:

```sql
create trigger no_update_delete before update or delete on public.messages
for each row execute function public.raise_immutable();
```

and grant no UPDATE/DELETE policies. Shared items get `archived_at` instead of delete; edits insert a row into the matching `_versions` table through a trigger.

## 7. Edge Functions (planned)

| Function | Purpose | Phase |
|---|---|---|
| `auth-signin`, `auth-otp`, `passcode` | Sign-in counting, second check, passcode | 1 |
| `invite` | Create, send, open and accept invites; household linking and child matching | 1 |
| `send-email` (shared module) | Brevo API, templates, logging to `outbound_messages`, retries | 1 |
| `contact-nonapp` | Email to a co-parent not on the app; reply-by-email link page | 1 |
| `sms-sim` (shared module) | SMS simulator: writes to `sms_outbox`, simulates delivery/failure, same interface a real SMS adapter would use | 1 |
| `file-check` | Verify upload type/size by magic bytes; move from `incoming/` to final path | 3 |
| `safety-mode` | Turn off with code; audit | 2 |
| `push` (shared module) | Web Push send with VAPID | 4 |
| `dispatcher` | Runs every minute from `pg_cron`: unread-message escalation (push → simulated SMS → email), quiet windows, reminders, change-request undo windows (10 min) and expiry, reimbursement deadlines, retries | 4–7 |
| `call-signal` (Realtime channel conventions) + `recording-upload` | WebRTC signalling, consent checks, recording storage | 5 |
| `ics-feed`, `calendar-sync-sim` | Private calendar subscription feed; simulated two-way external calendar | 6 |
| `payment-sim` | Payment simulator: transfers, card payments (test numbers only), bill pay, scheduled runs, credit-reporting records, webhooks back to the app | 7 |
| `css-simulator`, `css-sync` | Agency simulator API and batch loads; sync engine | 8 |
| `export-records` | Build PDF/CSV, Record ID, SHA-256, signing, store in `exports` bucket; also hearing packets (CSS-11) | 9 |
| `verify-record` | Public lookup + uploaded-file fingerprint check, rate limit 10 per 10 min per device | 9 |

Shared code in `supabase/functions/_shared/`. All functions validate input, check the caller's JWT and `is_verified_session` where needed, and return the module's ERR codes.

## 8. Notifications pipeline (NTF)

1. A trigger on `messages` inserts rows in `notification_jobs` for each recipient: `push` now, `sms` at +15 minutes (only if the recipient has a verified mobile number; sent through the SMS simulator), `email` at +1 hour (user settings, 15 min–24 h). Quiet windows (NTF-05) delay jobs.
2. `dispatcher` sends due jobs, skips them if the message was read, retries 3 times over 15 minutes, and writes every attempt to `notification_deliveries` (the delivery log, NTF-SCR-B03).
3. Alert content follows the preview level (SAF-02) and Safety Mode (hidden sender and text).
4. In-app: Realtime subscription updates unread badges and the thread view.

## 9. Files

Private buckets with paths `household_id/<module>/<uuid>-<filename>`. Storage policies check household membership through the first path segment. Downloads use signed URLs valid for 60 seconds. Images are resized/compressed in the browser before upload. Never render uploaded HTML/SVG.

## 10. Frontend architecture

- Standalone components, `ChangeDetectionStrategy.OnPush`, signals for state; one `*Store` service per feature when state is shared between screens.
- `core/supabase/supabase-client.ts` is the only place the client is created; feature `data-access` services use it.
- `TimeService` formats every date in the user's time zone (`Intl.DateTimeFormat`); never use the server's zone.
- `SafetyModeService` exposes `isOn` and drives the Exit now button, Escape-twice shortcut and alert preview lock.
- Global `ErrorHandler` shows the ERR-01 error page with "Contact support" (sends the technical reference to Support, not shown to the user).
- Offline: `navigator.onLine` + service worker; banner MSGT-06; drafts kept in IndexedDB until sent.
- Feature flags table (`feature_flags`) hides modules not yet released (FR-SYS-01-02: navigation lists only released modules).

## 11. Quality, CI and deployment

- GitHub Actions `ci.yml`: install, lint, unit tests, `ng build --configuration production`, Playwright against the dev project on pull requests.
- Cloudflare Pages: build command `npx ng build --configuration production`, output folder `dist/parentpath/browser`, SPA fallback (`_redirects`: `/* /index.html 200`), security headers in `_headers` (CSP, HSTS, X-Frame-Options DENY, Referrer-Policy no-referrer).
- `keepalive.yml`: daily scheduled request to the prod API so the free project does not pause.
- Backups: free plan has no point-in-time restore; add a weekly GitHub Action that runs `supabase db dump` for schema and stores it as a build artifact (data backups need care: no real family data in GitHub; document the gap).
