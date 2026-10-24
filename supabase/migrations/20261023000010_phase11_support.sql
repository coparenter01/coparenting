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
