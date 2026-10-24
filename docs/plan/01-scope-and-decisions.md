# 01 · Scope and decisions

This file is **binding**. It overrides the BRDs, manual and requirements wherever they differ. The owner's constraints are:

1. **All 168 screens in the first release** (the POC/MVP is the whole application). The BRD release phases (MVP, Phase 2, Phase 3, Sync phases) are **ignored for scope**. Every feature and every screen in `docs/wireframes` is built.
2. **Web only**: a fully responsive web app that works well on phone, tablet and desktop, installable as a PWA. No iOS/Android store apps (PLT-02).
3. **Free plans only.** No paid accounts, paid APIs, or usage that would trigger a bill.
4. **English only** (ACC-08 Spanish is out; it has no screens).

## 1. Scope

Every feature ACC, NTF, MSG, CLL, CAL, EXP, CSS, REC, DOC, PRO, SAF and SUP, with all of its screens, built in phases 0–11 and launched in phase 12. `07-screen-map.md` maps every screen to its build phase. The Billing module (BIL) has no wireframes and is not built: the user manual says every feature is free.

## 2. Provider pattern: real where free, simulated where not

Some features depend on services that cost money. **The screens, flows, data, rules and records for those features are built in full.** Only the outside service is replaced, behind an interface, by a free real service or by a **simulator**. A simulator behaves like the real provider (statuses, delays, failures, webhooks) and is clearly labelled in the UI with a small "Test mode" badge, so nobody mistakes it for a live service. Swapping in a paid provider later means writing one new adapter, not changing features.

| Interface | Free implementation in this release | Features it serves |
|---|---|---|
| `EmailProvider` | **Real:** Brevo free plan (300/day). Supabase Auth emails via Brevo SMTP | Codes, invites, alerts, notices, support |
| `PushProvider` | **Real:** Web Push with VAPID keys | Alerts (on iPhone after "Add to Home Screen") |
| `SmsProvider` | **Simulator:** each "sent" text is stored in an SMS outbox with status Sent/Delivered/Failed and shown on NTF-SCR-B04 and the delivery log; an operations page lists the outbox. "Invite by text" and "message by text" also offer the phone's share sheet so a real text can be sent from the parent's own phone | ACC-01 SMS code option, ACC-02/ACC-04 texts, NTF-01 SMS step, NTF-03 health check, SAF-01 masked texts |
| `ToneProvider` | **Real, on-device:** rule-based English engine in the browser (word lists, phrase patterns, caps and punctuation rules, Low/Medium/High levels). No text leaves the device | MSG-04 tone check, MSG-06 shield, MSG-13 urgent detection |
| `AiProvider` | **Default: on-device, free and private.** Rewrite suggestions from rule-based softening templates (MSG-05); a curated library of co-parenting coach guidance matched by topic (MSG-11); receipt reading with **Tesseract.js** OCR in the browser plus amount/date/merchant parsing (EXP-11); call transcripts with an in-browser speech model (**transformers.js Whisper**) run on the recording (CLL-02). **Optional:** a `GeminiAiProvider` adapter, off by default, allowed only with test data, because the free Gemini tier may use inputs for training (conflicts with FR-MSG-04-07 / FR-MSG-06-13) | MSG-05, MSG-11, EXP-11, CLL-02 transcription |
| `PaymentProvider` | **Simulator:** a fake processor with the full status life cycle (Initiated → Processing → Completed / Failed / Reversed), fees shown as $0.00, simulated card entry (test card numbers only, never real card data), simulated merchant payees, and simulated credit-bureau reporting records | EXP-08 transfers, EXP-10 scheduled payments, EXP-12 bill pay, EXP-13 card payments, EXP-14 credit building |
| `AgencyConnector` | **Simulator** (as FR-CSS-12-15 requires): `css_simulator` schema + Edge Function behaving like a state API and daily batch file, with fake cases | CSS-01 … CSS-13, SAF family-violence offer |
| `CalendarSync` | **Real, free:** subscribe-by-link ICS feed (Google, Apple, Outlook can follow it). **Two-way** sync is simulated: changes made in a test "external calendar" page flow back as proposed entries | CAL-05 |
| `CallTransport` | **Real:** WebRTC peer-to-peer, signalling over Supabase Realtime, public STUN. Without a TURN relay some calls on strict networks fail with the documented error | CLL-01, CLL-03 |
| `Recorder` | **Real:** browser MediaRecorder after two-sided consent, stored in Storage (cap 60 minutes per call) | CLL-02 |
| `PdfSigner` | **Real:** server-side PDF (`pdf-lib`), SHA-256 fingerprint, Record ID on every page, signature with a private key in Function secrets. No trusted-signer badge in PDF readers (needs a paid certificate); verification page fully works | REC-01, CSS-11 |
| `NotaryService` | **Simulator:** staff workflow records notarisation and mailing done offline | REC-02 |
| `MediationService` | **Real workflow:** requests go to a `mediator` staff role in the staff workspace, with sessions scheduled and notes kept outside the record as the spec says | MSG-12 |
| `FileScanner` | **Partial:** allow-listed types (PDF, JPG, PNG, HEIC/HEIF), 10 MB cap, magic-byte check in an Edge Function, signed URLs only. No antivirus engine | DOC-02, DOC-03, MSG-09, EXP-02 |
| `Geolocation` | **Real:** browser Geolocation API with permission; never in Safety Mode | CAL-09 |

