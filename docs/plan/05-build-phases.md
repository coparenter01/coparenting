# 05 · Build phases

**All 168 screens ship in the first release.** The phases below are only the *order* of building: each phase finishes one module completely (every feature, every screen, every rule), so later modules can rely on it. Nothing is postponed. `07-screen-map.md` lists the exact screens of each phase.

Start every phase by writing a short plan into `PROGRESS.md` and getting the owner's "go". Within a phase, build the core flow first, then the remaining screens of that module.

| Phase | Module(s) | Screens |
|---|---|---|
| 0 | Foundation and app shell | 4 |
| 1 | Accounts and household | 22 |
| 2 | Safety and privacy | 12 |
| 3 | Children and documents | 15 |
| 4 | Notifications and messaging | 21 |
| 5 | Calling | 7 |
| 6 | Calendar and parenting time | 14 |
| 7 | Expenses and payments | 17 |
| 8 | Child support sync | 16 |
| 9 | Records and court | 16 |
| 10 | Professionals | 10 |
| 11 | Help and support (incl. staff workspace) | 14 |
| 12 | Hardening and launch | — |
| | **Total** | **168** |

---

## Phase 0 · Foundation and app shell

**Build:** Angular project, strict mode, ESLint, Prettier; Material M3 theme from `03-design-system.md`; Public Sans; logo and PWA icons; app shell (sidebar / icon rail / bottom nav, top bar) with placeholder pages for every menu item behind feature flags; shared UI kit (page header, data-list table↔cards, empty/error/loading states, confirm dialog, status chip, "Test mode" badge); system pages ACC-SCR-21–24; `TimeService`; Supabase client on `parentpath-dev`; `feature_flags`; provider interfaces from `01-scope-and-decisions.md` §2 (empty adapters); GitHub repo; CI; Cloudflare Pages deploy; `/dev/ui` component gallery (not in prod nav). **Engineering foundation:** apply every file in `standards/templates/` (strict TypeScript, ESLint zero-warning config with layer boundaries, Prettier, EditorConfig, LF line endings, husky + lint-staged + commitlint, CI, Dependabot, PR template, bundle budgets, path aliases), set up Vitest coverage thresholds, Playwright (chromium + mobile, axe, RLS project), `tools/screen-coverage.mjs`, branch protection on `main`, and ADRs 0001–0004.

**Done checks:** `npm run verify` passes and both reviewer agents approve the foundation · CI runs every gate on a pull request · the live URL opens with logo and menu · phone width shows bottom navigation, no sideways scroll · a wrong URL shows Not found · network off shows the offline banner · CI is green.

## Phase 1 · Accounts and household

**Features:** ACC-01 … ACC-07, ACC-09 … ACC-12, NTF-06. Home, Settings, Household overview, Session timeout.
**Build:** core tables; `auth-signin`, `auth-otp`, `passcode`, `invite`, `contact-nonapp`; Brevo email; SMS simulator + outbox; verified-session gate; invites by Email / Link / Text (simulated text + share sheet); accept invite with child matching; Solo Mode; contact-attempt log; session and draft settings; household members and roles (child and third-party accounts); profile; password reset; close account; audit log.
**Done checks:** sign up with an email code → Home · second code on every sign-in, lock after 5 wrong passwords · invite a second email → accept → household **Linked** · add a third-party member with limited access · a user in another household sees nothing (automated RLS tests) · Solo Mode contact attempts are logged and cannot be edited · close account offers export first.

## Phase 2 · Safety and privacy

**Features:** SAF-01, SAF-02, SAF-03 (all 12 screens, including the family-violence offer screen, which Phase 8 triggers).
**Build:** Safety Mode on/off with email code, Exit now + Escape twice → neutral page, public safety resources, alert preview levels, hidden-image placeholder, AI and your data, AI use log, masking views, `SafetyModeService` used by every later phase.
**Done checks:** Exit now on every screen; Back does not return after exit · the co-parent sees no sign of Safety Mode and no contact details · turning it off needs the code.

## Phase 3 · Children and documents

**Features:** DOC-01 … DOC-07. **Build:** children and child information with versions; documents with upload, versions, storage meter, recently deleted; photo albums; wish list; shared task lists; expiring share links + public share page; emergency contacts + public consent page; `file-check`.
**Done checks:** child info edit keeps history · a phone photo uploads; an `.exe` or 15 MB file is refused · private items stay private · a share link stops working after expiry · an emergency contact can agree or stop on the public page.

## Phase 4 · Notifications and messaging

