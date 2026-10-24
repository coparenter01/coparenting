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
