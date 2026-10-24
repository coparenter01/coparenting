import type {
  BillStatus,
  DisputeStatus,
  ExpenseCategory,
  ExpenseStatus,
  ExpenseVisibility,
  InAppPaymentStatus,
  PaymentMethod,
  RecurringPaymentFrequency,
  RecurringPaymentStatus,
  ReimbursementRequestStatus,
} from './phase7-expenses.types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Phase7ExpensesTables = {
  expenses: {
    Row: {
      id: string;
      household_id: string;
      created_by: string;
      paid_by: string;
      description: string;
      category: ExpenseCategory;
      expense_date: string;
      amount_cents: number;
      currency: string;
      note: string | null;
      status: ExpenseStatus;
      visibility: ExpenseVisibility;
      voided_at: string | null;
      voided_by: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id: string;
      household_id: string;
      created_by: string;
      paid_by: string;
      description: string;
      category: ExpenseCategory;
      expense_date: string;
      amount_cents: number;
      currency?: string;
      note?: string | null;
      status?: ExpenseStatus;
      visibility?: ExpenseVisibility;
      voided_at?: string | null;
      voided_by?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: Partial<Phase7ExpensesTables['expenses']['Insert']>;
    Relationships: [];
  };

  expense_children: {
    Row: {
      id: string;
      expense_id: string;
      child_id: string;
      created_at: string;
    };
    Insert: {
      id: string;
      expense_id: string;
      child_id: string;
      created_at?: string;
    };
    Update: Partial<Phase7ExpensesTables['expense_children']['Insert']>;
    Relationships: [];
  };

  expense_attachments: {
    Row: {
      id: string;
      expense_id: string;
      file_name: string;
      file_size_bytes: number;
      mime_type: string;
      storage_path: string;
      uploaded_by: string;
      created_at: string;
    };
    Insert: {
      id: string;
      expense_id: string;
      file_name: string;
      file_size_bytes: number;
      mime_type: string;
      storage_path: string;
      uploaded_by: string;
      created_at?: string;
    };
    Update: Partial<Phase7ExpensesTables['expense_attachments']['Insert']>;
    Relationships: [];
  };

  expense_versions: {
    Row: {
      id: string;
      expense_id: string;
      version_number: number;
      description: string;
      category: ExpenseCategory;
      expense_date: string;
      amount_cents: number;
      note: string | null;
      changed_by: string;
      device_info: string | null;
      created_at: string;
    };
    Insert: {
      id: string;
      expense_id: string;
      version_number: number;
      description: string;
      category: ExpenseCategory;
      expense_date: string;
      amount_cents: number;
      note?: string | null;
      changed_by: string;
      device_info?: string | null;
      created_at?: string;
    };
    Update: Partial<Phase7ExpensesTables['expense_versions']['Insert']>;
    Relationships: [];
  };

  reimbursement_requests: {
    Row: {
      id: string;
      household_id: string;
      expense_id: string;
      requested_by: string;
      requested_from: string;
      amount_cents: number;
      split_percentage: number;
      due_date: string;
      note: string | null;
      status: ReimbursementRequestStatus;
      decline_reason: string | null;
      paid_at: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id: string;
      household_id: string;
      expense_id: string;
      requested_by: string;
      requested_from: string;
      amount_cents: number;
      split_percentage?: number;
      due_date: string;
      note?: string | null;
      status?: ReimbursementRequestStatus;
      decline_reason?: string | null;
      paid_at?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: Partial<Phase7ExpensesTables['reimbursement_requests']['Insert']>;
    Relationships: [];
  };

  child_support_payments: {
    Row: {
      id: string;
      household_id: string;
      payer_id: string;
      payee_id: string;
      amount_cents: number;
      payment_date: string;
      payment_method: PaymentMethod;
      reference_number: string | null;
      note: string | null;
      status: 'Recorded' | 'Verified';
      created_at: string;
    };
    Insert: {
      id: string;
      household_id: string;
      payer_id: string;
      payee_id: string;
      amount_cents: number;
      payment_date: string;
      payment_method: PaymentMethod;
      reference_number?: string | null;
      note?: string | null;
      status?: 'Recorded' | 'Verified';
      created_at?: string;
    };
    Update: Partial<Phase7ExpensesTables['child_support_payments']['Insert']>;
    Relationships: [];
  };

  expense_split_rules: {
    Row: {
      id: string;
      household_id: string;
      category: ExpenseCategory;
      parent_a_percentage: number;
      parent_b_percentage: number;
      effective_date: string;
      created_by: string;
      created_at: string;
    };
    Insert: {
      id: string;
      household_id: string;
      category: ExpenseCategory;
      parent_a_percentage: number;
      parent_b_percentage: number;
      effective_date: string;
      created_by: string;
      created_at?: string;
    };
    Update: Partial<Phase7ExpensesTables['expense_split_rules']['Insert']>;
    Relationships: [];
  };

  expense_disputes: {
    Row: {
      id: string;
      household_id: string;
      expense_id: string;
      disputed_by: string;
      reason_category: string;
      explanation: string;
      status: DisputeStatus;
      resolution_notes: string | null;
      resolved_at: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id: string;
      household_id: string;
      expense_id: string;
      disputed_by: string;
      reason_category: string;
      explanation: string;
      status?: DisputeStatus;
      resolution_notes?: string | null;
      resolved_at?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: Partial<Phase7ExpensesTables['expense_disputes']['Insert']>;
    Relationships: [];
  };

  expense_payments: {
    Row: {
      id: string;
      reimbursement_request_id: string;
      payer_id: string;
      amount_cents: number;
      payment_method: PaymentMethod;
      status: InAppPaymentStatus;
      transaction_ref: string;
      test_mode: boolean;
      created_at: string;
    };
    Insert: {
      id: string;
      reimbursement_request_id: string;
      payer_id: string;
      amount_cents: number;
      payment_method: PaymentMethod;
      status?: InAppPaymentStatus;
      transaction_ref: string;
      test_mode?: boolean;
      created_at?: string;
    };
    Update: Partial<Phase7ExpensesTables['expense_payments']['Insert']>;
    Relationships: [];
  };

  recurring_payments: {
    Row: {
      id: string;
      household_id: string;
      title: string;
      amount_cents: number;
      frequency: RecurringPaymentFrequency;
      next_due_date: string;
      payer_id: string;
      payee_id: string;
      auto_pay: boolean;
      status: RecurringPaymentStatus;
      created_at: string;
    };
    Insert: {
      id: string;
      household_id: string;
      title: string;
      amount_cents: number;
      frequency: RecurringPaymentFrequency;
      next_due_date: string;
      payer_id: string;
      payee_id: string;
      auto_pay?: boolean;
      status?: RecurringPaymentStatus;
      created_at?: string;
    };
    Update: Partial<Phase7ExpensesTables['recurring_payments']['Insert']>;
    Relationships: [];
  };

  bills: {
    Row: {
      id: string;
      household_id: string;
      payee_name: string;
      amount_cents: number;
      due_date: string;
      category: ExpenseCategory;
      is_split: boolean;
      split_rule_id: string | null;
      status: BillStatus;
      created_at: string;
    };
    Insert: {
      id: string;
      household_id: string;
      payee_name: string;
      amount_cents: number;
      due_date: string;
      category: ExpenseCategory;
      is_split?: boolean;
      split_rule_id?: string | null;
      status?: BillStatus;
      created_at?: string;
    };
    Update: Partial<Phase7ExpensesTables['bills']['Insert']>;
    Relationships: [];
  };

  credit_building_settings: {
    Row: {
      id: string;
      household_id: string;
      user_id: string;
      is_enabled: boolean;
      enrolled_at: string | null;
      consent_accepted_at: string | null;
      created_at: string;
    };
    Insert: {
      id: string;
      household_id: string;
      user_id: string;
      is_enabled?: boolean;
      enrolled_at?: string | null;
      consent_accepted_at?: string | null;
      created_at?: string;
    };
    Update: Partial<Phase7ExpensesTables['credit_building_settings']['Insert']>;
    Relationships: [];
  };
};
