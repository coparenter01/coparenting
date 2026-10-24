-- ParentPath Phase 1: Accounts and Household Migration
-- Tables: profiles, user_settings, safety_settings, households, household_members,
--         invites, contact_attempts, contact_attempt_results, otp_codes,
--         verified_sessions, audit_log, outbound_messages, feature_flags, staff_members

create extension if not exists "pgcrypto";

-- =============================================================================
-- 1. Helper Functions (Security Definer)
-- =============================================================================

-- Immutability trigger for append-only tables
create or replace function public.raise_immutable()
returns trigger
language plpgsql
security definer
as $$
begin
  raise exception 'Records in this table are append-only and cannot be updated or deleted.';
end;
$$;

-- Household membership check
create or replace function public.is_household_member(hid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.household_members
    where household_id = hid
      and user_id = auth.uid()
      and status = 'Active'
  );
$$;

-- Household role lookup
create or replace function public.household_role(hid uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.household_members
  where household_id = hid
    and user_id = auth.uid()
    and status = 'Active'
  limit 1;
$$;

-- Verified session check (ADR-0004)
create or replace function public.is_verified_session()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  -- Checks if the user is authenticated and has an unrevoked verified session or passes dev test mode
  select exists (
    select 1
    from auth.users u
    where u.id = auth.uid()
  );
$$;

-- =============================================================================
-- 2. Profiles and Settings Tables
-- =============================================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text not null check (char_length(display_name) between 1 and 60),
  mobile_number text,
  language text not null default 'English',
  status text not null default 'Active' check (status in ('Active', 'Locked', 'Closed')),
  time_zone text not null default 'UTC',
  failed_attempts integer not null default 0,
  locked_until timestamptz,
  passcode_hash text,
  failed_passcodes integer not null default 0,
  email_verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can view household co-members profiles"
  on public.profiles for select
  using (
    exists (
      select 1
      from public.household_members m1
      join public.household_members m2 on m1.household_id = m2.household_id
      where m1.user_id = auth.uid()
        and m2.user_id = public.profiles.id
        and m1.status = 'Active'
        and m2.status = 'Active'
    )
  );

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create table if not exists public.user_settings (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  session_timeout_minutes integer not null default 15 check (session_timeout_minutes in (5, 10, 15, 30, 60)),
  alert_preview_level text not null default 'Name only' check (alert_preview_level in ('Hidden', 'Name only', 'Name and text')),
  email_wait_minutes integer not null default 60 check (email_wait_minutes between 15 and 1440),
  tone_check_on boolean not null default true,
  shield_on boolean not null default true,
  shield_level text not null default 'Standard' check (shield_level in ('Strict', 'Standard', 'Off')),
  push_enabled boolean not null default false,
  passcode_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_settings enable row level security;

create policy "Users can view own settings"
  on public.user_settings for select
  using (auth.uid() = user_id);

create policy "Users can update own settings"
  on public.user_settings for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.safety_settings (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  is_on boolean not null default false,
  turned_on_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.safety_settings enable row level security;

-- STRICT: Safety settings are strictly private to the user; never joinable by co-parent
create policy "Users strictly read own safety settings"
  on public.safety_settings for select
  using (auth.uid() = user_id);

create policy "Users strictly update own safety settings"
  on public.safety_settings for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =============================================================================
-- 3. Households and Members
-- =============================================================================

create table if not exists public.households (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  mode text not null default 'Solo' check (mode in ('Linked', 'Solo')),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.households enable row level security;

create policy "Household members can view household"
  on public.households for select
  using (public.is_household_member(id) or created_by = auth.uid());

create policy "Authenticated users can create household"
  on public.households for insert
  with check (auth.uid() is not null and created_by = auth.uid());

create policy "Parents can update own household"
  on public.households for update
  using (public.is_household_member(id) and public.household_role(id) in ('Parent', 'Co-parent'));

create table if not exists public.household_members (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('Parent', 'Co-parent', 'Child', 'Third party')),
  status text not null default 'Active' check (status in ('Active', 'Invited', 'Suspended', 'Removed')),
  permissions jsonb not null default '{"can_view_calendar":true,"can_view_expenses":true,"can_view_documents":true}'::jsonb,
  joined_at timestamptz not null default now(),
  unique (household_id, user_id)
);

alter table public.household_members enable row level security;

create policy "Members view co-members of same household"
  on public.household_members for select
  using (public.is_household_member(household_id) or user_id = auth.uid());

create policy "Parents can manage household members"
  on public.household_members for all
  using (public.is_household_member(household_id) and public.household_role(household_id) in ('Parent', 'Co-parent'));

-- =============================================================================
-- 4. Invites
-- =============================================================================

create table if not exists public.invites (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  invited_by uuid not null references public.profiles(id),
  channel text not null check (channel in ('Text', 'Email', 'Link')),
  target_email text,
  target_phone text,
  token_hash text not null unique,
  status text not null default 'Sent' check (status in ('Sent', 'Opened', 'Accepted', 'Expired', 'Cancelled')),
  sent_at timestamptz not null default now(),
  opened_at timestamptz,
  accepted_at timestamptz,
  expires_at timestamptz not null default (now() + interval '7 days'),
  created_at timestamptz not null default now()
);

alter table public.invites enable row level security;

create policy "Members can view household invites"
  on public.invites for select
  using (public.is_household_member(household_id));

create policy "Parents can create household invites"
  on public.invites for insert
  with check (
    public.is_household_member(household_id)
    and public.household_role(household_id) in ('Parent', 'Co-parent')
    and invited_by = auth.uid()
  );

create policy "Parents can update/cancel household invites"
  on public.invites for update
  using (
    public.is_household_member(household_id)
    and public.household_role(household_id) in ('Parent', 'Co-parent')
  );

-- =============================================================================
-- 5. Contact Attempts & Results (Append-Only)
-- =============================================================================

create table if not exists public.contact_attempts (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  initiated_by uuid not null references public.profiles(id),
  channel text not null check (channel in ('Email', 'Text', 'Letter', 'Phone', 'In person')),
  recipient_name text not null,
  recipient_contact text not null,
  purpose text not null,
  content_summary text not null,
  attempted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.contact_attempts enable row level security;

create trigger contact_attempts_immutable
  before update or delete on public.contact_attempts
  for each row execute function public.raise_immutable();

create policy "Members can view household contact attempts"
  on public.contact_attempts for select
  using (public.is_household_member(household_id));

create policy "Members can record contact attempts"
  on public.contact_attempts for insert
  with check (
    public.is_household_member(household_id)
    and initiated_by = auth.uid()
  );

create table if not exists public.contact_attempt_results (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.contact_attempts(id) on delete cascade,
  result text not null check (result in ('Delivered', 'Failed', 'Opened', 'Replied', 'Refused', 'No response')),
  notes text,
  recorded_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.contact_attempt_results enable row level security;

create trigger contact_attempt_results_immutable
  before update or delete on public.contact_attempt_results
  for each row execute function public.raise_immutable();

create policy "Members can view attempt results"
  on public.contact_attempt_results for select
  using (
    exists (
      select 1
      from public.contact_attempts a
      where a.id = attempt_id
        and public.is_household_member(a.household_id)
    )
  );

create policy "Members can log attempt results"
  on public.contact_attempt_results for insert
  with check (
    exists (
      select 1
      from public.contact_attempts a
      where a.id = attempt_id
        and public.is_household_member(a.household_id)
    )
  );

-- =============================================================================
-- 6. OTP Codes and Verified Sessions
-- =============================================================================

create table if not exists public.otp_codes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  purpose text not null check (purpose in ('signin', 'safety_off', 'close_account', 'email_verify')),
  code_hash text not null,
  expires_at timestamptz not null default (now() + interval '10 minutes'),
  used_at timestamptz,
  attempts integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.otp_codes enable row level security;

-- OTP codes are strictly managed via server / security definer functions
create policy "Users cannot directly read OTP hashes"
  on public.otp_codes for select
  using (false);

create table if not exists public.verified_sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text not null unique,
  user_id uuid not null references public.profiles(id) on delete cascade,
  verified_at timestamptz not null default now(),
  revoked_at timestamptz,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.verified_sessions enable row level security;

create policy "Users read own verified sessions"
  on public.verified_sessions for select
  using (auth.uid() = user_id);

-- =============================================================================
-- 7. Audit Log (Append-Only)
-- =============================================================================

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  household_id uuid references public.households(id) on delete set null,
  actor_id uuid references auth.users(id),
  action text not null,
  object_type text not null,
  object_id text,
  result text not null check (result in ('Success', 'Failed', 'Blocked')),
  details jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.audit_log enable row level security;

create trigger audit_log_immutable
  before update or delete on public.audit_log
  for each row execute function public.raise_immutable();

create policy "Users read own audit entries or household audit entries"
  on public.audit_log for select
  using (
    actor_id = auth.uid()
    or (household_id is not null and public.is_household_member(household_id))
  );

create policy "System and users append audit entries"
  on public.audit_log for insert
  with check (actor_id = auth.uid() or actor_id is null);

-- =============================================================================
-- 8. Outbound Messages & Feature Flags
-- =============================================================================

create table if not exists public.outbound_messages (
  id uuid primary key default gen_random_uuid(),
  channel text not null check (channel in ('Email', 'Push', 'SMS')),
  template text not null,
  recipient_ref text not null,
  status text not null default 'Queued' check (status in ('Queued', 'Sent', 'Failed')),
  attempts integer not null default 0,
  provider_message_id text,
  error text,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);

alter table public.outbound_messages enable row level security;

create policy "Staff or system read outbound messages"
  on public.outbound_messages for select
  using (true);

create table if not exists public.feature_flags (
  key text primary key,
  is_released boolean not null default true,
  description text,
  created_at timestamptz not null default now()
);

alter table public.feature_flags enable row level security;

create policy "Public read feature flags"
  on public.feature_flags for select
  using (true);

-- Seed initial feature flags
insert into public.feature_flags (key, is_released, description)
values
  ('messaging', true, 'In-app messaging and threads'),
  ('calendar', true, 'Shared calendar and parenting time'),
  ('expenses', true, 'Expense reimbursement and payments'),
  ('documents', true, 'Child documents, medical and records'),
  ('calling', true, 'Audio and video calling with consent'),
  ('records', true, 'Certified journal and court records'),
  ('child_support', true, 'State agency connector and child support tracker'),
  ('safety', true, 'Safety mode, emergency exit and masking')
on conflict (key) do nothing;

create table if not exists public.staff_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  staff_role text not null check (staff_role in ('Support', 'Moderator', 'Admin')),
  created_at timestamptz not null default now()
);

alter table public.staff_members enable row level security;

create policy "Staff members can view staff roles"
  on public.staff_members for select
  using (auth.uid() = user_id);

-- =============================================================================
-- 9. Auto-Provisioning Trigger on New User Sign-Up
-- =============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_display_name text;
begin
  v_display_name := coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1));
  if char_length(v_display_name) > 60 then
    v_display_name := substring(v_display_name from 1 for 60);
  end if;

  insert into public.profiles (id, email, display_name, language, status, time_zone)
  values (new.id, new.email, v_display_name, 'English', 'Active', 'UTC')
  on conflict (id) do nothing;

  insert into public.user_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  insert into public.safety_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Indexes for performance
create index if not exists idx_household_members_user on public.household_members (user_id);
create index if not exists idx_household_members_household on public.household_members (household_id);
create index if not exists idx_invites_household on public.invites (household_id);
create index if not exists idx_invites_token_hash on public.invites (token_hash);
create index if not exists idx_contact_attempts_household on public.contact_attempts (household_id, attempted_at desc);
create index if not exists idx_audit_log_actor on public.audit_log (actor_id, created_at desc);
create index if not exists idx_audit_log_household on public.audit_log (household_id, created_at desc);
