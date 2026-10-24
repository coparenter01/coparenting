import { expect, test } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env['DEV_SUPABASE_URL'] ??
  process.env['SUPABASE_URL'] ??
  'https://qfwgcnzrpngoykisacxl.supabase.co';
const supabaseKey =
  process.env['DEV_SUPABASE_ANON_KEY'] ??
  process.env['SUPABASE_ANON_KEY'] ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmd2djbnpycG5nb3lraXNhY3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2NTg2MzMsImV4cCI6MjEwODIzNDYzM30.l33xQkfoZ28e-2nRsRW_6yQydtzNeDaBDwzYYNDvq4c';

test.describe('Phase 12 Comprehensive Database RLS Isolation Audit (Step 12-D)', () => {
  const sensitiveTables = [
    // Phase 1: Accounts & Household
    'households',
    'profiles',
    'contact_attempts',
    'audit_log',
    'verified_sessions',
    // Phase 3: Children & Documents
    'children',
    'child_information',
    'documents',
    'photos',
    'tasks',
    'wish_items',
    // Phase 4: Messaging & Notifications
    'message_threads',
    'messages',
    'notification_delivery_logs',
    'mediation_requests',
    // Phase 5: Calling
    'calls',
    'call_recordings',
    'call_transcripts',
    'call_consent_logs',
    // Phase 6: Calendar & Parenting Time
    'calendar_entries',
    'schedule_change_requests',
    'custody_exchanges',
    'parenting_plans',
    // Phase 7: Expenses & Payments
    'expenses',
    'reimbursement_requests',
    'child_support_payments',
    'expense_split_rules',
    // Phase 8: Records & Court
    'exports',
    'journal_entries',
    'affidavit_requests',
    'deletion_requests',
    'legal_holds',
    // Phase 9: Child Support Sync
    'child_support_cases',
    'css_consents',
    'agency_payments',
    'css_hearings',
    // Phase 10: Professionals & Access
    'professionals',
    'professional_accesses',
    'professional_shares',
    'professional_messages',
    // Phase 11: Support & Help
    'support_cases',
    'support_case_messages',
    'support_audit_log',
  ];

  for (const table of sensitiveTables) {
    test(`Anonymous user should be blocked from reading sensitive table "${table}"`, async () => {
      const client = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
      });

      const { data, error } = await client.from(table).select();
      // When RLS is enabled, selecting as anon yields empty array or permission error, never another tenant's rows
      expect(data === null || (Array.isArray(data) && data.length === 0) || Boolean(error)).toBe(
        true,
      );
    });
  }
});
