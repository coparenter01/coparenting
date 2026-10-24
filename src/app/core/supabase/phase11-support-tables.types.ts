import type {
  ArticleStatus,
  CaseAttachment,
  ReplyTemplateStatus,
  ServiceNoticeStatus,
  SupportCaseStatus,
  SupportCategory,
  SupportMessageAuthorType,
  SupportPriority,
  SupportPriorityReason,
  SupportSolvedAnswer,
  SupportSource,
} from './phase11-support.types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Phase11SupportTables = {
  support_cases: {
    Row: {
      case_id: string;
      case_number: string;
      user_id: string | null;
      household_id: string | null;
      requester_name: string;
      requester_email: string;
      source: SupportSource;
      category: SupportCategory;
      subject: string;
      description: string;
      status: SupportCaseStatus;
      priority: SupportPriority;
      priority_reason: SupportPriorityReason | null;
      court_date: string | null;
      assigned_to_user_id: string | null;
      assigned_staff_name: string | null;
      related_case_id: string | null;
      target_at: string;
      first_reply_at: string | null;
      resolved_at: string | null;
      closed_at: string | null;
      solved: SupportSolvedAnswer | null;
      household_mode: string;
      has_child_support_linked: boolean;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      case_id?: string;
      case_number: string;
      user_id?: string | null;
      household_id?: string | null;
      requester_name?: string;
      requester_email: string;
      source: SupportSource;
      category: SupportCategory;
      subject: string;
      description: string;
      status?: SupportCaseStatus;
      priority?: SupportPriority;
      priority_reason?: SupportPriorityReason | null;
      court_date?: string | null;
      assigned_to_user_id?: string | null;
      assigned_staff_name?: string | null;
      related_case_id?: string | null;
      target_at: string;
      first_reply_at?: string | null;
      resolved_at?: string | null;
      closed_at?: string | null;
      solved?: SupportSolvedAnswer | null;
      household_mode?: string;
      has_child_support_linked?: boolean;
      created_at?: string;
      updated_at?: string;
    };
    Update: Partial<Phase11SupportTables['support_cases']['Insert']>;
    Relationships: [];
  };
  support_case_messages: {
    Row: {
      message_id: string;
      case_id: string;
      author_type: SupportMessageAuthorType;
      author_user_id: string | null;
      author_name: string;
      body: string;
      internal: boolean;
      attachments: CaseAttachment[];
      created_at: string;
    };
    Insert: {
      message_id?: string;
      case_id: string;
      author_type: SupportMessageAuthorType;
      author_user_id?: string | null;
      author_name: string;
      body: string;
      internal?: boolean;
      attachments?: CaseAttachment[];
      created_at?: string;
    };
    Update: Partial<Phase11SupportTables['support_case_messages']['Insert']>;
    Relationships: [];
  };
  help_articles: {
    Row: {
      article_id: string;
      slug: string;
      title: string;
      body: string;
      summary: string;
      topic: SupportCategory;
      language: string;
      status: ArticleStatus;
      version: number;
      helpful_yes_count: number;
      helpful_no_count: number;
      updated_at: string;
      created_at: string;
    };
    Insert: {
      article_id?: string;
      slug: string;
      title: string;
      body: string;
      summary?: string;
      topic: SupportCategory;
      language?: string;
      status?: ArticleStatus;
      version?: number;
      helpful_yes_count?: number;
      helpful_no_count?: number;
      updated_at?: string;
      created_at?: string;
    };
    Update: Partial<Phase11SupportTables['help_articles']['Insert']>;
    Relationships: [];
  };
  help_article_versions: {
    Row: {
      version_id: string;
      article_id: string;
      version: number;
      title: string;
      body: string;
      summary: string;
      topic: string;
      status: string;
      saved_by_user_id: string | null;
      saved_by_name: string;
      created_at: string;
    };
    Insert: {
      version_id?: string;
      article_id: string;
      version: number;
      title: string;
      body: string;
      summary?: string;
      topic: string;
      status: string;
      saved_by_user_id?: string | null;
      saved_by_name?: string;
      created_at?: string;
    };
    Update: Partial<Phase11SupportTables['help_article_versions']['Insert']>;
    Relationships: [];
  };
  service_notices: {
    Row: {
      notice_id: string;
      text: string;
      starts_at: string;
      ends_at: string;
      status: ServiceNoticeStatus;
      posted_by_user_id: string | null;
      posted_by_name: string;
      created_at: string;
    };
    Insert: {
      notice_id?: string;
      text: string;
      starts_at: string;
      ends_at: string;
      status?: ServiceNoticeStatus;
      posted_by_user_id?: string | null;
      posted_by_name?: string;
      created_at?: string;
    };
    Update: Partial<Phase11SupportTables['service_notices']['Insert']>;
    Relationships: [];
  };
  reply_templates: {
    Row: {
      template_id: string;
      title: string;
      category: SupportCategory;
      body: string;
      legal_approved_on: string | null;
      status: ReplyTemplateStatus;
      created_at: string;
    };
    Insert: {
      template_id?: string;
      title: string;
      category: SupportCategory;
      body: string;
      legal_approved_on?: string | null;
      status?: ReplyTemplateStatus;
      created_at?: string;
    };
    Update: Partial<Phase11SupportTables['reply_templates']['Insert']>;
    Relationships: [];
  };
  support_audit_log: {
    Row: {
      log_id: string;
      case_id: string | null;
      case_number: string;
      staff_user_id: string | null;
      staff_name: string;
      action: string;
      details: Record<string, unknown> | null;
      created_at: string;
    };
    Insert: {
      log_id?: string;
      case_id?: string | null;
      case_number: string;
      staff_user_id?: string | null;
      staff_name: string;
      action: string;
      details?: Record<string, unknown> | null;
      created_at?: string;
    };
    Update: Partial<Phase11SupportTables['support_audit_log']['Insert']>;
    Relationships: [];
  };
  article_feedback: {
    Row: {
      feedback_id: string;
      article_id: string;
      helpful: boolean;
      created_at: string;
    };
    Insert: {
      feedback_id?: string;
      article_id: string;
      helpful: boolean;
      created_at?: string;
    };
    Update: Partial<Phase11SupportTables['article_feedback']['Insert']>;
    Relationships: [];
  };
  support_search_log: {
    Row: {
      search_id: string;
      term: string;
      result_count: number;
      created_at: string;
    };
    Insert: {
      search_id?: string;
      term: string;
      result_count?: number;
      created_at?: string;
    };
    Update: Partial<Phase11SupportTables['support_search_log']['Insert']>;
    Relationships: [];
  };
};
