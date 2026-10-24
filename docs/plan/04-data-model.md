# 04 · Data model

The **field lists are in the specification**: each module's "Data reference" section in `docs/requirements/<MODULE>.md` (entities and fields, including the "new entities (proposed)" tables) and the "Field-level specifications" section in `docs/manual/<MODULE>.md`. Build tables from those. This file gives the conventions every table follows and the core tables that other modules depend on.

## 1. Conventions

- Schema `public` for app tables; `css_simulator` for the fake agency; `private` for internal helpers not exposed to the API.
- Table names plural snake_case; columns snake_case, matching spec field names where given (`display_name`, `mobile_number`, `attempted_at`).
- Primary key `id uuid default gen_random_uuid()`.
- `created_at timestamptz not null default now()`, `created_by uuid references auth.users` on user-created rows. All times are `timestamptz` (UTC).
- Choice fields use Postgres `text` + `check (col in (...))` with the exact values from the spec (`'Active','Locked','Closed'`), so the UI can display them directly.
- Household data carries `household_id uuid not null` and is protected by the standard policy (`02-architecture.md` §5).
- Visibility: `visibility text check (visibility in ('shared','private')) default 'shared'` plus `created_by`.
- **Shared items are never deleted:** `archived_at timestamptz`, `archived_by uuid`.
- **Versions:** an editable entity `X` has `X_versions(id, x_id, version_no, data jsonb, changed_by, changed_at, change_note)`; a trigger writes the old row on every update. Version history screens read from these.
- **Append-only** tables use the `raise_immutable()` trigger.
- Private notes, credentials and codes are hashed (`crypt()` / SHA-256 + salt in Edge Functions). Never store a plain passcode or code.
- Every table: RLS enabled in the same migration that creates it, plus at least one test proving a second household cannot read it.
- Indexes on every foreign key and on `(household_id, created_at desc)` for list screens.

## 2. Core tables (Phase 1)

| Table | Key columns | Notes |
|---|---|---|
| `profiles` | `id` (= auth user id), `email`, `display_name`, `mobile_number`, `language` ('English'), `status` ('Active','Locked','Closed'), `time_zone`, `failed_attempts`, `locked_until`, `passcode_hash`, `failed_passcodes`, `email_verified_at` | One per user, created by trigger on `auth.users` insert |
| `user_settings` | `user_id`, `session_timeout_minutes`, `alert_preview_level` ('Hidden','Name only','Name and text'), default 'Name only', `email_wait_minutes` (60), `tone_check_on`, `shield_on`, `shield_level`, `push_enabled` | Safety Mode stored separately (below) so it can be kept private |
| `safety_settings` | `user_id`, `is_on`, `turned_on_at` | Readable **only** by the user (policy `user_id = auth.uid()`); never joined into anything others can read |
| `households` | `id`, `name`, `mode` ('Linked','Solo'), `created_by` | |
| `household_members` | `household_id`, `user_id`, `role` ('Parent','Co-parent','Child','Third party'), `status`, `joined_at` | Unique (household_id, user_id) |
| `invites` | `household_id`, `invited_by`, `channel` ('Text','Email','Link'), `target_email`, `token_hash`, `status` ('Sent','Opened','Accepted','Expired','Cancelled'), `sent_at`, `opened_at`, `accepted_at`, `expires_at` | Token is random, only its hash is stored; expiry per ACC-02 |
| `contact_attempts` / `contact_attempt_results` | as spec ACC 3.2 | Append-only |
| `otp_codes` | `user_id`, `purpose` ('signin','safety_off','close_account'), `code_hash`, `expires_at`, `used_at`, `sent_count_window` | Service-role access only |
| `verified_sessions` | `session_id`, `user_id`, `verified_at`, `revoked_at`, `user_agent` | Service-role writes; used by `is_verified_session()` |
| `audit_log` | `household_id` (nullable), `actor_id`, `action`, `object_type`, `object_id`, `result`, `details jsonb`, `created_at` | Append-only. Readable by the actor for their own actions where the spec allows; Safety Mode entries never visible to others |
| `outbound_messages` | `channel` ('Email','Push','SMS'), `template`, `recipient_ref`, `status` ('Queued','Sent','Failed'), `attempts`, `provider_message_id`, `error`, `created_at`, `sent_at` | The send service log (NTF-06, NTF-SCR-B04). Never stores message bodies |
| `feature_flags` | `key`, `is_released` | Drives navigation (FR-SYS-01-02) |
| `staff_members` | `user_id`, `staff_role` | Support/operations/admin |

## 3. Module tables (create in their phase)

| Phase | Tables (derive fields from the module's data reference) |
|---|---|
| 3 Children and documents | `children`, `child_info_entries` (+ `_versions`), `documents`, `document_versions` (storage path, size, mime, sha256), `storage_usage` view |
| 2 Safety and privacy | `safety_settings` (from Phase 1), `ai_use_log` (feature, time, result; no text) |
| 4 Notifications and messaging | `threads`, `thread_members`, `messages` (append-only: body, sent_at, sender, thread), `message_status_events` (delivered/read with time, append-only), `message_drafts`, `message_reports`, `hold_reports`, `push_subscriptions`, `notification_jobs`, `notification_deliveries` |
| 6 Calendar | `events` (+ `_versions`; type event/parenting time; children; start/end; location; visibility), `event_children`, `schedule_change_requests`, `schedule_change_request_history` (append-only), `reminders` |
| 7 Expenses and payments | `expense_categories`, `expenses` (+ `_versions`), `expense_children`, `expense_files`, `reimbursement_requests`, `reimbursement_request_history`, `child_support_payments` (private to the recorder) |
| 9 Records | `journal_entries` (+ `_versions`, private), `exports` (record_id unique `XXXX-XXXX-XXXX-XXXX`, status, types, range, page_count, sha256, signature, storage_path), `verification_lookups` (append-only, no visitor personal data) |
| 11 Support | `support_cases` (case number), `support_case_messages`, `help_articles`, `service_notices`, `reply_templates` |
| All phases | the rest of each module's data reference, in that module's phase: household roles (1), albums, wish lists, task lists, share links, emergency contacts (3), folders, attachments, group threads, mediation requests, quiet windows, `sms_outbox` (4), call records, consent log, recordings, transcripts (5), templates, holidays, parenting-time records, exchanges, check-ins, pets, ICS tokens (6), split rules, disputes, `payment_sim_transactions`, scheduled payments, bills, credit-reporting records, imports (7), CSS case links, agency values, load log, `css_simulator` schema (8), affidavit requests, deletion requests, legal holds (9), professional access grants, access log, professional messages (10), support measures (11) |

## 4. Example: messages (pattern to copy)

```sql
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id),
  thread_id uuid not null references public.threads(id),
  sender_id uuid not null references auth.users(id),
  body text not null check (char_length(body) between 1 and 10000),
  sent_at timestamptz not null default now()
);
alter table public.messages enable row level security;

create trigger messages_immutable before update or delete on public.messages
  for each row execute function public.raise_immutable();

create policy "thread members read" on public.messages for select
  using (public.is_verified_session() and public.is_thread_member(thread_id));

create policy "thread members send as themselves" on public.messages for insert
  with check (public.is_verified_session()
              and public.is_thread_member(thread_id)
              and sender_id = auth.uid());

create index on public.messages (thread_id, sent_at desc);
```

## 5. Seed data (dev only)

`supabase/seed/` creates two households (Linked: "Rivera–Chen", Solo: "Okafor") with fake parents, two children, a month of events, messages, expenses and an agency simulator case. Never load seed data into prod. Test accounts use `+test` email aliases of the owner's inbox.
