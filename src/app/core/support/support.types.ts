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
} from '../supabase/phase11-support.types';

export * from '../supabase/phase11-support.types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type SupportCase = {
  caseId: string;
  caseNumber: string;
  userId: string | null;
  householdId: string | null;
  requesterName: string;
  requesterEmail: string;
  source: SupportSource;
  category: SupportCategory;
  subject: string;
  description: string;
  status: SupportCaseStatus;
  priority: SupportPriority;
  priorityReason?: SupportPriorityReason;
  courtDate?: string;
  assignedToUserId?: string;
  assignedStaffName?: string;
  relatedCaseId?: string;
  targetAt: string;
  firstReplyAt?: string;
  resolvedAt?: string;
  closedAt?: string;
  solved?: SupportSolvedAnswer;
  householdMode: 'Linked' | 'Solo';
  hasChildSupportLinked: boolean;
  createdAt: string;
  updatedAt: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type SupportCaseMessage = {
  messageId: string;
  caseId: string;
  authorType: SupportMessageAuthorType;
  authorUserId?: string;
  authorName: string;
  body: string;
  internal: boolean;
  attachments: CaseAttachment[];
  createdAt: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type HelpArticle = {
  articleId: string;
  slug: string;
  title: string;
  body: string;
  summary: string;
  topic: SupportCategory;
  language: string;
  status: ArticleStatus;
  version: number;
  helpfulYesCount: number;
  helpfulNoCount: number;
  updatedAt: string;
  createdAt: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type HelpArticleVersion = {
  versionId: string;
  articleId: string;
  version: number;
  title: string;
  body: string;
  summary: string;
  topic: string;
  status: string;
  savedByUserId?: string;
  savedByName: string;
  createdAt: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ServiceNotice = {
  noticeId: string;
  text: string;
  startsAt: string;
  endsAt: string;
  status: ServiceNoticeStatus;
  postedByUserId?: string;
  postedByName: string;
  createdAt: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ReplyTemplate = {
  templateId: string;
  title: string;
  category: SupportCategory;
  body: string;
  legalApprovedOn?: string;
  status: ReplyTemplateStatus;
  createdAt: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type SupportAuditLogEntry = {
  logId: string;
  caseId?: string;
  caseNumber: string;
  staffUserId?: string;
  staffName: string;
  action: string;
  details?: Record<string, unknown>;
  createdAt: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type SupportMeasuresReport = {
  periodStart: string;
  periodEnd: string;
  casesOpened: number;
  casesClosed: number;
  firstReplyOnTimeShare: number; // e.g. 0.96 (96%)
  priorityOnTimeShare: number; // e.g. 0.98 (98%)
  satisfactionShare: number; // e.g. 0.88 (88%)
  reopenRate: number; // e.g. 0.05 (5%)
  medianFirstReplyHours: number;
  p90FirstReplyHours: number;
  backlogByAge: {
    under12Hours: number;
    between12And24Hours: number;
    over24Hours: number;
  };
  categoryBreakdown: {
    category: SupportCategory;
    categoryLabel: string;
    casesCount: number;
    medianReplyHours: number;
    resolvedCount: number;
  }[];
  topSearches: { term: string; count: number }[];
  zeroResultSearches: { term: string; count: number }[];
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type NewCaseSubmissionDto = {
  requesterName?: string;
  requesterEmail: string;
  source: SupportSource;
  category: SupportCategory;
  subject: string;
  description: string;
  isCourtDate: boolean;
  courtDate?: string;
  attachments?: CaseAttachment[];
  userId?: string;
  householdId?: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AssignCaseDto = {
  caseId: string;
  staffId: string;
  staffName: string;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type LowerPriorityDto = {
  caseId: string;
  note: string;
  staffName: string;
};
