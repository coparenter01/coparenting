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
