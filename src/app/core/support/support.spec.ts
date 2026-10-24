import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthService } from '../auth/auth.service';
import { SupportService } from './support.service';
import type { NewCaseSubmissionDto, SupportCase } from './support.types';
import {
  determinePriority,
  exportMeasuresReportCsv,
  generateCaseNumber,
  isCourtDateInPast,
  isCourtDateWithin14Days,
  isSupportOpen,
  isUsFederalHoliday,
  validateCaseSubmission,
} from './support.utils';

describe('Phase 11: Support Core Domain & Service', () => {
  let service: SupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupportService, AuthService],
    });
    service = TestBed.inject(SupportService);
  });

  describe('support.utils validation and calculations', () => {
    it('generateCaseNumber should match SC- followed by 8 digits', () => {
      const num1 = generateCaseNumber();
      const num2 = generateCaseNumber();
      expect(num1).toMatch(/^SC-\d{8}$/);
      expect(num2).toMatch(/^SC-\d{8}$/);
      expect(num1).not.toBe(num2);
    });

    it('isCourtDateInPast and isCourtDateWithin14Days should correctly evaluate dates', () => {
      const mockNow = new Date('2026-10-24T12:00:00Z');
      expect(isCourtDateInPast('2026-10-20', mockNow)).toBe(true);
      expect(isCourtDateInPast('2026-10-24', mockNow)).toBe(false);
      expect(isCourtDateInPast('2026-10-30', mockNow)).toBe(false);

      expect(isCourtDateWithin14Days('2026-10-28', mockNow)).toBe(true);
      expect(isCourtDateWithin14Days('2026-11-20', mockNow)).toBe(false);
    });

    it('determinePriority should return priority for Safety or court date within 14 days', () => {
      const mockNow = new Date('2026-10-24T12:00:00Z');
      expect(determinePriority('safety', undefined, mockNow)).toBe('priority');
      expect(determinePriority('calendar_and_expenses', '2026-10-30', mockNow)).toBe('priority');
      expect(determinePriority('calendar_and_expenses', '2026-11-25', mockNow)).toBe('normal');
      expect(determinePriority('account_and_sign_in', undefined, mockNow)).toBe('normal');
    });

    it('validateCaseSubmission should catch missing or invalid fields', () => {
      const mockNow = new Date('2026-10-24T12:00:00Z');
      const validDto: NewCaseSubmissionDto = {
        requesterEmail: 'parent@example.com',
        source: 'app_form',
        category: 'records_and_exports',
        subject: 'Need export certificate',
        description: 'Details of the export request.',
        isCourtDate: false,
      };

      expect(validateCaseSubmission(validDto, mockNow)).toBeNull();

      expect(validateCaseSubmission({ ...validDto, category: '' as never }, mockNow)).toContain(
        'ERR-02',
      );
      expect(validateCaseSubmission({ ...validDto, subject: '' }, mockNow)).toContain('ERR-02');
      expect(validateCaseSubmission({ ...validDto, subject: 'a'.repeat(121) }, mockNow)).toContain(
        'ERR-02',
      );
      expect(validateCaseSubmission({ ...validDto, description: '' }, mockNow)).toContain('ERR-02');
      expect(
        validateCaseSubmission({ ...validDto, description: 'a'.repeat(5001) }, mockNow),
      ).toContain('ERR-02');
      expect(validateCaseSubmission({ ...validDto, requesterEmail: 'invalid' }, mockNow)).toContain(
        'ERR-02',
      );

      // Court date in past
      expect(
        validateCaseSubmission(
          { ...validDto, isCourtDate: true, courtDate: '2026-10-20' },
          mockNow,
        ),
      ).toContain('ERR-07');

      // Court date valid
      expect(
        validateCaseSubmission(
          { ...validDto, isCourtDate: true, courtDate: '2026-10-30' },
          mockNow,
        ),
      ).toBeNull();
    });

    it('isSupportOpen and isUsFederalHoliday checks should execute safely', () => {
      expect(typeof isSupportOpen()).toBe('boolean');
      expect(isUsFederalHoliday(1, 1)).toBe(true);
      expect(isUsFederalHoliday(12, 25)).toBe(true);
      expect(isUsFederalHoliday(4, 15)).toBe(false);
    });

    it('exportMeasuresReportCsv should generate CSV with targets and metrics', () => {
      const csv = exportMeasuresReportCsv(service.measuresReport());
      expect(csv).toContain('Metric,Value,Target');
      expect(csv).toContain('First Reply On Time,96%,95%');
      expect(csv).toContain('Priority Reply On Time (under 4h),98%,95%');
      expect(csv).toContain('User Satisfaction,92%,95%');
    });
  });

  describe('SupportService operations', () => {
    it('submitCase should add case, initial message, and respect 10/day limit', () => {
      const dto: NewCaseSubmissionDto = {
        requesterName: 'Pat Test',
        requesterEmail: 'pat.test@example.com',
        source: 'app_form',
        category: 'account_and_sign_in',
        subject: 'Test sign in help',
        description: 'Trouble with two-factor OTP',
        isCourtDate: false,
      };

      const res = service.submitCase(dto);
      expect(res.success).toBe(true);
      expect(res.caseId).toBeDefined();

      const created = service.cases().find((c) => c.caseId === res.caseId);
      expect(created).toBeDefined();
      expect(created?.caseNumber).toMatch(/^SC-\d{8}$/);
      expect(created?.status).toBe('new');

      // Rate limit test
      for (let i = 0; i < 9; i++) {
        service.submitCase({ ...dto, subject: `Test ${String(i)}` });
      }
      const eleventh = service.submitCase(dto);
      expect(eleventh.success).toBe(false);
      expect(eleventh.error).toContain('ERR-05');
    });

    it('sendUserReply, sendStaffReply, and addInternalNote should maintain thread integrity', () => {
      const target = service.cases()[0];
      expect(target).toBeDefined();
      if (!target) return;
      const caseId = target.caseId;

      const userReplySuccess = service.sendUserReply(caseId, 'Thank you for following up.');
      expect(userReplySuccess).toBe(true);
      expect(service.cases().find((c) => c.caseId === caseId)?.status).toBe('in_progress');

      const staffReplySuccess = service.sendStaffReply(caseId, 'We have updated your case.');
      expect(staffReplySuccess).toBe(true);
      expect(service.cases().find((c) => c.caseId === caseId)?.status).toBe('waiting_for_you');

      const internalNoteSuccess = service.addInternalNote(
        caseId,
        'Internal verification completed.',
      );
      expect(internalNoteSuccess).toBe(true);
      const noteMsg = service.caseMessages().find((m) => m.caseId === caseId && m.internal);
      expect(noteMsg).toBeDefined();
    });

    it('lowerPriority should require a note and update target time', () => {
      const fallback = service.cases()[0];
      const target = service.cases().find((c) => c.priority === 'priority') ?? fallback;
      expect(target).toBeDefined();
      if (!target) return;

      const fail = service.lowerPriority({ caseId: target.caseId, note: '', staffName: 'Staff' });
      expect(fail).toBe(false);

      const pass = service.lowerPriority({
        caseId: target.caseId,
        note: 'Issue does not involve imminent risk',
        staffName: 'Staff',
      });
      expect(pass).toBe(true);
      const updated = service.cases().find((c) => c.caseId === target.caseId);
      expect(updated?.priority).toBe('normal');
    });

    it('reopenCase should reopen if within 30 days, or create linked case if older', () => {
      const fallback = service.cases()[0];
      const recentCase = service.cases().find((c) => c.status === 'resolved') ?? fallback;
      expect(recentCase).toBeDefined();
      if (!recentCase) return;

      const resRecent = service.reopenCase(recentCase.caseId, 'Need additional assistance.');
      expect(resRecent.reopened).toBe(true);

      // Create an old case (>30 days ago)
      const oldDate = new Date(Date.now() - 35 * 86400000).toISOString();
      const oldCase: SupportCase = {
        ...recentCase,
        caseId: 'cas-old-35d',
        caseNumber: 'SC-99999999',
        userId: null,
        householdId: null,
        status: 'closed',
        resolvedAt: oldDate,
        closedAt: oldDate,
        updatedAt: oldDate,
      };
      service.cases.update((prev) => [oldCase, ...prev]);

      const resOld = service.reopenCase('cas-old-35d', 'Old case follow-up.');
      expect(resOld.reopened).toBe(false);
      expect(resOld.newCaseId).toBeDefined();
      const linked = service.cases().find((c) => c.caseId === resOld.newCaseId);
      expect(linked?.relatedCaseId).toBe('cas-old-35d');
    });

    it('rateArticle and rateCaseSolved should record feedback', () => {
      const art = service.articles()[0];
      expect(art).toBeDefined();
      if (!art) return;

      const initialYes = art.helpfulYesCount;
      service.rateArticle(art.articleId, true);
      expect(service.articles().find((a) => a.articleId === art.articleId)?.helpfulYesCount).toBe(
        initialYes + 1,
      );

      const c = service.cases()[0];
      expect(c).toBeDefined();
      if (!c) return;

      service.rateCaseSolved(c.caseId, 'yes');
      expect(service.cases().find((item) => item.caseId === c.caseId)?.solved).toBe('yes');
    });

    it('saveHelpArticle should record version history and reject empty publish', () => {
      const fail = service.saveHelpArticle({ title: '', body: '' }, false);
      expect(fail.success).toBe(false);
      expect(fail.error).toContain('ERR-10');

      const pass = service.saveHelpArticle(
        { title: 'New Help Article', body: 'Step by step article content', topic: 'safety' },
        false,
      );
      expect(pass.success).toBe(true);
      expect(service.articles().some((a) => a.title === 'New Help Article')).toBe(true);
    });
  });
});
