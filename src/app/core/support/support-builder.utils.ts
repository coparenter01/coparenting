import type {
  ArticleStatus,
  CaseAttachment,
  HelpArticle,
  HelpArticleVersion,
  NewCaseSubmissionDto,
  SupportCase,
  SupportCaseMessage,
  SupportPriority,
} from './support.types';
import { calculateTargetTime } from './support.utils';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type BuildCaseOptions = {
  dto: NewCaseSubmissionDto;
  caseId: string;
  caseNumber: string;
  priority: SupportPriority;
  userId: string | null;
  now: Date;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type BuildArticleOptions = {
  article: Partial<HelpArticle>;
  id: string;
  status: ArticleStatus;
  version: number;
  now: string;
  existing?: HelpArticle;
};

export function createInitialMessage(
  newCase: SupportCase,
  attachments: CaseAttachment[],
): SupportCaseMessage {
  return {
    messageId: `msg-${String(Date.now())}`,
    caseId: newCase.caseId,
    authorType: 'parent',
    authorUserId: newCase.userId ?? undefined,
    authorName: newCase.requesterName,
    body: newCase.description,
    internal: false,
    attachments,
    createdAt: newCase.createdAt,
  };
}

export function buildNewCase(opts: BuildCaseOptions): SupportCase {
  const { dto, caseId, caseNumber, priority, userId, now } = opts;
  const isPriority = priority === 'priority';
  const priorityReason = isPriority
    ? dto.category === 'safety'
      ? 'safety'
      : 'court_date'
    : undefined;

  return {
    caseId,
    caseNumber,
    userId: dto.userId ?? userId,
    householdId: dto.householdId ?? null,
    requesterName: dto.requesterName ?? 'Parent',
    requesterEmail: dto.requesterEmail,
    source: dto.source,
    category: dto.category,
    subject: dto.subject.trim(),
    description: dto.description.trim(),
    status: 'new',
    priority,
    priorityReason,
    courtDate: dto.courtDate,
    targetAt: calculateTargetTime(now, priority),
    householdMode: 'Linked',
    hasChildSupportLinked: false,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
}

function extractFeedbackCounts(
  now: string,
  existing?: HelpArticle,
): { yes: number; no: number; created: string } {
  if (!existing) {
    return { yes: 0, no: 0, created: now };
  }
  return {
    yes: existing.helpfulYesCount,
    no: existing.helpfulNoCount,
    created: existing.createdAt,
  };
}

export function buildHelpArticle(opts: BuildArticleOptions): HelpArticle {
  const { article, id, status, version, now, existing } = opts;
  const title = article.title ? article.title.trim() : '';
  const slug = article.slug ?? title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const counts = extractFeedbackCounts(now, existing);

  return {
    articleId: id,
    slug,
    title,
    body: article.body ? article.body.trim() : '',
    summary: article.summary ?? title,
    topic: article.topic ?? 'account_and_sign_in',
    language: 'en',
    status,
    version,
    helpfulYesCount: counts.yes,
    helpfulNoCount: counts.no,
    updatedAt: now,
    createdAt: counts.created,
  };
}

export function buildHelpArticleVersion(updated: HelpArticle, now: string): HelpArticleVersion {
  return {
    versionId: `ver-${String(Date.now())}`,
    articleId: updated.articleId,
    version: updated.version,
    title: updated.title,
    body: updated.body,
    summary: updated.summary,
    topic: updated.topic,
    status: updated.status,
    savedByName: 'Support Lead',
    createdAt: now,
  };
}
