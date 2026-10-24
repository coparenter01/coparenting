# 08 · Engineering standards

**Binding, no exceptions.** The code must read like the work of a senior team at a top product company: consistent, typed end to end, layered, tested, secure, accessible and documented. Code that meets the feature but breaks a rule here is **not done**. When a rule truly cannot be met, record why in an ADR (`docs/adr/`) and get the owner's OK; never weaken a lint rule, a type setting or a test threshold to make something pass.

Quality is enforced in four layers, so it does not depend on memory:

1. **This document** (read before every phase).
2. **Tooling:** strict TypeScript, ESLint with zero warnings, Prettier, module-boundary rules, commit linting, pre-commit checks (`standards/templates/`).
3. **Editor-time checks:** in Claude Code, hooks (`.claude/settings.json`) format and lint every edited file immediately and block finishing with type errors. In Antigravity and other tools, the agent runs `npm run lint` and `npm run typecheck` after every batch of edits (`AGENTS.md` §4b, `/build-step`). Pre-commit hooks and CI apply to every tool.
4. **Independent review:** after every step a code review and a security review (`docs/review/`) are run by separate agents that did not write the code (Claude Code: `@agent-code-reviewer`, `@agent-security-reviewer`; Antigravity: `/review`). Every finding is fixed or answered before the commit. CI then gates the merge.

---

## 1. Architecture

### 1.1 Layers (dependencies point down only)

```
features/<module>/pages        routed screens (one per screen ID) — thin: compose components, read stores
features/<module>/components   presentational, inputs/outputs only, no data access
features/<module>/data-access  feature store (NgRx SignalStore) + API service for that module
features/<module>/models       types, mappers (DB row ⇄ domain model), validators, message catalogue
shared/ui                      design-system components (no business logic, no data access)
shared/utils                   pure functions (dates, money, formatting), fully unit-tested
core                           singletons: Supabase client, auth/session, guards, interceptors, error handling,
                               logging, time zone, Safety Mode, feature flags, providers (email/SMS/payment/AI adapters)
```

Rules (enforced with `eslint-plugin-boundaries`):
- `pages` → `components`, `data-access`, `models`, `shared`, `core`. `components` → `models`, `shared` only.
- A feature never imports another feature's internals. Cross-module needs go through that module's **public API** file (`features/<module>/index.ts`) or through `core`.
- `shared` never imports `features` or `core` services. `core` never imports `features`.
- Only `data-access` services talk to Supabase, and only through `core/supabase`.
- No circular imports (`import/no-cycle`).

### 1.2 Repository and folder structure

```
parentpath/
├─ AGENTS.md · CLAUDE.md · GEMINI.md · README.md · CHANGELOG.md
├─ .claude/                     settings.json (hooks) · hooks/ · agents/
├─ .github/                     workflows/ci.yml · workflows/keepalive.yml · pull_request_template.md · dependabot.yml
├─ .husky/                      pre-commit · commit-msg
├─ docs/                        specification · plan/ · adr/ (architecture decision records)
├─ src/
│  ├─ main.ts · index.html · styles.scss
│  ├─ environments/
│  ├─ styles/                   tokens.scss · theme.scss · typography.scss · mixins.scss
│  └─ app/
│     ├─ app.config.ts · app.routes.ts · app.ts
│     ├─ core/
│     │  ├─ auth/               auth.service.ts · session.store.ts · verified-session.guard.ts · role.guard.ts
│     │  ├─ supabase/           supabase-client.ts · database.types.ts (generated) · supabase-error.mapper.ts
│     │  ├─ errors/             app-error.ts · global-error-handler.ts · error-codes.ts
│     │  ├─ logging/            logger.service.ts
│     │  ├─ time/               time-zone.service.ts
│     │  ├─ safety/             safety-mode.store.ts · exit-now.service.ts
│     │  ├─ flags/              feature-flags.store.ts
│     │  ├─ offline/            connectivity.service.ts · draft-storage.service.ts (IndexedDB)
│     │  └─ providers/          email/ · sms/ · push/ · payment/ · ai/ · tone/ · agency/ (interface + adapters each)
│     ├─ layout/                app-shell/ · side-nav/ · bottom-nav/ · top-bar/ · public-shell/ · staff-shell/
│     ├─ shared/
│     │  ├─ ui/                 button-row, page-header, data-list, empty-state, error-state, skeleton, confirm-dialog,
│     │  │                      status-chip, test-mode-badge, file-upload, money, date-time, private-chip, …
│     │  ├─ directives/ · pipes/ · validators/
│     │  └─ utils/
│     └─ features/
│        ├─ accounts/ notifications/ messaging/ calling/ calendar/ expenses/ child-support/
│        ├─ records/ children/ documents/ professionals/ safety/ support/ staff/ public/
│        └─ <module>/
│           ├─ index.ts                     public API (routes + anything other modules may use)
│           ├─ <module>.routes.ts           lazy routes; every route has data: { screenId: 'MSG-SCR-01', title }
│           ├─ pages/<screen-name>/         one folder per screen: component .ts/.html/.scss + .spec.ts
│           ├─ components/<name>/
│           ├─ data-access/                 <module>.api.ts · <module>.store.ts (+ .spec.ts)
│           └─ models/                      <module>.models.ts · <module>.mappers.ts · <module>.messages.ts
├─ supabase/
│  ├─ config.toml
│  ├─ migrations/               YYYYMMDDHHMMSS_<module>_<change>.sql
│  ├─ functions/<name>/         index.ts (thin handler) · handler.ts · handler.test.ts
│  ├─ functions/_shared/        cors.ts · auth.ts · validation.ts · errors.ts · email/ · sms/ · push/ · payment/
│  └─ seed/                     dev-only fake data
├─ tests/
│  ├─ e2e/                      Playwright specs by journey + page objects in e2e/pages/
│  ├─ rls/                      security tests: two households, every table
│  └─ fixtures/
└─ tools/                       scripts (type generation, screen-coverage report)
```

