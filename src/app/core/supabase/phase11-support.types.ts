export type SupportCategory =
  | 'account_and_sign_in'
  | 'messages_and_calls'
  | 'calendar_and_expenses'
  | 'records_and_exports'
  | 'child_support_link'
  | 'safety'
  | 'something_else';

export type SupportCaseStatus = 'new' | 'in_progress' | 'waiting_for_you' | 'resolved' | 'closed';

export type SupportPriority = 'normal' | 'priority';

export type SupportPriorityReason = 'court_date' | 'safety' | 'other';

export type SupportSource = 'app_form' | 'sign_in_page' | 'email_request';

export type SupportSolvedAnswer = 'yes' | 'no' | 'no_answer';

export type SupportMessageAuthorType = 'parent' | 'staff' | 'system';

export type ArticleStatus = 'draft' | 'published' | 'unpublished';

export type ServiceNoticeStatus = 'draft' | 'published' | 'unpublished';

export type ReplyTemplateStatus = 'approved' | 'pending' | 'rejected';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CaseAttachment = {
  name: string;
  size: number;
  type: string;
  url?: string;
};
