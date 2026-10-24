-- ============================================================================
-- Phase 4: Notifications & Messaging Schema Migration
-- Features: MSG-01..MSG-14, NTF-01..NTF-06
-- Multi-tenant isolation with RLS, immutable message history, tone checks & delivery logs
-- ============================================================================

-- 1. Message Threads
create table if not exists public.message_threads (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  subject text not null,
  category text not null default 'General' check (category in ('General', 'Medical', 'School', 'Schedule', 'Expenses', 'Legal', 'Emergency')),
  is_group boolean not null default false,
  status text not null default 'Active' check (status in ('Active', 'Archived', 'Closed')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_message_threads_household on public.message_threads(household_id);
create index if not exists idx_message_threads_updated on public.message_threads(updated_at desc);

-- 2. Thread Participants
create table if not exists public.thread_participants (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.message_threads(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'Member' check (role in ('Owner', 'Member', 'Observer')),
  joined_at timestamptz not null default now(),
  last_read_at timestamptz,
  unique (thread_id, user_id)
);

create index if not exists idx_thread_participants_user on public.thread_participants(user_id);

-- 3. Messages (Immutable after sending)
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.message_threads(id) on delete cascade,
  sender_id uuid references public.profiles(id) on delete set null,
  body text not null check (length(body) <= 10000),
  is_urgent boolean not null default false,
  status text not null default 'Sent' check (status in ('Sent', 'Delivered', 'Read', 'Held')),
  sent_at timestamptz not null default now(),
  delivered_at timestamptz,
  read_at timestamptz,
  held_reason text,
  held_by_shield boolean not null default false,
  shield_unhidden_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_messages_thread on public.messages(thread_id, sent_at asc);
create index if not exists idx_messages_sender on public.messages(sender_id);

-- Trigger: enforce immutability on message content & delete prevention
create or replace function public.raise_immutable_message()
returns trigger
language plpgsql
security definer
as $$
begin
  if (TG_OP = 'DELETE') then
    raise exception 'Messages are permanent court-ready records and cannot be deleted.';
  end if;
  if (TG_OP = 'UPDATE') then
    -- Allow updating read_at, delivered_at, status, and shield_unhidden_at
    if (OLD.body is distinct from NEW.body or
        OLD.sender_id is distinct from NEW.sender_id or
        OLD.sent_at is distinct from NEW.sent_at or
        OLD.thread_id is distinct from NEW.thread_id or
        OLD.is_urgent is distinct from NEW.is_urgent) then
      raise exception 'Message content, sender, timestamp and urgent flags are immutable.';
    end if;
  end if;
  return NEW;
end;
$$;

drop trigger if exists trg_messages_immutable on public.messages;
create trigger trg_messages_immutable
  before update or delete on public.messages
  for each row execute function public.raise_immutable_message();

-- 4. Message Attachments
create table if not exists public.message_attachments (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  file_name text not null,
  file_size bigint not null,
  file_type text not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_message_attachments_message on public.message_attachments(message_id);

-- 5. Message Drafts (Offline-safe local / remote draft)
create table if not exists public.message_drafts (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references public.message_threads(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  subject text,
  body text not null default '',
  is_urgent boolean not null default false,
  updated_at timestamptz not null default now()
);

create index if not exists idx_message_drafts_user on public.message_drafts(user_id);

-- 6. Message Reports (Harm, Harassment or Threat reporting)
create table if not exists public.message_reports (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  reason text not null check (reason in ('Harassment', 'Hostile Tone', 'Threat', 'Profanity', 'False Information', 'Other')),
  details text,
  status text not null default 'Pending' check (status in ('Pending', 'Reviewed', 'Escalated', 'Dismissed')),
  created_at timestamptz not null default now()
);

create index if not exists idx_message_reports_message on public.message_reports(message_id);

-- 7. Message Folders & Topics
create table if not exists public.message_folders (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  color text default '#0E5A63',
  created_at timestamptz not null default now()
);

create table if not exists public.thread_folders (
  thread_id uuid not null references public.message_threads(id) on delete cascade,
  folder_id uuid not null references public.message_folders(id) on delete cascade,
  primary key (thread_id, folder_id)
);

-- 8. Mediation Requests
create table if not exists public.mediation_requests (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  requester_id uuid not null references public.profiles(id) on delete cascade,
  topic text not null,
  issue_summary text not null,
  status text not null default 'Requested' check (status in ('Requested', 'In Review', 'Assigned', 'Completed', 'Cancelled')),
  mediator_notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_mediation_requests_household on public.mediation_requests(household_id);

-- 9. Notification Preferences
create table if not exists public.notification_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references public.profiles(id) on delete cascade,
  push_enabled boolean not null default true,
  sms_enabled boolean not null default true,
  email_enabled boolean not null default true,
  sms_wait_minutes integer not null default 30,
  email_wait_minutes integer not null default 120,
  event_reminder_minutes integer not null default 1440,
  hearing_reminder_days integer not null default 7,
  agency_reminder_days integer not null default 3,
  quiet_hours_enabled boolean not null default false,
  quiet_hours_start text not null default '21:00',
  quiet_hours_end text not null default '07:00',
  quiet_hours_allow_urgent boolean not null default true,
  max_alerts_per_day integer not null default 20,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 10. In-App Notifications
create table if not exists public.in_app_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('Message', 'Reminder', 'Hearing', 'Agency', 'System', 'Urgent')),
  title text not null,
  body text not null,
  link_url text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_in_app_notifications_user on public.in_app_notifications(user_id, is_read, created_at desc);

-- 11. Notification Delivery Logs (Audit record)
create table if not exists public.notification_delivery_logs (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_type text not null,
  channel text not null check (channel in ('Push', 'SMS', 'Email')),
  recipient text not null,
  attempt_time timestamptz not null default now(),
  result text not null check (result in ('Delivered', 'Sent', 'Failed', 'Delayed_Quiet_Hours')),
  retry_count integer not null default 0,
  source_module text not null default 'Messaging' check (source_module in ('Messaging', 'Calendar', 'Child Support', 'Expenses', 'Safety', 'System'))
);

create index if not exists idx_notification_logs_household on public.notification_delivery_logs(household_id, attempt_time desc);

-- 12. AI Tone Flags (On-device check logging)
create table if not exists public.ai_tone_flags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  original_text text not null,
  flag_category text not null,
  severity text not null check (severity in ('Notice', 'Warning', 'Shield_Held')),
  suggested_rewrite text,
  accepted_rewrite boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_ai_tone_flags_user on public.ai_tone_flags(user_id, created_at desc);

-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================

alter table public.message_threads enable row level security;
alter table public.thread_participants enable row level security;
alter table public.messages enable row level security;
alter table public.message_attachments enable row level security;
alter table public.message_drafts enable row level security;
alter table public.message_reports enable row level security;
alter table public.message_folders enable row level security;
alter table public.thread_folders enable row level security;
alter table public.mediation_requests enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.in_app_notifications enable row level security;
alter table public.notification_delivery_logs enable row level security;
alter table public.ai_tone_flags enable row level security;

-- message_threads: household members can view; verified users can create
create policy "message_threads_select" on public.message_threads
  for select using (public.is_household_member(household_id, auth.uid()));

create policy "message_threads_insert" on public.message_threads
  for insert with check (public.is_household_member(household_id, auth.uid()));

create policy "message_threads_update" on public.message_threads
  for update using (public.is_household_member(household_id, auth.uid()));

-- thread_participants
create policy "thread_participants_select" on public.thread_participants
  for select using (
    exists (
      select 1 from public.message_threads t
      where t.id = thread_participants.thread_id
        and public.is_household_member(t.household_id, auth.uid())
    )
  );

create policy "thread_participants_insert" on public.thread_participants
  for insert with check (
    exists (
      select 1 from public.message_threads t
      where t.id = thread_participants.thread_id
        and public.is_household_member(t.household_id, auth.uid())
    )
  );

-- messages
create policy "messages_select" on public.messages
  for select using (
    exists (
      select 1 from public.message_threads t
      where t.id = messages.thread_id
        and public.is_household_member(t.household_id, auth.uid())
    )
  );

create policy "messages_insert" on public.messages
  for insert with check (
    sender_id = auth.uid() and
    exists (
      select 1 from public.message_threads t
      where t.id = messages.thread_id
        and public.is_household_member(t.household_id, auth.uid())
    )
  );

create policy "messages_update" on public.messages
  for update using (
    exists (
      select 1 from public.message_threads t
      where t.id = messages.thread_id
        and public.is_household_member(t.household_id, auth.uid())
    )
  );

-- message_attachments
create policy "message_attachments_select" on public.message_attachments
  for select using (
    exists (
      select 1 from public.messages m
      join public.message_threads t on t.id = m.thread_id
      where m.id = message_attachments.message_id
        and public.is_household_member(t.household_id, auth.uid())
    )
  );

create policy "message_attachments_insert" on public.message_attachments
  for insert with check (
    exists (
      select 1 from public.messages m
      join public.message_threads t on t.id = m.thread_id
      where m.id = message_attachments.message_id
        and m.sender_id = auth.uid()
    )
  );

-- message_drafts: only own user
create policy "message_drafts_all" on public.message_drafts
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- message_reports: own reports
create policy "message_reports_select" on public.message_reports
  for select using (reporter_id = auth.uid());

create policy "message_reports_insert" on public.message_reports
  for insert with check (reporter_id = auth.uid());

-- message_folders & thread_folders
create policy "message_folders_all" on public.message_folders
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "thread_folders_all" on public.thread_folders
  for all using (
    exists (
      select 1 from public.message_folders f
      where f.id = thread_folders.folder_id
        and f.user_id = auth.uid()
    )
  );

-- mediation_requests
create policy "mediation_requests_select" on public.mediation_requests
  for select using (public.is_household_member(household_id, auth.uid()));

create policy "mediation_requests_insert" on public.mediation_requests
  for insert with check (
    requester_id = auth.uid() and public.is_household_member(household_id, auth.uid())
  );

-- notification_preferences
create policy "notification_preferences_all" on public.notification_preferences
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- in_app_notifications
create policy "in_app_notifications_all" on public.in_app_notifications
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- notification_delivery_logs
create policy "notification_delivery_logs_select" on public.notification_delivery_logs
  for select using (
    user_id = auth.uid() or public.is_household_member(household_id, auth.uid())
  );

create policy "notification_delivery_logs_insert" on public.notification_delivery_logs
  for insert with check (
    user_id = auth.uid() and public.is_household_member(household_id, auth.uid())
  );

-- ai_tone_flags
create policy "ai_tone_flags_all" on public.ai_tone_flags
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