Files follow the naming the installed Angular CLI generates (current style guide). One component, service or store per file. File names in kebab-case; classes in PascalCase; signals and functions in camelCase; constants in UPPER_SNAKE_CASE; database objects in snake_case.

### 1.3 Traceability to the specification

- Every routed page sets `data: { screenId: '<ID>' }`. Screens that are not routes (banners, dialogs, alert and email templates) export `export const SCREEN = { screenId: 'NTF-SCR-B01' } as const;` from their component file. `tools/screen-coverage.mjs` reports progress against all 168 wireframe IDs; from Phase 12 it runs with `--strict` in CI and fails if any is missing.
- Message texts live in `models/<module>.messages.ts` keyed by spec ID: `ERR_03`, `MSGT_05`. Never inline user-facing strings that the spec defines.
- Test names start with the acceptance criterion they prove: `it('AC-MSG-02-01: a sent message cannot be edited', …)`.
- Commit messages and PR descriptions cite FR/AC IDs.

## 2. Angular and TypeScript rules

- **Latest stable Angular**, standalone components only, **zoneless change detection**, OnPush change detection on every component (explicit, or the framework default where the installed Angular makes OnPush the default — never `Default`/eager), built-in control flow (`@if`, `@for` with `track`, `@switch`, `@defer`), `inject()` for DI, `input()` / `output()` / `model()` signal APIs, `computed()` for derived state. No NgModules, no `*ngIf`/`*ngFor`, no constructor injection, no `@Input()` decorators.
- **State:** shared feature state in an **NgRx SignalStore** per module (`data-access/<module>.store.ts`) exposing read-only signals and intent methods. Local UI state as component signals. RxJS only for streams (Realtime, debounced search), converted with `toSignal`, always cleaned up (`takeUntilDestroyed`). No manual `subscribe` in components.
- **Forms:** typed Reactive Forms (`FormGroup<…>` with `nonNullable`), validators in `shared/validators` or the module's `models`, error text from the module's message catalogue, validation on blur and submit.
- **TypeScript:** `strict: true` plus `noUncheckedIndexedAccess`, `noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noPropertyAccessFromIndexSignature`, `useUnknownInCatchVariables`; Angular `strictTemplates`, `strictInjectionParameters`, `strictInputAccessModifiers`. **No `any`**, no `as unknown as`, no non-null `!` without a comment proving it, no `@ts-ignore` (`@ts-expect-error` only with a reason).
- **Types end to end:** generate `database.types.ts` after every migration (`supabase gen types typescript`); map DB rows to domain models in `models/*.mappers.ts`; components never see raw rows.
- **Errors:** data services throw a typed `AppError { code, specId?, cause }`; the store exposes `error` signal; the UI shows the module's ERR text. Unexpected errors reach `GlobalErrorHandler` → ACC-SCR-21 with a technical reference sent to Support. Never swallow an error; never show raw messages or stack traces.
- **Templates:** no logic beyond simple conditions; no function calls in bindings except signals; no `innerHTML` (except sanitized, reviewed content from the help editor); never `bypassSecurityTrust*`.
- **Styling:** SCSS with design tokens only (no hard-coded colours, sizes or fonts); component styles encapsulated; mobile-first media queries via shared mixins; no `!important`, no `::ng-deep`.
- **Performance:** lazy routes per module; `@defer` for heavy widgets (calendar, charts, OCR, call screen); OCR and speech models in **Web Workers**; `NgOptimizedImage`; CDK virtual scroll for long lists; bundle budgets enforced (initial ≤ 500 kB warning / 750 kB error, per lazy chunk ≤ 300 kB warning).
- **Size limits:** files ≤ 400 lines, functions ≤ 50 lines, cyclomatic complexity ≤ 12 (lint-enforced). Split instead of growing.
- **No dead code:** no commented-out code, no unused exports, no `console.*` (use `LoggerService`), no TODO without an issue reference.
- **Comments:** explain *why*, not *what*. Every public service/store method has a one-line TSDoc. Non-obvious business rules cite the FR ID.

## 3. Backend rules (Supabase)