## 3. Out of scope

PLT-02 store apps · ACC-08 Spanish · BIL module (no screens) · real money movement, real card processing, real SMS delivery and a real state agency connection (all simulated, see §2).

## 4. Free-plan limits to design for

| Service | Limit (check the provider's pricing page; limits change) | Design response |
|---|---|---|
| Supabase database | 500 MB per project | Text data only in Postgres; files in Storage |
| Supabase Storage | 1 GB per project | Per-household storage meter; 10 MB per file; compress images in the browser; cap recordings |
| Supabase egress | about 5 GB per month | Paginate (25 rows), lazy-load images, cache |
| Supabase inactivity | Free projects pause after about a week with no activity | Resume from the dashboard in development; daily keepalive Action for prod |
| Supabase Edge Functions | about 500,000 calls per month, short CPU time per call | Keep functions small; split large exports into parts; heavy AI work runs in the browser |
| Brevo | 300 emails per day | Queue and retry; never bulk mail |
| Cloudflare Pages | Static hosting free; limited builds per month | Deploy from `main` only |
| Browser AI models | Whisper and OCR models download tens of MB on first use | Load them only when the feature is opened, show progress, cache in the browser |

## 5. Owner decisions recorded

| # | Decision | Status |
|---|---|---|
| D-01 | Web only, responsive PWA | Confirmed by owner |
| D-02 | Free plans only | Confirmed by owner |
| D-09 | All 168 screens in the first release (POC/MVP = full app) | Confirmed by owner |
| D-03 | No billing module; all features free | Assumed from user manual §1.1 — owner to confirm |
| D-04 | On-device tone engine and on-device AI by default; paid or free cloud AI only by owner decision | Assumed (privacy + free) — owner to confirm |
| D-10 | Payments, SMS and the agency connection run as labelled simulators ("Test mode") | Assumed (no free real provider exists) — owner to confirm |
| D-05 | Email via Brevo from the owner's verified address until a domain exists; custom domain recommended before real users | Owner to decide before launch |
| D-06 | Logo and brand as in `03-design-system.md` | Proposed — owner to approve |
| D-07 | Data stored in a US region | Assumed |
| D-08 | Advocates' approval for Safety Mode and counsel's wording for certification statements are business sign-offs; build with the manual's texts marked "pending sign-off" | Owner to obtain |
