# 0001. Architecture and Technology Stack

- Status: Accepted
- Date: 2026-10-22
- Related: All modules, FR-ACC, FR-SAF, FR-REC

## Context
ParentPath requires a modern, secure, accessible, and responsive web application designed for co-parents, including high-conflict situations and Safety Mode for survivors of domestic abuse. The product must run on zero-cost infrastructure (free tiers) without compromising security, data integrity, or user privacy.

## Decision
We chose the following fixed technology stack:
1. **Frontend:** Angular 19+, standalone components, signals, zoneless change detection, OnPush strategy, strict TypeScript. UI built with Angular Material M3 and Angular CDK, styled using custom SCSS design tokens (Teal primary `--pp-primary-600`, Apricot accent `--pp-accent-500`). Responsive layouts (sidebar ≥1024px, icon rail 600–1023px, bottom navigation <600px). FullCalendar (MIT) for calendar features. PWA via `@angular/pwa` with offline capability.
2. **Backend:** Supabase free tier (PostgreSQL with Row Level Security, Supabase Auth, Storage, Realtime, and Deno Edge Functions). Scheduled jobs using `pg_cron` and `pg_net`.
3. **Email:** Brevo free tier (HTTP API from Edge Functions, SMTP for Auth emails) behind an `EmailProvider` interface.
4. **Hosting:** Cloudflare Pages (free tier, commercial use allowed).
5. **Testing & QA:** Vitest for unit tests (≥85% coverage on logic), Playwright for end-to-end, accessibility (axe-core WCAG 2.2 AA), and multi-household RLS testing.

## Consequences
- **Positive:** Zero hosting or API subscription costs. Exceptional security via Postgres RLS. Fast, reactive UX using Angular Signals. Strict TypeScript prevents common runtime bugs.
- **Watch:** Supabase free plan inactivity pausing requires automated keepalive (`keepalive.yml`). External services with no free tier must be simulated cleanly.

## Alternatives considered
- **React / Next.js:** Not selected; Angular provides a standardized, enterprise-grade architecture with built-in forms, routing, and official Material design system.
- **Custom Node.js Backend:** High maintenance and hosting costs; Supabase provides turnkey auth, realtime, storage, and database security with minimal operational overhead.