- **Migrations:** one concern per file, forward-only, idempotent where possible, never edited after reaching prod. Every new table in the same migration: RLS enabled, policies, indexes, comments (`comment on table … is '…'`), and an entry in the RLS test suite.
- **SQL style:** lowercase keywords, snake_case, explicit column lists (no `select *` in functions or views), `timestamptz` only, `check` constraints for spec choice values, foreign keys everywhere with explicit `on delete` behaviour (default `restrict`; shared records are archived, not cascaded).
- **Functions:** `security definer` only when needed, always with `set search_path = public, pg_temp`; `stable`/`immutable` declared correctly; grants revoked from `public` and given to `authenticated` explicitly.
- **Edge Functions:** TypeScript (Deno), `index.ts` is a thin HTTP adapter; logic in `handler.ts`, unit-tested with `deno test`. Validate every input with **zod**; verify the JWT and `is_verified_session`; consistent JSON error shape `{ code, message, specId }`; CORS restricted to the app origins; no secrets in code or logs; idempotency keys for anything that sends or charges (email, SMS, payments).
- **Provider adapters:** every outside service sits behind an interface in `_shared/<provider>/` (backend) or `core/providers/` (frontend), with a real adapter and/or a simulator, chosen by configuration. Features never import an adapter directly.

## 4. Testing

| Level | Tool | What | Gate |
|---|---|---|---|
| Unit | Angular CLI default runner (Vitest) | stores, services, mappers, validators, utils, pipes; components with logic | ≥ 85% lines/branches on `data-access`, `models`, `shared/utils`, `core`; ≥ 75% overall |
| Component | Angular Testing Library | key screens: four states, form validation, accessibility roles | every page has at least one spec |
| Edge Functions | `deno test` | handlers incl. validation and error paths | every function |
| Security | `tests/rls` (supabase-js, two signed-in households) | every table: other household cannot read/write; private items; staff limits; append-only tables reject update/delete | 100% of tables |
| End to end | Playwright (Chromium + mobile WebKit emulation) | each journey in manual §2.4 and each phase's done checks; role-based locators (`getByRole`, `getByLabel`), page objects | all green |
| Accessibility | `@axe-core/playwright` | every routed screen | zero serious/critical violations |
| Visual responsive | Playwright screenshots at 375 / 768 / 1280 | key screens | reviewed on change |

Tests are written with the code, not after the phase. A bug fix always adds the test that would have caught it.

## 5. Git workflow and CI gates

- **Branches:** `main` is always deployable and protected. One short branch per step: `feat/msg-thread-list`, `fix/cal-undo-window`, `chore/…`.
- **Commits:** Conventional Commits (`feat(msg): add thread list (MSG-SCR-01, FR-MSG-01-02)`), enforced by commitlint. Small, focused, each one builds.
- **Pull requests:** one per step, using the PR template (summary, screens, FR/AC covered, tests, screenshots at 3 widths, reviewer findings resolved). Squash-merge after CI passes.
- **Pre-commit (husky + lint-staged):** Prettier, ESLint `--max-warnings 0`, related unit tests.
- **CI (`.github/workflows/ci.yml`) must pass to merge:** format check · lint (zero warnings) · type check · unit tests with coverage thresholds · Edge Function tests · production build with budgets · RLS suite · Playwright e2e + axe · `npm audit --audit-level=high` · licence allow-list (MIT, Apache-2.0, BSD, ISC) · secret scan (gitleaks) · screen-coverage report (blocking from Phase 12).
- **Dependencies:** exact versions, lockfile committed, Dependabot weekly, no package without an active maintainer and a permissive licence, and no new dependency without a one-line justification in the PR.

## 6. Security baseline (OWASP ASVS level 2 as the yardstick)

RLS on every table and the verified-session gate · least-privilege grants · input validation on client and server · output encoding by Angular (no bypass) · CSP, HSTS, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, `Permissions-Policy` limiting camera/microphone/geolocation to the app · secrets only in Function secrets · signed URLs (60 s) for files · rate limits on codes, sign-in, verification lookups · audit log for security events · no personal data in logs, URLs or analytics · dependency and secret scanning in CI · Safety Mode data never exposed to other roles, including staff.

## 7. Documentation

- `README.md`: what the app is, how to run, test and deploy, environment variables (names only).
- `docs/adr/NNNN-title.md` for each significant decision (stack, state management, provider pattern, auth design, any deviation).
- `CHANGELOG.md` generated from commits per phase.
- TSDoc on public APIs; SQL `comment on` for tables and functions.

## 8. Review loop for every step (mandatory)

1. Build the step with its tests.
2. Run locally: format, lint, type check, unit tests, the step's e2e and axe checks, production build.
3. Run both independent reviews on the diff (`docs/review/code-review.md`, `docs/review/security-review.md`): Claude Code `@agent-code-reviewer` + `@agent-security-reviewer`; Antigravity `/review`.
4. Fix every *blocker* and *major* finding; fix or justify every *minor*. Re-run the reviewers until they report no blockers or majors.
5. Commit, push the branch, open the PR, wait for CI to pass, squash-merge.
6. Update `PROGRESS.md` with the review outcome and test results.
