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
