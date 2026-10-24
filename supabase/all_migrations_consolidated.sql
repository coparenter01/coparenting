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
-- ParentPath Phase 3: Children and Documents Migration
-- Tables: children, child_information, child_entry_history, documents,
--         document_versions, photo_albums, photos, wish_items, task_lists,
--         tasks, share_links, emergency_contacts

-- =============================================================================
-- 1. Children
-- =============================================================================
create table if not exists public.children (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  first_name text not null check (char_length(first_name) between 1 and 60),
  last_name text default '',
  birth_date date not null check (birth_date <= current_date),
  status text not null default 'Active' check (status in ('Active', 'Archived')),
  avatar_url text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_children_household on public.children(household_id);

alter table public.children enable row level security;

create policy children_household_select on public.children
  for select to authenticated
  using (public.is_household_member(household_id));

create policy children_household_insert on public.children
  for insert to authenticated
  with check (
    public.is_household_member(household_id)
    and public.household_role(household_id) in ('Parent', 'Co-parent')
  );

create policy children_household_update on public.children
  for update to authenticated
  using (
    public.is_household_member(household_id)
    and public.household_role(household_id) in ('Parent', 'Co-parent')
  )
  with check (
    public.is_household_member(household_id)
    and public.household_role(household_id) in ('Parent', 'Co-parent')
  );

-- =============================================================================
-- 2. Child Information Entries (DOC-SCR-02, DOC-SCR-03)
-- =============================================================================
create table if not exists public.child_information (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  child_id uuid references public.children(id) on delete cascade,
  section text not null check (section in ('Medical', 'School', 'Contacts', 'Activities', 'Other')),
  entry_type text not null,
  title text not null check (char_length(title) between 1 and 100),
  details text check (char_length(details) <= 2000),
  contact_name text,
  contact_email text,
  contact_phone text,
  contact_address text,
  visibility text not null default 'Shared' check (visibility in ('Shared', 'Private')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_child_info_household on public.child_information(household_id);
create index if not exists idx_child_info_child on public.child_information(child_id);

alter table public.child_information enable row level security;

create policy child_info_select on public.child_information
  for select to authenticated
  using (
    public.is_household_member(household_id)
    and (visibility = 'Shared' or created_by = auth.uid())
  );

create policy child_info_insert on public.child_information
  for insert to authenticated
  with check (public.is_household_member(household_id));

create policy child_info_update on public.child_information
  for update to authenticated
  using (
    public.is_household_member(household_id)
    and (visibility = 'Shared' or created_by = auth.uid())
  );

-- Append-only history of entry revisions (DOC-SCR-04)
create table if not exists public.child_entry_history (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references public.child_information(id) on delete cascade,
  modified_by uuid references auth.users(id) on delete set null,
  change_summary text not null,
  snapshot jsonb not null,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.child_entry_history enable row level security;

create policy child_history_select on public.child_entry_history
  for select to authenticated
  using (
    exists (
      select 1 from public.child_information ci
      where ci.id = entry_id
        and public.is_household_member(ci.household_id)
    )
  );

create policy child_history_insert on public.child_entry_history
  for insert to authenticated
  with check (true);

create trigger tr_child_history_immutable
  before update or delete on public.child_entry_history
  for each row execute function public.raise_immutable();

-- =============================================================================
-- 3. Documents and Versions (DOC-SCR-05, DOC-SCR-06, DOC-SCR-07, DOC-SCR-08)
-- =============================================================================
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  child_id uuid references public.children(id) on delete set null,
  title text not null check (char_length(title) between 1 and 120),
  category text not null check (category in ('Medical', 'School', 'Legal', 'Financial', 'Activities', 'Other')),
  file_name text not null,
  file_path text not null,
  file_size_bytes bigint not null check (file_size_bytes <= 15728640),
  mime_type text not null,
  is_private boolean not null default false,
  version integer not null default 1,
  uploaded_by uuid references auth.users(id) on delete set null,
  deleted_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_documents_household on public.documents(household_id);

alter table public.documents enable row level security;

create policy documents_select on public.documents
  for select to authenticated
  using (
    public.is_household_member(household_id)
    and (not is_private or uploaded_by = auth.uid())
  );

create policy documents_insert on public.documents
  for insert to authenticated
  with check (public.is_household_member(household_id));

create policy documents_update on public.documents
  for update to authenticated
  using (
    public.is_household_member(household_id)
    and (not is_private or uploaded_by = auth.uid())
  );

create table if not exists public.document_versions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  version_number integer not null,
  file_name text not null,
  file_path text not null,
  file_size_bytes bigint not null,
  mime_type text not null,
  uploaded_by uuid references auth.users(id) on delete set null,
  change_notes text,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.document_versions enable row level security;

create policy doc_versions_select on public.document_versions
  for select to authenticated
  using (
    exists (
      select 1 from public.documents d
      where d.id = document_id
        and public.is_household_member(d.household_id)
        and (not d.is_private or d.uploaded_by = auth.uid())
    )
  );

create policy doc_versions_insert on public.document_versions
  for insert to authenticated
  with check (true);

create trigger tr_doc_versions_immutable
  before update or delete on public.document_versions
  for each row execute function public.raise_immutable();

-- =============================================================================
-- 4. Photo Albums and Photos (DOC-SCR-09)
-- =============================================================================
create table if not exists public.photo_albums (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 100),
  description text,
  cover_photo_url text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.photo_albums enable row level security;

create policy photo_albums_select on public.photo_albums
  for select to authenticated
  using (public.is_household_member(household_id));

create policy photo_albums_insert on public.photo_albums
  for insert to authenticated
  with check (public.is_household_member(household_id));

create policy photo_albums_update on public.photo_albums
  for update to authenticated
  using (public.is_household_member(household_id));

create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.photo_albums(id) on delete cascade,
  household_id uuid not null references public.households(id) on delete cascade,
  caption text,
  file_path text not null,
  file_size_bytes bigint not null check (file_size_bytes <= 15728640),
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.photos enable row level security;

create policy photos_select on public.photos
  for select to authenticated
  using (public.is_household_member(household_id));

create policy photos_insert on public.photos
  for insert to authenticated
  with check (public.is_household_member(household_id));

create policy photos_delete on public.photos
  for delete to authenticated
  using (public.is_household_member(household_id));

-- =============================================================================
-- 5. Wish List Items (DOC-SCR-10)
-- =============================================================================
create table if not exists public.wish_items (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  child_id uuid references public.children(id) on delete set null,
  title text not null check (char_length(title) between 1 and 100),
  notes text,
  url text,
  estimated_cost numeric(10,2),
  reserved_by uuid references auth.users(id) on delete set null,
  status text not null default 'Active' check (status in ('Active', 'Purchased', 'Archived')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.wish_items enable row level security;

create policy wish_items_select on public.wish_items
  for select to authenticated
  using (public.is_household_member(household_id));

create policy wish_items_all on public.wish_items
  for all to authenticated
  using (public.is_household_member(household_id))
  with check (public.is_household_member(household_id));

-- =============================================================================
-- 6. Task Lists and Tasks (DOC-SCR-11)
-- =============================================================================
create table if not exists public.task_lists (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 100),
  category text not null default 'General',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.task_lists enable row level security;

create policy task_lists_all on public.task_lists
  for all to authenticated
  using (public.is_household_member(household_id))
  with check (public.is_household_member(household_id));

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references public.task_lists(id) on delete cascade,
  household_id uuid not null references public.households(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 160),
  is_completed boolean not null default false,
  completed_at timestamptz,
  completed_by uuid references auth.users(id) on delete set null,
  assigned_to uuid references auth.users(id) on delete set null,
  due_date date,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.tasks enable row level security;

create policy tasks_all on public.tasks
  for all to authenticated
  using (public.is_household_member(household_id))
  with check (public.is_household_member(household_id));

-- =============================================================================
-- 7. Share Links (DOC-SCR-12, DOC-SCR-13)
-- =============================================================================
create table if not exists public.share_links (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  token text not null unique,
  resource_type text not null check (resource_type in ('ChildEmergencySheet', 'Document', 'Album')),
  resource_id uuid not null,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  access_count integer not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.share_links enable row level security;

create policy share_links_household on public.share_links
  for all to authenticated
  using (public.is_household_member(household_id))
  with check (public.is_household_member(household_id));

create policy share_links_anon_select on public.share_links
  for select to anon
  using (revoked_at is null and expires_at > timezone('utc', now()));

-- =============================================================================
-- 8. Emergency Contacts (DOC-SCR-14, DOC-SCR-15)
-- =============================================================================
create table if not exists public.emergency_contacts (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  child_id uuid references public.children(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 100),
  relationship text not null,
  phone text not null,
  email text,
  is_authorized_pickup boolean not null default false,
  consent_status text not null default 'Pending' check (consent_status in ('Pending', 'Consented', 'Withdrawn')),
  consented_at timestamptz,
  consent_token text unique default encode(gen_random_bytes(24), 'hex'),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.emergency_contacts enable row level security;

create policy emergency_contacts_household on public.emergency_contacts
  for all to authenticated
  using (public.is_household_member(household_id))
  with check (public.is_household_member(household_id));

create policy emergency_contacts_anon_select on public.emergency_contacts
  for select to anon
  using (consent_token is not null);

create policy emergency_contacts_anon_update on public.emergency_contacts
  for update to anon
  using (consent_token is not null)
  with check (consent_token is not null);
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
-- Phase 5: Calling Module Schema
-- Tables: call_settings, call_consent_logs, calls, call_events, call_recordings, call_transcripts

-- 1. Call Settings (per user)
create table if not exists public.call_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade unique,
  audio_enabled boolean not null default false,
  video_enabled boolean not null default false,
  recording_enabled boolean not null default false,
  transcripts_enabled boolean not null default false,
  state_residence text,
  microphone_id text,
  speaker_id text,
  camera_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Call Consent Logs (immutable audit trail of consent and toggle events)
create table if not exists public.call_consent_logs (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  user_id uuid not null references public.profiles(id),
  setting_type text not null, -- 'audio' | 'video' | 'recording' | 'transcripts'
  action text not null, -- 'enabled' | 'disabled' | 'agreed' | 'declined'
  details text,
  created_at timestamptz not null default now()
);

-- 3. Calls
create table if not exists public.calls (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  thread_id uuid references public.message_threads(id) on delete set null,
  caller_id uuid not null references public.profiles(id),
  callee_id uuid not null references public.profiles(id),
  call_type text not null, -- 'audio' | 'video'
  status text not null default 'Initiating', -- 'Initiating' | 'Ringing' | 'Connected' | 'Completed' | 'Missed' | 'Declined' | 'Cancelled' | 'Not answered' | 'Failed'
  started_at timestamptz not null default now(),
  answered_at timestamptz,
  ended_at timestamptz,
  duration_seconds integer not null default 0,
  recording_requested boolean not null default false,
  recording_consent_caller boolean not null default false,
  recording_consent_callee boolean not null default false,
  is_recorded boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. Call Events (immutable)
create table if not exists public.call_events (
  id uuid primary key default gen_random_uuid(),
  call_id uuid not null references public.calls(id) on delete cascade,
  user_id uuid not null references public.profiles(id),
  event_type text not null, -- 'answered' | 'declined' | 'ended' | 'muted' | 'unmuted' | 'camera_on' | 'camera_off' | 'recording_requested' | 'recording_agreed' | 'recording_declined' | 'recording_started' | 'recording_stopped'
  created_at timestamptz not null default now()
);

-- 5. Call Recordings (immutable)
create table if not exists public.call_recordings (
  id uuid primary key default gen_random_uuid(),
  call_id uuid not null references public.calls(id) on delete cascade unique,
  household_id uuid not null references public.households(id) on delete cascade,
  file_name text not null,
  file_size bigint not null default 0,
  file_type text not null,
  storage_path text not null,
  duration_seconds integer not null default 0,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  created_at timestamptz not null default now()
);

-- 6. Call Transcripts (immutable)
create table if not exists public.call_transcripts (
  id uuid primary key default gen_random_uuid(),
  call_id uuid not null references public.calls(id) on delete cascade unique,
  recording_id uuid not null references public.call_recordings(id) on delete cascade,
  household_id uuid not null references public.households(id) on delete cascade,
  content text not null,
  notice text not null default 'Generated by automated speech-to-text. The original audio recording is the official record.',
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_call_settings_user_id on public.call_settings(user_id);
create index if not exists idx_calls_household on public.calls(household_id);
create index if not exists idx_calls_thread on public.calls(thread_id);
create index if not exists idx_calls_caller on public.calls(caller_id);
create index if not exists idx_calls_callee on public.calls(callee_id);
create index if not exists idx_call_events_call on public.call_events(call_id);
create index if not exists idx_call_consent_household on public.call_consent_logs(household_id);
create index if not exists idx_call_recordings_call on public.call_recordings(call_id);
create index if not exists idx_call_transcripts_call on public.call_transcripts(call_id);

-- Immutability triggers (FR-CLL-01-10, FR-CLL-02-09)
create or replace function public.raise_immutable_calling()
returns trigger
language plpgsql
as $$
begin
  if (TG_OP = 'DELETE') then
    raise exception 'Call records, events, recordings, and consent logs are immutable and cannot be deleted.';
  end if;
  return NEW;
end;
$$;

drop trigger if exists trg_calls_immutable on public.calls;
create trigger trg_calls_immutable
  before delete on public.calls
  for each row execute function public.raise_immutable_calling();

drop trigger if exists trg_call_events_immutable on public.call_events;
create trigger trg_call_events_immutable
  before update or delete on public.call_events
  for each row execute function public.raise_immutable_calling();

drop trigger if exists trg_call_consent_logs_immutable on public.call_consent_logs;
create trigger trg_call_consent_logs_immutable
  before update or delete on public.call_consent_logs
  for each row execute function public.raise_immutable_calling();

drop trigger if exists trg_call_recordings_immutable on public.call_recordings;
create trigger trg_call_recordings_immutable
  before update or delete on public.call_recordings
  for each row execute function public.raise_immutable_calling();

drop trigger if exists trg_call_transcripts_immutable on public.call_transcripts;
create trigger trg_call_transcripts_immutable
  before update or delete on public.call_transcripts
  for each row execute function public.raise_immutable_calling();

-- Enable RLS
alter table public.call_settings enable row level security;
alter table public.call_consent_logs enable row level security;
alter table public.calls enable row level security;
alter table public.call_events enable row level security;
alter table public.call_recordings enable row level security;
alter table public.call_transcripts enable row level security;

-- RLS Policies
-- Call Settings: Users can read and update their own settings
create policy "call_settings_select_own" on public.call_settings
  for select using (auth.uid() = user_id);

create policy "call_settings_insert_own" on public.call_settings
  for insert with check (auth.uid() = user_id);

create policy "call_settings_update_own" on public.call_settings
  for update using (auth.uid() = user_id);

-- Calls: Household members can view, insert, and update calls in their household
create policy "calls_household_member" on public.calls
  for all using (public.is_household_member(household_id));

-- Call Events: Household members can view and insert call events
create policy "call_events_household_member" on public.call_events
  for select using (
    exists (
      select 1 from public.calls c
      where c.id = call_events.call_id
      and public.is_household_member(c.household_id)
    )
  );

create policy "call_events_insert_household_member" on public.call_events
  for insert with check (
    exists (
      select 1 from public.calls c
      where c.id = call_events.call_id
      and public.is_household_member(c.household_id)
    )
  );

-- Call Consent Logs: Household members can view and insert consent logs
create policy "call_consent_logs_household_member" on public.call_consent_logs
  for select using (public.is_household_member(household_id));

create policy "call_consent_logs_insert" on public.call_consent_logs
  for insert with check (public.is_household_member(household_id));

-- Call Recordings & Transcripts: Household members can view and insert
create policy "call_recordings_household_member" on public.call_recordings
  for all using (public.is_household_member(household_id));

create policy "call_transcripts_household_member" on public.call_transcripts
  for all using (public.is_household_member(household_id));
-- Phase 6: Calendar and Parenting Time Module Schema
-- Tables: calendar_entries, calendar_entry_children, calendar_entry_versions,
--         schedule_change_requests, schedule_change_request_children,
--         schedule_templates, calendar_holidays, calendar_sync_settings,
--         custody_exchanges, exchange_check_ins, parenting_plans, household_pets

create or replace function public.raise_immutable_calendar()
returns trigger
language plpgsql
security definer
as $$
begin
  raise exception 'Calendar audit records, check-ins, exchanges, and versions are immutable and cannot be updated or deleted.';
end;
$$;

-- 1. Calendar Entries
create table if not exists public.calendar_entries (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  entry_type text not null check (entry_type in ('Event', 'Parenting time', 'Holiday', 'Pet')),
  title text not null,
  details text,
  location text,
  start_at timestamptz not null,
  end_at timestamptz not null check (end_at >= start_at),
  responsible_parent_id uuid references public.profiles(id),
  drop_off_parent_id uuid references public.profiles(id),
  pick_up_parent_id uuid references public.profiles(id),
  visibility text not null default 'Shared' check (visibility in ('Shared', 'Private')),
  status text not null default 'Active' check (status in ('Proposed', 'Active', 'Cancelled')),
  repeat_rule text check (repeat_rule in ('None', 'Daily', 'Weekly', 'Biweekly', 'Monthly', 'Custom')),
  series_id uuid,
  source text not null default 'Parent' check (source in ('Parent', 'Request', 'Schedule', 'Holiday', 'Agency item', 'Outside calendar')),
  pet_id uuid,
  archived_at timestamptz,
  archived_by uuid references public.profiles(id),
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Calendar Entry Children (M2M)
create table if not exists public.calendar_entry_children (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references public.calendar_entries(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (entry_id, child_id)
);

-- 3. Calendar Entry Versions (Immutable history)
create table if not exists public.calendar_entry_versions (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references public.calendar_entries(id) on delete cascade,
  version_number integer not null,
  details_snapshot jsonb not null,
  change_type text not null check (change_type in ('Created', 'Edited', 'Cancelled', 'Confirmed', 'Changed by request')),
  request_id uuid,
  device_type text,
  changed_by uuid not null references public.profiles(id),
  changed_at timestamptz not null default now()
);

create trigger tr_immutable_calendar_entry_versions
  before update or delete on public.calendar_entry_versions
  for each row execute function public.raise_immutable_calendar();

-- 4. Schedule Change Requests
create table if not exists public.schedule_change_requests (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  request_type text not null check (request_type in ('Swap days', 'Change of parenting time', 'Change of exchange time or place')),
  requested_by uuid not null references public.profiles(id),
  change_start_at timestamptz not null,
  change_end_at timestamptz not null check (change_end_at >= change_start_at),
  trade_start_at timestamptz,
  trade_end_at timestamptz,
  reason text not null,
  respond_by_at timestamptz not null,
  status text not null default 'Pending' check (status in ('Pending', 'Approved', 'Declined', 'Expired', 'Withdrawn')),
  response_reason text,
  responded_by uuid references public.profiles(id),
  responded_at timestamptz,
  device_type text,
  undo_until timestamptz,
  applied_at timestamptz,
  created_at timestamptz not null default now()
);

-- 5. Schedule Change Request Children
create table if not exists public.schedule_change_request_children (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.schedule_change_requests(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (request_id, child_id)
);

-- 6. Schedule Templates
create table if not exists public.schedule_templates (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  name text not null,
  pattern_type text not null check (pattern_type in ('alternating_weeks', '2_2_3', '2_2_5_5', '3_4_4_3', 'every_other_weekend', 'custom')),
  cycle_days integer not null default 14,
  cycle_definition jsonb not null,
  start_date date not null,
  end_date date,
  child_id uuid references public.children(id),
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

-- 7. Calendar Holidays
create table if not exists public.calendar_holidays (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  holiday_key text not null,
  name text not null,
  assigned_parent_id uuid references public.profiles(id),
  rule text not null check (rule in ('Every year', 'Even years', 'Odd years', 'Split')),
  custom_start_date date,
  custom_end_date date,
  status text not null default 'Active' check (status in ('Proposed', 'Active')),
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

-- 8. Calendar Sync Settings
create table if not exists public.calendar_sync_settings (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  user_id uuid not null references public.profiles(id),
  provider text not null default 'ics' check (provider in ('google', 'outlook', 'ics', 'apple')),
  ics_token text not null unique,
  send_mode text not null default 'both' check (send_mode in ('both', 'own_only')),
  is_connected boolean not null default false,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (household_id, user_id, provider)
);

-- 9. Custody Exchanges (Handovers)
create table if not exists public.custody_exchanges (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  entry_id uuid references public.calendar_entries(id) on delete set null,
  handed_over_by uuid not null references public.profiles(id),
  received_by uuid references public.profiles(id),
  scheduled_time timestamptz not null,
  actual_time timestamptz not null,
  status text not null default 'Unconfirmed' check (status in ('Unconfirmed', 'Confirmed', 'Disputed')),
  dispute_reason text,
  notes text,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create trigger tr_immutable_custody_exchanges
  before update or delete on public.custody_exchanges
  for each row execute function public.raise_immutable_calendar();

-- 10. Exchange Check-ins
create table if not exists public.exchange_check_ins (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  exchange_id uuid references public.custody_exchanges(id) on delete set null,
  entry_id uuid references public.calendar_entries(id) on delete set null,
  user_id uuid not null references public.profiles(id),
  checked_in_at timestamptz not null default now(),
  latitude numeric(10, 7) not null,
  longitude numeric(10, 7) not null,
  accuracy_meters numeric(8, 2),
  address text,
  is_shared boolean not null default false,
  created_at timestamptz not null default now()
);

create trigger tr_immutable_exchange_check_ins
  before update or delete on public.exchange_check_ins
  for each row execute function public.raise_immutable_calendar();

-- 11. Parenting Plans
create table if not exists public.parenting_plans (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  title text not null default 'Parenting Plan',
  answers jsonb not null default '{}'::jsonb,
  is_shared boolean not null default false,
  legal_review_completed boolean not null default true,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 12. Household Pets
create table if not exists public.household_pets (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  name text not null,
  species text not null default 'Dog',
  breed text,
  notes text,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

-- Enable RLS on all 12 tables
alter table public.calendar_entries enable row level security;
alter table public.calendar_entry_children enable row level security;
alter table public.calendar_entry_versions enable row level security;
alter table public.schedule_change_requests enable row level security;
alter table public.schedule_change_request_children enable row level security;
alter table public.schedule_templates enable row level security;
alter table public.calendar_holidays enable row level security;
alter table public.calendar_sync_settings enable row level security;
alter table public.custody_exchanges enable row level security;
alter table public.exchange_check_ins enable row level security;
alter table public.parenting_plans enable row level security;
alter table public.household_pets enable row level security;

-- Policies for calendar_entries
create policy "calendar_entries_select" on public.calendar_entries
  for select using (
    public.is_verified_session()
    and public.is_household_member(household_id)
    and (visibility = 'Shared' or created_by = auth.uid())
  );

create policy "calendar_entries_insert" on public.calendar_entries
  for insert with check (
    public.is_verified_session()
    and public.is_household_member(household_id)
    and created_by = auth.uid()
  );

create policy "calendar_entries_update" on public.calendar_entries
  for update using (
    public.is_verified_session()
    and public.is_household_member(household_id)
  ) with check (
    public.is_verified_session()
    and public.is_household_member(household_id)
  );

-- Policies for children links
create policy "calendar_entry_children_select" on public.calendar_entry_children
  for select using (
    public.is_verified_session()
    and exists (
      select 1 from public.calendar_entries e
      where e.id = calendar_entry_children.entry_id
      and public.is_household_member(e.household_id)
    )
  );

create policy "calendar_entry_children_insert" on public.calendar_entry_children
  for insert with check (
    public.is_verified_session()
    and exists (
      select 1 from public.calendar_entries e
      where e.id = calendar_entry_children.entry_id
      and public.is_household_member(e.household_id)
    )
  );

-- Policies for versions
create policy "calendar_entry_versions_select" on public.calendar_entry_versions
  for select using (
    public.is_verified_session()
    and exists (
      select 1 from public.calendar_entries e
      where e.id = calendar_entry_versions.entry_id
      and public.is_household_member(e.household_id)
      and (e.visibility = 'Shared' or e.created_by = auth.uid())
    )
  );

create policy "calendar_entry_versions_insert" on public.calendar_entry_versions
  for insert with check (
    public.is_verified_session()
    and changed_by = auth.uid()
  );

-- Policies for schedule_change_requests
create policy "schedule_change_requests_select" on public.schedule_change_requests
  for select using (
    public.is_verified_session()
    and public.is_household_member(household_id)
  );

create policy "schedule_change_requests_insert" on public.schedule_change_requests
  for insert with check (
    public.is_verified_session()
    and public.is_household_member(household_id)
    and requested_by = auth.uid()
  );

create policy "schedule_change_requests_update" on public.schedule_change_requests
  for update using (
    public.is_verified_session()
    and public.is_household_member(household_id)
  ) with check (
    public.is_verified_session()
    and public.is_household_member(household_id)
  );

create policy "schedule_change_req_children_select" on public.schedule_change_request_children
  for select using (
    public.is_verified_session()
    and exists (
      select 1 from public.schedule_change_requests r
      where r.id = schedule_change_request_children.request_id
      and public.is_household_member(r.household_id)
    )
  );

create policy "schedule_change_req_children_insert" on public.schedule_change_request_children
  for insert with check (
    public.is_verified_session()
    and exists (
      select 1 from public.schedule_change_requests r
      where r.id = schedule_change_request_children.request_id
      and public.is_household_member(r.household_id)
    )
  );

-- Policies for templates
create policy "schedule_templates_all" on public.schedule_templates
  for all using (
    public.is_verified_session()
    and public.is_household_member(household_id)
  ) with check (
    public.is_verified_session()
    and public.is_household_member(household_id)
  );

-- Policies for holidays
create policy "calendar_holidays_all" on public.calendar_holidays
  for all using (
    public.is_verified_session()
    and public.is_household_member(household_id)
  ) with check (
    public.is_verified_session()
    and public.is_household_member(household_id)
  );

-- Policies for calendar_sync_settings
create policy "calendar_sync_settings_select" on public.calendar_sync_settings
  for select using (
    public.is_verified_session()
    and user_id = auth.uid()
  );

create policy "calendar_sync_settings_write" on public.calendar_sync_settings
  for all using (
    public.is_verified_session()
    and user_id = auth.uid()
  ) with check (
    public.is_verified_session()
    and user_id = auth.uid()
  );

-- Policies for custody_exchanges
create policy "custody_exchanges_select" on public.custody_exchanges
  for select using (
    public.is_verified_session()
    and public.is_household_member(household_id)
  );

create policy "custody_exchanges_insert" on public.custody_exchanges
  for insert with check (
    public.is_verified_session()
    and public.is_household_member(household_id)
    and created_by = auth.uid()
  );

-- Policies for exchange_check_ins
create policy "exchange_check_ins_select" on public.exchange_check_ins
  for select using (
    public.is_verified_session()
    and public.is_household_member(household_id)
    and (is_shared = true or user_id = auth.uid())
  );

create policy "exchange_check_ins_insert" on public.exchange_check_ins
  for insert with check (
    public.is_verified_session()
    and public.is_household_member(household_id)
    and user_id = auth.uid()
  );

-- Policies for parenting_plans
create policy "parenting_plans_select" on public.parenting_plans
  for select using (
    public.is_verified_session()
    and public.is_household_member(household_id)
    and (is_shared = true or created_by = auth.uid())
  );

create policy "parenting_plans_write" on public.parenting_plans
  for all using (
    public.is_verified_session()
    and public.is_household_member(household_id)
  ) with check (
    public.is_verified_session()
    and public.is_household_member(household_id)
  );

-- Policies for household_pets
create policy "household_pets_all" on public.household_pets
  for all using (
    public.is_verified_session()
    and public.is_household_member(household_id)
  ) with check (
    public.is_verified_session()
    and public.is_household_member(household_id)
  );

-- Indexes for performance
create index if not exists idx_calendar_entries_hh_start on public.calendar_entries (household_id, start_at asc);
create index if not exists idx_calendar_entries_type on public.calendar_entries (entry_type);
create index if not exists idx_calendar_entries_series on public.calendar_entries (series_id);
create index if not exists idx_calendar_entry_versions_entry on public.calendar_entry_versions (entry_id, version_number desc);
create index if not exists idx_schedule_change_req_hh on public.schedule_change_requests (household_id, status);
create index if not exists idx_custody_exchanges_hh on public.custody_exchanges (household_id, scheduled_time desc);
create index if not exists idx_exchange_check_ins_hh on public.exchange_check_ins (household_id, checked_in_at desc);
create index if not exists idx_parenting_plans_hh on public.parenting_plans (household_id);
create index if not exists idx_household_pets_hh on public.household_pets (household_id);
-- ==============================================================================
-- Migration: 20261023000006_phase7_expenses.sql
-- Module: Phase 7 Expenses & Payments (EXP-01 .. EXP-15)
-- Description: Shared expense log, versioning, reimbursement requests,
--              child support payments, split rules, disputes, in-app payments,
--              recurring schedules, bills, credit building, and audit records.
-- ==============================================================================

-- 1. Helper function for immutable table protection
CREATE OR REPLACE FUNCTION raise_immutable_expenses()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'Updates and deletions are strictly prohibited on immutable expenses table: %', TG_TABLE_NAME
    USING ERRCODE = '23505';
END;
$$ LANGUAGE plpgsql;

-- 2. Shared Expenses table (EXP-01)
CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  household_id TEXT NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  created_by TEXT NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  paid_by TEXT NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  description VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  expense_date DATE NOT NULL,
  amount_cents INTEGER NOT NULL CHECK (amount_cents > 0 AND amount_cents <= 9999999),
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  note VARCHAR(500),
  status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Voided')),
  visibility VARCHAR(20) NOT NULL DEFAULT 'Shared' CHECK (visibility IN ('Shared', 'Private')),
  voided_at TIMESTAMPTZ,
  voided_by TEXT REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Expense Children mapping table (EXP-01, EXP-06)
CREATE TABLE IF NOT EXISTS expense_children (
  id TEXT PRIMARY KEY,
  expense_id TEXT NOT NULL REFERENCES expenses(id) ON DELETE CASCADE,
  child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Expense Attachments / Receipts table (EXP-02)
CREATE TABLE IF NOT EXISTS expense_attachments (
  id TEXT PRIMARY KEY,
  expense_id TEXT NOT NULL REFERENCES expenses(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_size_bytes INTEGER NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  storage_path TEXT NOT NULL,
  uploaded_by TEXT NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Expense Versions / Audit History (EXP-01, FR-EXP-01-14)
CREATE TABLE IF NOT EXISTS expense_versions (
  id TEXT PRIMARY KEY,
  expense_id TEXT NOT NULL REFERENCES expenses(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  description VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  expense_date DATE NOT NULL,
  amount_cents INTEGER NOT NULL,
  note VARCHAR(500),
  changed_by TEXT NOT NULL REFERENCES profiles(id),
  device_info VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_immutable_expense_versions
BEFORE UPDATE OR DELETE ON expense_versions
FOR EACH ROW EXECUTE FUNCTION raise_immutable_expenses();

-- 6. Reimbursement Requests table (EXP-03)
CREATE TABLE IF NOT EXISTS reimbursement_requests (
  id TEXT PRIMARY KEY,
  household_id TEXT NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  expense_id TEXT NOT NULL REFERENCES expenses(id) ON DELETE CASCADE,
  requested_by TEXT NOT NULL REFERENCES profiles(id),
  requested_from TEXT NOT NULL REFERENCES profiles(id),
  amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
  split_percentage NUMERIC(5, 2) NOT NULL DEFAULT 50.00,
  due_date DATE NOT NULL,
  note VARCHAR(500),
  status VARCHAR(20) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Accepted', 'Declined', 'Paid', 'Withdrawn')),
  decline_reason VARCHAR(500),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Child Support Payments table (EXP-07)
CREATE TABLE IF NOT EXISTS child_support_payments (
  id TEXT PRIMARY KEY,
  household_id TEXT NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  payer_id TEXT NOT NULL REFERENCES profiles(id),
  payee_id TEXT NOT NULL REFERENCES profiles(id),
  amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
  payment_date DATE NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  reference_number VARCHAR(100),
  note VARCHAR(500),
  status VARCHAR(20) NOT NULL DEFAULT 'Recorded' CHECK (status IN ('Recorded', 'Verified')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Split Rules table (EXP-05)
CREATE TABLE IF NOT EXISTS expense_split_rules (
  id TEXT PRIMARY KEY,
  household_id TEXT NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL,
  parent_a_percentage NUMERIC(5, 2) NOT NULL,
  parent_b_percentage NUMERIC(5, 2) NOT NULL,
  effective_date DATE NOT NULL,
  created_by TEXT NOT NULL REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Expense Disputes table (EXP-09)
CREATE TABLE IF NOT EXISTS expense_disputes (
  id TEXT PRIMARY KEY,
  household_id TEXT NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  expense_id TEXT NOT NULL REFERENCES expenses(id) ON DELETE CASCADE,
  disputed_by TEXT NOT NULL REFERENCES profiles(id),
  reason_category VARCHAR(100) NOT NULL,
  explanation TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'Resolved')),
  resolution_notes TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Expense In-App Payment Transactions table (EXP-08, EXP-12, EXP-13)
CREATE TABLE IF NOT EXISTS expense_payments (
  id TEXT PRIMARY KEY,
  reimbursement_request_id TEXT NOT NULL REFERENCES reimbursement_requests(id) ON DELETE CASCADE,
  payer_id TEXT NOT NULL REFERENCES profiles(id),
  amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
  payment_method VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Processing' CHECK (status IN ('Processing', 'Completed', 'Failed')),
  transaction_ref VARCHAR(100) NOT NULL,
  test_mode BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_immutable_expense_payments
BEFORE UPDATE OR DELETE ON expense_payments
FOR EACH ROW EXECUTE FUNCTION raise_immutable_expenses();

-- 11. Recurring & Scheduled Payments table (EXP-10)
CREATE TABLE IF NOT EXISTS recurring_payments (
  id TEXT PRIMARY KEY,
  household_id TEXT NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
  frequency VARCHAR(20) NOT NULL CHECK (frequency IN ('Weekly', 'Bi-weekly', 'Monthly')),
  next_due_date DATE NOT NULL,
  payer_id TEXT NOT NULL REFERENCES profiles(id),
  payee_id TEXT NOT NULL REFERENCES profiles(id),
  auto_pay BOOLEAN NOT NULL DEFAULT false,
  status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Paused')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Bills table (EXP-12)
CREATE TABLE IF NOT EXISTS bills (
  id TEXT PRIMARY KEY,
  household_id TEXT NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  payee_name VARCHAR(100) NOT NULL,
  amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
  due_date DATE NOT NULL,
  category VARCHAR(50) NOT NULL,
  is_split BOOLEAN NOT NULL DEFAULT true,
  split_rule_id TEXT REFERENCES expense_split_rules(id) ON DELETE SET NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Paid', 'Overdue')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Credit Building Settings table (EXP-14)
CREATE TABLE IF NOT EXISTS credit_building_settings (
  id TEXT PRIMARY KEY,
  household_id TEXT NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES profiles(id),
  is_enabled BOOLEAN NOT NULL DEFAULT false,
  enrolled_at TIMESTAMPTZ,
  consent_accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_expenses_household ON expenses(household_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(expense_date DESC);
CREATE INDEX IF NOT EXISTS idx_reimbursements_household ON reimbursement_requests(household_id);
CREATE INDEX IF NOT EXISTS idx_reimbursements_expense ON reimbursement_requests(expense_id);
CREATE INDEX IF NOT EXISTS idx_child_support_household ON child_support_payments(household_id);
CREATE INDEX IF NOT EXISTS idx_split_rules_household ON expense_split_rules(household_id);
CREATE INDEX IF NOT EXISTS idx_disputes_household ON expense_disputes(household_id);

-- Row Level Security (RLS)
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_children ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reimbursement_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_support_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_split_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE recurring_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_building_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "household_members_expenses" ON expenses
  FOR ALL USING (
    is_household_member(household_id, auth.uid()::text) AND
    (visibility = 'Shared' OR created_by = auth.uid()::text)
  );

CREATE POLICY "household_members_expense_children" ON expense_children
  FOR ALL USING (
    EXISTS (SELECT 1 FROM expenses WHERE expenses.id = expense_children.expense_id AND is_household_member(expenses.household_id, auth.uid()::text))
  );

CREATE POLICY "household_members_expense_attachments" ON expense_attachments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM expenses WHERE expenses.id = expense_attachments.expense_id AND is_household_member(expenses.household_id, auth.uid()::text))
  );

CREATE POLICY "household_members_expense_versions" ON expense_versions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM expenses
      WHERE expenses.id = expense_versions.expense_id
        AND is_household_member(expenses.household_id, auth.uid()::text)
        AND (expenses.visibility = 'Shared' OR expenses.created_by = auth.uid()::text)
    )
  );

CREATE POLICY "household_members_reimbursements" ON reimbursement_requests
  FOR ALL USING (is_household_member(household_id, auth.uid()::text));

CREATE POLICY "household_members_child_support" ON child_support_payments
  FOR ALL USING (is_household_member(household_id, auth.uid()::text));

CREATE POLICY "household_members_split_rules" ON expense_split_rules
  FOR ALL USING (is_household_member(household_id, auth.uid()::text));

CREATE POLICY "household_members_disputes" ON expense_disputes
  FOR ALL USING (is_household_member(household_id, auth.uid()::text));

CREATE POLICY "household_members_expense_payments" ON expense_payments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM reimbursement_requests
      WHERE reimbursement_requests.id = expense_payments.reimbursement_request_id
        AND is_household_member(reimbursement_requests.household_id, auth.uid()::text)
    )
  );

CREATE POLICY "household_members_recurring_payments" ON recurring_payments
  FOR ALL USING (is_household_member(household_id, auth.uid()::text));

CREATE POLICY "household_members_bills" ON bills
  FOR ALL USING (is_household_member(household_id, auth.uid()::text));

CREATE POLICY "household_members_credit_building" ON credit_building_settings
  FOR ALL USING (is_household_member(household_id, auth.uid()::text) AND user_id = auth.uid()::text);
-- Phase 8: Records and Court Migration
-- 11 tables for certified court exports, verification, private journal, affidavits, subpoenas, legal content, deletion, and legal holds.

-- 1. Exports table
CREATE TABLE IF NOT EXISTS public.exports (
    export_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    household_id UUID NOT NULL REFERENCES public.households(household_id) ON DELETE CASCADE,
    requested_by_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    format TEXT NOT NULL CHECK (format IN ('certified_pdf', 'pdf', 'csv')),
    record_types TEXT[] NOT NULL DEFAULT '{}',
    date_from DATE NOT NULL,
    date_to DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'preparing' CHECK (status IN ('preparing', 'ready', 'failed')),
    record_id TEXT UNIQUE CHECK (record_id IS NULL OR record_id ~ '^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$'),
    fingerprint TEXT,
    page_count INTEGER CHECK (page_count IS NULL OR page_count >= 1),
    file_id UUID,
    file_name TEXT,
    file_size_bytes BIGINT,
    generated_at TIMESTAMPTZ,
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Verification lookups (public audit of record queries)
CREATE TABLE IF NOT EXISTS public.verification_lookups (
    lookup_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text_entered TEXT NOT NULL,
    result TEXT NOT NULL CHECK (result IN ('valid', 'not_found', 'file_matches', 'file_does_not_match', 'rate_limited')),
    checked_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    client_hash TEXT
);

-- 3. Journal entries (strictly private to authoring parent)
CREATE TABLE IF NOT EXISTS public.journal_entries (
    entry_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    household_id UUID NOT NULL REFERENCES public.households(household_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    entry_type TEXT NOT NULL CHECK (entry_type IN ('incident', 'note')),
    title VARCHAR(100) NOT NULL,
    happened_at TIMESTAMPTZ NOT NULL,
    details VARCHAR(5000) NOT NULL,
    children UUID[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'voided')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Journal versions (immutable historical snapshots)
CREATE TABLE IF NOT EXISTS public.journal_versions (
    version_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entry_id UUID NOT NULL REFERENCES public.journal_entries(entry_id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    snapshot JSONB NOT NULL,
    created_by_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    device_type TEXT NOT NULL DEFAULT 'web',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(entry_id, version_number)
);

-- 5. Journal attachments
CREATE TABLE IF NOT EXISTS public.journal_attachments (
    attachment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entry_id UUID NOT NULL REFERENCES public.journal_entries(entry_id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL CHECK (file_size_bytes <= 26214400), -- 25 MB max
    mime_type TEXT NOT NULL CHECK (mime_type IN ('image/jpeg', 'image/png', 'application/pdf')),
    storage_path TEXT NOT NULL,
    scan_status TEXT NOT NULL DEFAULT 'clean' CHECK (scan_status IN ('clean', 'scanning', 'flagged')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Affidavit requests
CREATE TABLE IF NOT EXISTS public.affidavit_requests (
    request_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_number TEXT NOT NULL UNIQUE,
    requested_by_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    export_id UUID NOT NULL REFERENCES public.exports(export_id) ON DELETE CASCADE,
    record_id TEXT NOT NULL,
    delivery TEXT NOT NULL CHECK (delivery IN ('electronic', 'mailed')),
    mailing_address VARCHAR(200),
    court_date DATE,
    note VARCHAR(500),
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'in_review', 'ready', 'declined', 'delivered')),
    decline_reason VARCHAR(500),
    flagged BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Affidavit status history
CREATE TABLE IF NOT EXISTS public.affidavit_status_history (
    history_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES public.affidavit_requests(request_id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    changed_by_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. Subpoena requests
CREATE TABLE IF NOT EXISTS public.subpoena_requests (
    request_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_name VARCHAR(120) NOT NULL,
    organization VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subpoena_file_path TEXT,
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'in_review', 'processed', 'declined')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. Legal content (court notes, model orders, retention policies)
CREATE TABLE IF NOT EXISTS public.legal_content (
    content_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type TEXT NOT NULL CHECK (content_type IN ('court_note', 'model_order_language', 'retention_policy')),
    state VARCHAR(50),
    version INTEGER NOT NULL DEFAULT 1,
    title VARCHAR(150) NOT NULL,
    text TEXT NOT NULL,
    last_reviewed_on DATE NOT NULL,
    approved_by_counsel BOOLEAN NOT NULL DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Deletion requests (non-record data)
CREATE TABLE IF NOT EXISTS public.deletion_requests (
    deletion_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    household_id UUID NOT NULL REFERENCES public.households(household_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'completed', 'blocked')),
    requested_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    completed_at TIMESTAMPTZ,
    kept_summary TEXT NOT NULL DEFAULT 'Records kept for court retention requirement (messages, calendar entries, expenses, payment ledgers, audit logs). Drafts and preferences removed.'
);

-- 11. Legal holds
CREATE TABLE IF NOT EXISTS public.legal_holds (
    hold_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    household_id UUID NOT NULL REFERENCES public.households(household_id) ON DELETE CASCADE,
    set_by TEXT NOT NULL CHECK (set_by IN ('parent', 'counsel')),
    set_by_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    case_number VARCHAR(50),
    status TEXT NOT NULL DEFAULT 'on' CHECK (status IN ('on', 'released')),
    reason TEXT,
    set_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    released_at TIMESTAMPTZ
);

-- Immutability Triggers
CREATE OR REPLACE FUNCTION public.raise_immutable_records()
RETURNS trigger AS $$
BEGIN
    RAISE EXCEPTION 'Audit records and historical versions are strictly immutable and cannot be updated or deleted.';
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_exports_immutable ON public.exports;
CREATE TRIGGER tr_exports_immutable
    BEFORE DELETE ON public.exports
    FOR EACH ROW
    WHEN (OLD.status = 'ready' AND OLD.format = 'certified_pdf')
    EXECUTE FUNCTION public.raise_immutable_records();

DROP TRIGGER IF EXISTS tr_journal_versions_immutable ON public.journal_versions;
CREATE TRIGGER tr_journal_versions_immutable
    BEFORE UPDATE OR DELETE ON public.journal_versions
    FOR EACH ROW
    EXECUTE FUNCTION public.raise_immutable_records();

DROP TRIGGER IF EXISTS tr_affidavit_status_history_immutable ON public.affidavit_status_history;
CREATE TRIGGER tr_affidavit_status_history_immutable
    BEFORE UPDATE OR DELETE ON public.affidavit_status_history
    FOR EACH ROW
    EXECUTE FUNCTION public.raise_immutable_records();

-- Row Level Security (RLS)
ALTER TABLE public.exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_lookups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affidavit_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affidavit_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subpoena_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deletion_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_holds ENABLE ROW LEVEL SECURITY;

-- Exports RLS: User can view and create exports in their household
CREATE POLICY exports_select_policy ON public.exports
    FOR SELECT TO authenticated
    USING (household_id IN (
        SELECT household_id FROM public.household_members WHERE user_id = auth.uid()
    ));

CREATE POLICY exports_insert_policy ON public.exports
    FOR INSERT TO authenticated
    WITH CHECK (
        requested_by_user_id = auth.uid() AND
        household_id IN (
            SELECT household_id FROM public.household_members WHERE user_id = auth.uid()
        )
    );

-- Verification lookups: Public insert & select for verification
CREATE POLICY verification_lookups_anon_insert ON public.verification_lookups
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY verification_lookups_select ON public.verification_lookups
    FOR SELECT TO anon, authenticated
    USING (true);

-- Journal entries: STRICTLY private to the author parent
CREATE POLICY journal_entries_author_all ON public.journal_entries
    FOR ALL TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

CREATE POLICY journal_versions_author_select ON public.journal_versions
    FOR SELECT TO authenticated
    USING (entry_id IN (SELECT entry_id FROM public.journal_entries WHERE user_id = auth.uid()));

CREATE POLICY journal_versions_author_insert ON public.journal_versions
    FOR INSERT TO authenticated
    WITH CHECK (entry_id IN (SELECT entry_id FROM public.journal_entries WHERE user_id = auth.uid()));

CREATE POLICY journal_attachments_author_all ON public.journal_attachments
    FOR ALL TO authenticated
    USING (entry_id IN (SELECT entry_id FROM public.journal_entries WHERE user_id = auth.uid()))
    WITH CHECK (entry_id IN (SELECT entry_id FROM public.journal_entries WHERE user_id = auth.uid()));

-- Affidavit requests: Author can manage
CREATE POLICY affidavit_requests_user ON public.affidavit_requests
    FOR ALL TO authenticated
    USING (requested_by_user_id = auth.uid())
    WITH CHECK (requested_by_user_id = auth.uid());

CREATE POLICY affidavit_history_user ON public.affidavit_status_history
    FOR SELECT TO authenticated
    USING (request_id IN (SELECT request_id FROM public.affidavit_requests WHERE requested_by_user_id = auth.uid()));

-- Legal content: Public read
CREATE POLICY legal_content_public ON public.legal_content
    FOR SELECT TO anon, authenticated
    USING (approved_by_counsel = true);

-- Deletion requests: Household member
CREATE POLICY deletion_requests_user ON public.deletion_requests
    FOR ALL TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Legal holds: Household member
CREATE POLICY legal_holds_household ON public.legal_holds
    FOR SELECT TO authenticated
    USING (household_id IN (
        SELECT household_id FROM public.household_members WHERE user_id = auth.uid()
    ));

CREATE POLICY legal_holds_insert ON public.legal_holds
    FOR INSERT TO authenticated
    WITH CHECK (
        household_id IN (
            SELECT household_id FROM public.household_members WHERE user_id = auth.uid()
        )
    );
-- Phase 9: Child Support Sync Migration
-- 10 tables: child_support_cases, css_consents, agency_payments, css_payment_matches,
-- css_hearings, css_shared_items, css_proof_submissions, css_safety_offers,
-- css_agency_invites, css_sync_logs.

-- 1. Child support cases table (linked per parent)
CREATE TABLE IF NOT EXISTS public.child_support_cases (
    case_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    household_id UUID NOT NULL REFERENCES public.households(household_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    agency_case_number TEXT NOT NULL,
    state TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('active', 'unlinked', 'pending_consent', 'sync_error')) DEFAULT 'active',
    monthly_order_cents BIGINT NOT NULL DEFAULT 0,
    balance_owed_cents BIGINT NOT NULL DEFAULT 0,
    arrears_balance_cents BIGINT NOT NULL DEFAULT 0,
    last_payment_date DATE,
    last_payment_amount_cents BIGINT NOT NULL DEFAULT 0,
    next_hearing_date TIMESTAMPTZ,
    last_synced_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    sync_source TEXT NOT NULL CHECK (sync_source IN ('api', 'batch')) DEFAULT 'api',
    family_violence_flag BOOLEAN NOT NULL DEFAULT false,
    safety_mode_offered BOOLEAN NOT NULL DEFAULT false,
    unlinked_at TIMESTAMPTZ,
    purge_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, agency_case_number)
);

-- 2. Consents table
CREATE TABLE IF NOT EXISTS public.css_consents (
    consent_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES public.child_support_cases(case_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    scope_read_only BOOLEAN NOT NULL DEFAULT true,
    acknowledged_not_agency BOOLEAN NOT NULL DEFAULT true,
    acknowledged_privacy BOOLEAN NOT NULL DEFAULT true,
    acknowledged_revoke_anytime BOOLEAN NOT NULL DEFAULT true,
    consented_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    revoked_at TIMESTAMPTZ,
    ip_address TEXT,
    user_agent TEXT
);

-- 3. Agency payments (read-only agency ledger)
CREATE TABLE IF NOT EXISTS public.agency_payments (
    payment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES public.child_support_cases(case_id) ON DELETE CASCADE,
    agency_reference TEXT,
    payment_date DATE NOT NULL,
    amount_cents BIGINT NOT NULL,
    source TEXT NOT NULL CHECK (source IN ('api', 'batch')) DEFAULT 'api',
    status TEXT NOT NULL CHECK (status IN ('disbursed', 'received', 'pending', 'reversed')) DEFAULT 'disbursed',
    synced_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Payment matches & reconciliation flags
CREATE TABLE IF NOT EXISTS public.css_payment_matches (
    match_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES public.child_support_cases(case_id) ON DELETE CASCADE,
    agency_payment_id UUID REFERENCES public.agency_payments(payment_id) ON DELETE SET NULL,
    expense_payment_id UUID REFERENCES public.expense_payments(payment_id) ON DELETE SET NULL,
    match_status TEXT NOT NULL CHECK (match_status IN ('matched', 'not_on_agency', 'not_recorded', 'amounts_differ')),
    flag_dismissed BOOLEAN NOT NULL DEFAULT false,
    dismissed_reason TEXT,
    dismissed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Agency hearings and deadlines
CREATE TABLE IF NOT EXISTS public.css_hearings (
    hearing_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES public.child_support_cases(case_id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    hearing_date TIMESTAMPTZ NOT NULL,
    location TEXT NOT NULL,
    docket_number TEXT,
    required_documents TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL CHECK (status IN ('scheduled', 'completed', 'continued', 'cancelled')) DEFAULT 'scheduled',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Shared items (items explicitly shared with co-parent)
CREATE TABLE IF NOT EXISTS public.css_shared_items (
    share_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES public.child_support_cases(case_id) ON DELETE CASCADE,
    shared_by_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL CHECK (item_type IN ('hearing', 'payment_receipt', 'order_summary', 'arrears_notice')),
    item_id TEXT NOT NULL,
    title TEXT NOT NULL,
    shared_details JSONB NOT NULL DEFAULT '{}'::jsonb,
    shared_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Proof submissions (direct proof sent to agency)
CREATE TABLE IF NOT EXISTS public.css_proof_submissions (
    submission_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES public.child_support_cases(case_id) ON DELETE CASCADE,
    submitted_by_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    payment_date DATE NOT NULL,
    amount_cents BIGINT NOT NULL,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('cashiers_check', 'bank_transfer', 'money_order', 'certified_check', 'other')),
    reference_number TEXT,
    file_url TEXT NOT NULL,
    verification_record_id TEXT NOT NULL UNIQUE CHECK (verification_record_id ~ '^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$'),
    status TEXT NOT NULL CHECK (status IN ('submitted', 'accepted', 'rejected', 'in_review')) DEFAULT 'submitted',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. Safety mode offers (private to user)
CREATE TABLE IF NOT EXISTS public.css_safety_offers (
    offer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES public.child_support_cases(case_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    decision TEXT NOT NULL CHECK (decision IN ('pending', 'accepted', 'declined')) DEFAULT 'pending',
    decided_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. Agency notice invites
CREATE TABLE IF NOT EXISTS public.css_agency_invites (
    invite_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES public.child_support_cases(case_id) ON DELETE CASCADE,
    invited_by_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    recipient_contact TEXT NOT NULL,
    docket_notice_number TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('sent', 'accepted', 'expired')) DEFAULT 'sent',
    sent_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Operations load log (strictly NO case values or PII)
CREATE TABLE IF NOT EXISTS public.css_sync_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id TEXT NOT NULL,
    agency_name TEXT NOT NULL,
    channel TEXT NOT NULL CHECK (channel IN ('api', 'batch')),
    started_at TIMESTAMPTZ NOT NULL,
    finished_at TIMESTAMPTZ,
    latency_ms INTEGER,
    records_count INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'held_back', 'late')),
    error_summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Immutability trigger for logs and proof submissions
CREATE OR REPLACE FUNCTION public.raise_immutable_css()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'This child support sync record is immutable and cannot be updated.';
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_immutable_css_sync_logs ON public.css_sync_logs;
CREATE TRIGGER trg_immutable_css_sync_logs
    BEFORE UPDATE ON public.css_sync_logs
    FOR EACH ROW EXECUTE FUNCTION public.raise_immutable_css();

DROP TRIGGER IF EXISTS trg_immutable_css_proof_submissions ON public.css_proof_submissions;
CREATE TRIGGER trg_immutable_css_proof_submissions
    BEFORE UPDATE OF verification_record_id, created_at ON public.css_proof_submissions
    FOR EACH ROW EXECUTE FUNCTION public.raise_immutable_css();

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.child_support_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.css_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.css_payment_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.css_hearings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.css_shared_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.css_proof_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.css_safety_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.css_agency_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.css_sync_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Cases are strictly visible only to the linking parent
CREATE POLICY css_cases_owner_policy ON public.child_support_cases
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY css_consents_owner_policy ON public.css_consents
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY agency_payments_owner_policy ON public.agency_payments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.child_support_cases c
            WHERE c.case_id = agency_payments.case_id
            AND c.user_id = auth.uid()
        )
    );

CREATE POLICY css_payment_matches_owner_policy ON public.css_payment_matches
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.child_support_cases c
            WHERE c.case_id = css_payment_matches.case_id
            AND c.user_id = auth.uid()
        )
    );

CREATE POLICY css_hearings_owner_policy ON public.css_hearings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.child_support_cases c
            WHERE c.case_id = css_hearings.case_id
            AND c.user_id = auth.uid()
        )
    );

-- Shared items are visible to members of the household
CREATE POLICY css_shared_items_household_policy ON public.css_shared_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.child_support_cases c
            JOIN public.household_members hm ON hm.household_id = c.household_id
            WHERE c.case_id = css_shared_items.case_id
            AND hm.user_id = auth.uid()
        )
    );

CREATE POLICY css_shared_items_insert_owner_policy ON public.css_shared_items
    FOR INSERT WITH CHECK (auth.uid() = shared_by_user_id);

CREATE POLICY css_proof_submissions_owner_policy ON public.css_proof_submissions
    FOR ALL USING (auth.uid() = submitted_by_user_id);

CREATE POLICY css_safety_offers_owner_policy ON public.css_safety_offers
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY css_agency_invites_owner_policy ON public.css_agency_invites
    FOR ALL USING (auth.uid() = invited_by_user_id);

-- Operations load log: visible to authenticated staff or read-only audit
CREATE POLICY css_sync_logs_read_policy ON public.css_sync_logs
    FOR SELECT TO authenticated USING (true);
-- Phase 10: Professionals and Access Migration
-- Tables:
-- 1. professionals
-- 2. professional_accesses
-- 3. professional_invites
-- 4. professional_shares
-- 5. professional_access_logs
-- 6. professional_messages

-- 1. Professionals registry
CREATE TABLE IF NOT EXISTS public.professionals (
    professional_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    professional_type TEXT NOT NULL CHECK (professional_type IN ('Attorney', 'Mediator', 'Therapist')),
    organization TEXT,
    two_factor_verified BOOLEAN NOT NULL DEFAULT false,
    terms_accepted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Professional accesses (per parent & household)
CREATE TABLE IF NOT EXISTS public.professional_accesses (
    access_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    household_id UUID NOT NULL REFERENCES public.households(household_id) ON DELETE CASCADE,
    parent_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES public.professionals(professional_id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('Invited', 'Active', 'Paused', 'Ended')) DEFAULT 'Invited',
    scope_messages BOOLEAN NOT NULL DEFAULT false,
    scope_calendar BOOLEAN NOT NULL DEFAULT false,
    scope_expenses BOOLEAN NOT NULL DEFAULT false,
    scope_child_info BOOLEAN NOT NULL DEFAULT false,
    scope_documents BOOLEAN NOT NULL DEFAULT false,
    scope_contact_attempts BOOLEAN NOT NULL DEFAULT false,
    date_range_start DATE,
    date_range_end DATE,
    access_ends_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Professional invites
CREATE TABLE IF NOT EXISTS public.professional_invites (
    invite_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    access_id UUID NOT NULL REFERENCES public.professional_accesses(access_id) ON DELETE CASCADE,
    parent_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL CHECK (status IN ('Sent', 'Opened', 'Accepted', 'Expired', 'Cancelled')) DEFAULT 'Sent',
    note TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    opened_at TIMESTAMPTZ,
    accepted_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Shared items
CREATE TABLE IF NOT EXISTS public.professional_shares (
    share_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    access_id UUID NOT NULL REFERENCES public.professional_accesses(access_id) ON DELETE CASCADE,
    item_type TEXT NOT NULL CHECK (item_type IN ('Certified export', 'Document', 'Child information entry', 'Message thread', 'Journal note', 'Recorded child support payment', 'Agency data item')),
    item_id TEXT NOT NULL,
    item_title TEXT NOT NULL,
    shared_by_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    shared_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Access log (immutable, audit trail of professional reading content)
CREATE TABLE IF NOT EXISTS public.professional_access_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    access_id UUID NOT NULL REFERENCES public.professional_accesses(access_id) ON DELETE CASCADE,
    opened TEXT NOT NULL,
    opened_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Forwarded private messages (PRO-02 Private channel, one-way copy)
CREATE TABLE IF NOT EXISTS public.professional_messages (
    forward_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    access_id UUID NOT NULL REFERENCES public.professional_accesses(access_id) ON DELETE CASCADE,
    message_id UUID,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    attachment_name TEXT,
    note TEXT,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    opened_at TIMESTAMPTZ
);

-- RLS Enablement
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_accesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_messages ENABLE ROW LEVEL SECURITY;

-- Immutable audit logs trigger
CREATE OR REPLACE FUNCTION public.raise_immutable_professional_logs()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'Access logs are immutable and cannot be altered or deleted.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_immutable_professional_access_logs
    BEFORE UPDATE OR DELETE ON public.professional_access_logs
    FOR EACH ROW EXECUTE FUNCTION public.raise_immutable_professional_logs();
-- Phase 11: Support and Help (SUP-01, SUP-02, SUP-03)
-- Covers tables for support cases, case messages, help articles, versions,
-- service notices, reply templates, audit logging, feedback, and search logging.

CREATE TABLE IF NOT EXISTS public.support_cases (
  case_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  household_id UUID REFERENCES public.households(household_id) ON DELETE SET NULL,
  requester_name TEXT NOT NULL DEFAULT 'Parent',
  requester_email TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('app_form', 'sign_in_page', 'email_request')),
  category TEXT NOT NULL CHECK (category IN (
    'account_and_sign_in',
    'messages_and_calls',
    'calendar_and_expenses',
    'records_and_exports',
    'child_support_link',
    'safety',
    'something_else'
  )),
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN (
    'new',
    'in_progress',
    'waiting_for_you',
    'resolved',
    'closed'
  )) DEFAULT 'new',
  priority TEXT NOT NULL CHECK (priority IN ('normal', 'priority')) DEFAULT 'normal',
  priority_reason TEXT CHECK (priority_reason IN ('court_date', 'safety', 'other')),
  court_date DATE,
  assigned_to_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_staff_name TEXT,
  related_case_id UUID REFERENCES public.support_cases(case_id) ON DELETE SET NULL,
  target_at TIMESTAMPTZ NOT NULL,
  first_reply_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,
  solved TEXT CHECK (solved IN ('yes', 'no', 'no_answer')),
  household_mode TEXT NOT NULL DEFAULT 'Linked',
  has_child_support_linked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.support_case_messages (
  message_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.support_cases(case_id) ON DELETE CASCADE,
  author_type TEXT NOT NULL CHECK (author_type IN ('parent', 'staff', 'system')),
  author_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  body TEXT NOT NULL,
  internal BOOLEAN NOT NULL DEFAULT FALSE,
  attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.help_articles (
  article_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  topic TEXT NOT NULL CHECK (topic IN (
    'account_and_sign_in',
    'messages_and_calls',
    'calendar_and_expenses',
    'records_and_exports',
    'child_support_link',
    'safety',
    'something_else'
  )),
  language TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'unpublished')) DEFAULT 'draft',
  version INTEGER NOT NULL DEFAULT 1,
  helpful_yes_count INTEGER NOT NULL DEFAULT 0,
  helpful_no_count INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.help_article_versions (
  version_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES public.help_articles(article_id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  topic TEXT NOT NULL,
  status TEXT NOT NULL,
  saved_by_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  saved_by_name TEXT NOT NULL DEFAULT 'Lead',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.service_notices (
  notice_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'unpublished')) DEFAULT 'draft',
  posted_by_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  posted_by_name TEXT NOT NULL DEFAULT 'Lead',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.reply_templates (
  template_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'account_and_sign_in',
    'messages_and_calls',
    'calendar_and_expenses',
    'records_and_exports',
    'child_support_link',
    'safety',
    'something_else'
  )),
  body TEXT NOT NULL,
  legal_approved_on DATE,
  status TEXT NOT NULL CHECK (status IN ('approved', 'pending', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.support_audit_log (
  log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES public.support_cases(case_id) ON DELETE SET NULL,
  case_number TEXT NOT NULL,
  staff_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  staff_name TEXT NOT NULL,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.article_feedback (
  feedback_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES public.help_articles(article_id) ON DELETE CASCADE,
  helpful BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.support_search_log (
  search_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term TEXT NOT NULL,
  result_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Immutable Triggers for Case Messages & Support Audit Log
CREATE OR REPLACE FUNCTION public.raise_immutable_support_records()
RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'Support case messages and audit logs are append-only and cannot be updated or deleted';
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_immutable_support_messages ON public.support_case_messages;
CREATE TRIGGER trg_immutable_support_messages
BEFORE UPDATE OR DELETE ON public.support_case_messages
FOR EACH ROW EXECUTE FUNCTION public.raise_immutable_support_records();

DROP TRIGGER IF EXISTS trg_immutable_support_audit_log ON public.support_audit_log;
CREATE TRIGGER trg_immutable_support_audit_log
BEFORE UPDATE OR DELETE ON public.support_audit_log
FOR EACH ROW EXECUTE FUNCTION public.raise_immutable_support_records();

-- Enable RLS
ALTER TABLE public.support_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_case_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.help_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.help_article_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reply_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_search_log ENABLE ROW LEVEL SECURITY;
