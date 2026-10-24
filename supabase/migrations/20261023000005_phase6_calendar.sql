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
