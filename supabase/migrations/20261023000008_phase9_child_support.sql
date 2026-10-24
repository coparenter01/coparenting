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
