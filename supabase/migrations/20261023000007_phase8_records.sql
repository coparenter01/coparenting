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
