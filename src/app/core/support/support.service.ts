import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {
  buildHelpArticle,
  buildHelpArticleVersion,
  buildNewCase,
  createInitialMessage,
} from './support-builder.utils';
import {
  MOCK_ARTICLE_VERSIONS,
  MOCK_CASE_MESSAGES,
  MOCK_HELP_ARTICLES,
  MOCK_MEASURES_REPORT,
  MOCK_REPLY_TEMPLATES,
  MOCK_SERVICE_NOTICES,
  MOCK_SUPPORT_AUDIT_LOGS,
  MOCK_SUPPORT_CASES,
} from './support.mock';
import type {
  ArticleStatus,
  AssignCaseDto,
  CaseAttachment,
  HelpArticle,
  HelpArticleVersion,
  LowerPriorityDto,
  NewCaseSubmissionDto,
  ReplyTemplate,
  ServiceNotice,
  SupportAuditLogEntry,
  SupportCase,
  SupportCaseMessage,
  SupportCaseStatus,
  SupportMeasuresReport,
} from './support.types';
import {
  calculateTargetTime,
  determinePriority,
  generateCaseNumber,
  isSupportOpen,
  SUPPORT_MAX_DAILY_REQUESTS,
  validateCaseSubmission,
} from './support.utils';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  private readonly auth = inject(AuthService, { optional: true });

  // State Signals
  readonly cases = signal<SupportCase[]>(MOCK_SUPPORT_CASES);
  readonly caseMessages = signal<SupportCaseMessage[]>(MOCK_CASE_MESSAGES);
  readonly articles = signal<HelpArticle[]>(MOCK_HELP_ARTICLES);
  readonly articleVersions = signal<HelpArticleVersion[]>(MOCK_ARTICLE_VERSIONS);
  readonly serviceNotices = signal<ServiceNotice[]>(MOCK_SERVICE_NOTICES);
  readonly replyTemplates = signal<ReplyTemplate[]>(MOCK_REPLY_TEMPLATES);
  readonly auditLogs = signal<SupportAuditLogEntry[]>(MOCK_SUPPORT_AUDIT_LOGS);
  readonly measuresReport = signal<SupportMeasuresReport>(MOCK_MEASURES_REPORT);
  readonly activeCaseId = signal<string | null>('cas-001');

  // Selectors
  readonly isSupportOpenNow = computed(() => isSupportOpen());

  readonly activeNotice = computed(() => {
    return this.serviceNotices().find((n) => n.status === 'published') ?? null;
  });

  readonly activeCase = computed(() => {
    const id = this.activeCaseId();
    return id ? (this.cases().find((c) => c.caseId === id) ?? null) : null;
  });

  readonly activeCaseMessages = computed(() => {
    const id = this.activeCaseId();
    if (!id) return [];
    return this.caseMessages()
      .filter((m) => m.caseId === id)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  });

  readonly userCases = computed(() => {
    const user = this.auth?.user();
    const email = user?.email?.toLowerCase();
    const uid = user?.id;
    if (!uid && !email) {
      return this.cases();
    }
    return this.cases().filter((c) => {
      const matchUid = uid ? c.userId === uid : false;
      const matchEmail = email ? c.requesterEmail.toLowerCase() === email : false;
      return matchUid || matchEmail;
    });
  });

  // Actions
  selectCase(caseId: string | null): void {
    this.activeCaseId.set(caseId);
    if (caseId) this.logAudit(caseId, 'Viewed case thread');
  }

  submitCase(dto: NewCaseSubmissionDto): { success: boolean; caseId?: string; error?: string } {
    const error = validateCaseSubmission(dto);
    if (error) return { success: false, error };

    const todayStr = new Date().toISOString().slice(0, 10);
    const dailyCount = this.cases().filter(
      (c) =>
        c.requesterEmail.toLowerCase() === dto.requesterEmail.toLowerCase() &&
        c.createdAt.slice(0, 10) === todayStr,
    ).length;

    if (dailyCount >= SUPPORT_MAX_DAILY_REQUESTS) {
      return { success: false, error: 'ERR-05: Maximum 10 support requests per day reached.' };
    }

    const now = new Date();
    const priority = determinePriority(dto.category, dto.courtDate, now);
    const caseId = `cas-${String(Date.now())}`;
    const caseNumber = generateCaseNumber();
    const userId = this.auth?.user()?.id ?? null;
    const newCase = buildNewCase({ dto, caseId, caseNumber, priority, userId, now });
    const initialMsg = createInitialMessage(newCase, dto.attachments ?? []);

    this.cases.update((prev) => [newCase, ...prev]);
    this.caseMessages.update((prev) => [...prev, initialMsg]);
    this.logAudit(caseId, `Case opened via ${dto.source}`, caseNumber);
    return { success: true, caseId };
  }

  sendUserReply(caseId: string, body: string, attachments: CaseAttachment[] = []): boolean {
    const text = body.trim();
    const target = this.cases().find((c) => c.caseId === caseId);
    if (!text || !target) return false;

    const now = new Date();
    const reply: SupportCaseMessage = {
      messageId: `msg-${String(Date.now())}`,
      caseId,
      authorType: 'parent',
      authorName: target.requesterName,
      body: text,
      internal: false,
      attachments,
      createdAt: now.toISOString(),
    };

    this.caseMessages.update((prev) => [...prev, reply]);
    this.cases.update((prev) =>
      prev.map((c) =>
        c.caseId === caseId
          ? {
              ...c,
              status: 'in_progress',
              updatedAt: now.toISOString(),
              targetAt: calculateTargetTime(now, c.priority),
            }
          : c,
      ),
    );
    this.logAudit(caseId, 'Parent sent reply', target.caseNumber);
    return true;
  }

  sendStaffReply(caseId: string, body: string, staffName = 'ParentPath Support'): boolean {
    const text = body.trim();
    const target = this.cases().find((c) => c.caseId === caseId);
    if (!text || !target) return false;

    const now = new Date();
    const reply: SupportCaseMessage = {
      messageId: `msg-${String(Date.now())}`,
      caseId,
      authorType: 'staff',
      authorName: staffName,
      body: text,
      internal: false,
      attachments: [],
      createdAt: now.toISOString(),
    };

    this.caseMessages.update((prev) => [...prev, reply]);
    this.cases.update((prev) =>
      prev.map((c) =>
        c.caseId === caseId
          ? {
              ...c,
              status: 'waiting_for_you',
              firstReplyAt: c.firstReplyAt ?? now.toISOString(),
              updatedAt: now.toISOString(),
            }
          : c,
      ),
    );
    this.logAudit(caseId, `Staff reply sent by ${staffName}`, target.caseNumber);
    return true;
  }

  addInternalNote(caseId: string, note: string, staffName = 'Staff'): boolean {
    const text = note.trim();
    const target = this.cases().find((c) => c.caseId === caseId);
    if (!text || !target) return false;

    const message: SupportCaseMessage = {
      messageId: `msg-${String(Date.now())}`,
      caseId,
      authorType: 'staff',
      authorName: staffName,
      body: text,
      internal: true,
      attachments: [],
      createdAt: new Date().toISOString(),
    };

    this.caseMessages.update((prev) => [...prev, message]);
    this.logAudit(caseId, `Internal note added by ${staffName}`, target.caseNumber);
    return true;
  }

  assignCase(dto: AssignCaseDto): void {
    this.cases.update((prev) =>
      prev.map((c) =>
        c.caseId === dto.caseId
          ? {
              ...c,
              assignedToUserId: dto.staffId,
              assignedStaffName: dto.staffName,
              updatedAt: new Date().toISOString(),
            }
          : c,
      ),
    );
    this.logAudit(dto.caseId, `Assigned to ${dto.staffName}`);
  }

  changeStatus(caseId: string, status: SupportCaseStatus, staffName = 'Staff'): void {
    const now = new Date().toISOString();
    this.cases.update((prev) =>
      prev.map((c) =>
        c.caseId === caseId
          ? {
              ...c,
              status,
              resolvedAt: status === 'resolved' ? now : c.resolvedAt,
              closedAt: status === 'closed' ? now : c.closedAt,
              updatedAt: now,
            }
          : c,
      ),
    );
    this.logAudit(caseId, `Status changed to ${status} by ${staffName}`);
  }

  lowerPriority(dto: LowerPriorityDto): boolean {
    const note = dto.note.trim();
    const target = this.cases().find((c) => c.caseId === dto.caseId);
    if (!note || !target) return false;

    const now = new Date();
    this.addInternalNote(dto.caseId, `Priority lowered to normal: ${note}`, dto.staffName);
    this.cases.update((prev) =>
      prev.map((c) =>
        c.caseId === dto.caseId
          ? {
              ...c,
              priority: 'normal',
              targetAt: calculateTargetTime(now, 'normal'),
              updatedAt: now.toISOString(),
            }
          : c,
      ),
    );
    this.logAudit(dto.caseId, `Priority lowered to normal by ${dto.staffName}`, target.caseNumber);
    return true;
  }

  reopenCase(caseId: string, replyText: string): { reopened: boolean; newCaseId?: string } {
    const existing = this.cases().find((c) => c.caseId === caseId);
    if (!existing) return { reopened: false };

    const resolvedTime = existing.resolvedAt ? new Date(existing.resolvedAt).getTime() : 0;
    const closedTime = existing.closedAt ? new Date(existing.closedAt).getTime() : 0;
    const baseTime = Math.max(resolvedTime, closedTime, new Date(existing.updatedAt).getTime());
    const daysSince = (Date.now() - baseTime) / (1000 * 60 * 60 * 24);

    if (daysSince <= 30) {
      this.sendUserReply(caseId, replyText);
      this.cases.update((prev) =>
        prev.map((c) =>
          c.caseId === caseId
            ? { ...c, status: 'in_progress', updatedAt: new Date().toISOString() }
            : c,
        ),
      );
      this.logAudit(caseId, 'Case reopened within 30 days', existing.caseNumber);
      return { reopened: true };
    }

    const subDto: NewCaseSubmissionDto = {
      requesterName: existing.requesterName,
      requesterEmail: existing.requesterEmail,
      source: 'app_form',
      category: existing.category,
      subject: `Re: ${existing.subject}`,
      description: replyText,
      isCourtDate: false,
      userId: existing.userId ?? undefined,
      householdId: existing.householdId ?? undefined,
    };
    const res = this.submitCase(subDto);
    if (res.success && res.caseId) {
      this.cases.update((prev) =>
        prev.map((c) => (c.caseId === res.caseId ? { ...c, relatedCaseId: existing.caseId } : c)),
      );
    }
    return { reopened: false, newCaseId: res.caseId };
  }

  rateArticle(articleId: string, helpful: boolean): void {
    this.articles.update((prev) =>
      prev.map((art) =>
        art.articleId === articleId
          ? {
              ...art,
              helpfulYesCount: helpful ? art.helpfulYesCount + 1 : art.helpfulYesCount,
              helpfulNoCount: !helpful ? art.helpfulNoCount + 1 : art.helpfulNoCount,
            }
          : art,
      ),
    );
  }

  rateCaseSolved(caseId: string, answer: 'yes' | 'no'): void {
    this.cases.update((prev) =>
      prev.map((c) =>
        c.caseId === caseId ? { ...c, solved: answer, updatedAt: new Date().toISOString() } : c,
      ),
    );
    this.logAudit(caseId, `User answered solved: ${answer}`);
  }

  saveServiceNotice(notice: Partial<ServiceNotice>): void {
    const id = notice.noticeId ?? `not-${String(Date.now())}`;
    const entry: ServiceNotice = {
      noticeId: id,
      text: notice.text?.trim() ?? '',
      startsAt: notice.startsAt ?? new Date().toISOString(),
      endsAt: notice.endsAt ?? new Date(Date.now() + 86400000).toISOString(),
      status: notice.status ?? 'draft',
      postedByName: notice.postedByName ?? 'Operations Lead',
      createdAt: notice.createdAt ?? new Date().toISOString(),
    };
    this.serviceNotices.update((prev) => {
      const idx = prev.findIndex((n) => n.noticeId === id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = entry;
        return copy;
      }
      return [entry, ...prev];
    });
  }

  saveHelpArticle(
    article: Partial<HelpArticle>,
    isDraft = true,
  ): { success: boolean; error?: string } {
    const title = article.title?.trim() ?? '';
    const body = article.body?.trim() ?? '';
    if (!title || !body) {
      return {
        success: false,
        error: 'ERR-10: Title and text are required to publish an article.',
      };
    }

    const id = article.articleId ?? `art-${String(Date.now())}`;
    const now = new Date().toISOString();
    const existing = this.articles().find((a) => a.articleId === id);
    const version = (existing?.version ?? 0) + 1;
    const status: ArticleStatus = isDraft ? 'draft' : 'published';

    const updated = buildHelpArticle({ article, id, status, version, now, existing });
    const newVersion = buildHelpArticleVersion(updated, now);

    this.articles.update((prev) => {
      const idx = prev.findIndex((a) => a.articleId === id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = updated;
        return copy;
      }
      return [updated, ...prev];
    });
    this.articleVersions.update((prev) => [newVersion, ...prev]);
    return { success: true };
  }

  saveReplyTemplate(template: Partial<ReplyTemplate>): void {
    const id = template.templateId ?? `tpl-${String(Date.now())}`;
    const entry: ReplyTemplate = {
      templateId: id,
      title: template.title?.trim() ?? 'Untitled Template',
      category: template.category ?? 'account_and_sign_in',
      body: template.body?.trim() ?? '',
      legalApprovedOn: template.legalApprovedOn,
      status: template.status ?? 'pending',
      createdAt: template.createdAt ?? new Date().toISOString(),
    };
    this.replyTemplates.update((prev) => {
      const idx = prev.findIndex((t) => t.templateId === id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = entry;
        return copy;
      }
      return [entry, ...prev];
    });
  }

  private logAudit(caseId: string, action: string, caseNumber?: string): void {
    const c = this.cases().find((item) => item.caseId === caseId);
    const resolvedNum = caseNumber ?? c?.caseNumber ?? caseId;
    const staffName =
      this.auth?.profile()?.display_name ?? this.auth?.user()?.email ?? 'Support Staff';
    const entry: SupportAuditLogEntry = {
      logId: `log-${String(Date.now())}-${String(Math.floor(Math.random() * 1000))}`,
      caseId,
      caseNumber: resolvedNum,
      staffName,
      action,
      createdAt: new Date().toISOString(),
    };
    this.auditLogs.update((prev) => [entry, ...prev]);
  }
}