**Features:** NTF-01 … NTF-05, MSG-01 … MSG-14. **Build:** threads with Realtime, compose with 10,000-character limit, drafts (offline-safe), immutable messages with delivery/read status, tone check, AI rewrite (on-device), incoming shield, search, folders, attachments, group threads with third parties, AI coach (on-device library), mediation request → staff mediator queue, urgent-message detection, report a message; web push; `dispatcher` escalation push → SMS (simulated) → email; delivery log; notification settings, health check, quiet windows; reminder alerts.
**Done checks:** two browsers chat in real time · no edit/delete on sent messages · read time hidden when the reader is in Safety Mode · a harsh draft shows the tone panel and Rewrite suggestions · an abusive incoming message is held and can be opened · unread message → simulated SMS in the outbox, then a real email · quiet hours delay alerts · a mediation request reaches the staff queue.

## Phase 5 · Calling

**Features:** CLL-01 … CLL-03. **Build:** settings, place/incoming call, call screen (audio/video), recording request and two-sided consent, recording upload, on-device transcript, call log, consent log; calls in Records data.
**Done checks:** a video call between two browsers on different networks · recording only after both agree · the transcript appears for the recording · no phone number visible anywhere.

## Phase 6 · Calendar and parenting time

**Features:** CAL-01 … CAL-11, NTF-04 reminders. **Build:** calendar views (agenda on phones), events, parenting time, change requests with confirm and 10-minute undo, history, templates and schedule builder, holidays, sync (ICS feed + simulated two-way), exchanges and check-ins, compliance view, parenting plan builder, pets.
**Done checks:** a swap request → approve → undo window → calendar updates · a 2-2-3 template fills a month · subscribing to the ICS link in Google Calendar shows the events · check-in records location (not in Safety Mode) · compliance view compares planned vs actual.

## Phase 7 · Expenses and payments

**Features:** EXP-01 … EXP-15. **Build:** expense log, add/edit with receipts and versions, AI-assisted entry (Tesseract.js OCR), reimbursement requests, running balance, split rules, categories and per-child, child support payments (private), disputes, pay a request (simulated transfer/card), scheduled and repeating payments, bills (simulated bill pay), credit building setting (simulated reporting), import past expenses from CSV.
**Done checks:** a receipt photo pre-fills amount, date and merchant · a 60/40 split rule applies automatically · paying a request walks through Processing → Completed in Test mode · a dispute keeps the expense in the balance · a CSV import adds past expenses.

## Phase 8 · Child support sync

**Features:** CSS-01 … CSS-13. **Build:** `css_simulator` (fake API + daily batch), sync engine with source and last-synced labels, link case with identity check and consent, overview, payments side by side with mismatch flags, due dates and reminders, agency items in the calendar, share an item, shared with you, unlink and export, proof to the agency, proof package, family-violence offer → Safety Mode, invite through agency notice, timeline, hearing packet, operations load log.
**Done checks:** link the fake case → agency balance and payments appear with "Source: agency · last synced" labels · a payment recorded in Expenses but missing at the agency is flagged · a hearing appears in the calendar · the family-violence flag offers Safety Mode only to that parent.

## Phase 9 · Records and court

**Features:** REC-01 … REC-07. **Build:** Records home, journal, export (certified PDF, PDF, CSV) covering every module, export history, public verification page, affidavit request/status/staff review, public records request page, court notes by state, model order language, retention policy, deletion request, legal hold.
**Done checks:** a certified PDF has a Record ID on every page · the public page confirms it without names and detects an edited copy · an affidavit request moves through staff review · a deletion request is blocked by a legal hold with the right message.

## Phase 10 · Professionals

**Features:** PRO-01, PRO-02. **Build:** my professionals, invite, access settings, share an item, access log, accept invite, professional home and client view (read-only), one message to a professional, messages from a parent.
**Done checks:** a lawyer account sees only what was shared, can change nothing · the co-parent is alerted with the professional's name · every view appears in the access log.

## Phase 11 · Help and support

**Features:** SUP-01 … SUP-03. **Build:** help center, search, articles, request forms (in app and on the sign-in page), confirmation with case number, my requests and thread; staff queue, case view, reply templates, service notices, article editor; support measures report.
**Done checks:** a request gets a case number by email · a staff account answers from the queue · staff cannot open parents' messages · the measures report shows reply times.

## Phase 12 · Hardening and launch

Switch `screens:coverage` to `--strict` in CI (all 168 screens present) · full-codebase review by both reviewer agents · accessibility pass (keyboard, screen reader, axe in Playwright) on all 168 screens · responsive pass at 375/768/1280 · security review of every RLS policy and function · performance (Lighthouse ≥ 90 mobile on Home and Messages) · error paths · prod Supabase project, migrations, secrets, keepalive, backups · production deploy · privacy and terms pages (owner supplies text).

**Done checks:** the owner and a test co-parent complete all 14 journeys in manual §2.4 on real phones against the live site.
