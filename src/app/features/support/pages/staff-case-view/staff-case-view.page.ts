import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupportService } from '@core/support/support.service';
import type {
  ReplyTemplate,
  SupportAuditLogEntry,
  SupportCase,
  SupportCaseMessage,
  SupportCaseStatus,
  SupportCategory,
} from '@core/support/support.types';
import { SUPPORT_CATEGORIES } from '@core/support/support.utils';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CategoryOption = {
  id: SupportCategory;
  label: string;
};

@Component({
  selector: 'pp-staff-case-view',
  imports: [RouterLink, SlicePipe],
  templateUrl: './staff-case-view.page.html',
  styleUrls: ['./staff-case-view.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffCaseViewPage {
  private readonly support = inject(SupportService);
  private readonly route = inject(ActivatedRoute);

  readonly caseId = signal<string>('cas-002');
  readonly replyText = signal<string>('');
  readonly noteText = signal<string>('');

  readonly categories: CategoryOption[] = (
    Object.keys(SUPPORT_CATEGORIES) as SupportCategory[]
  ).map((key) => ({
    id: key,
    label: SUPPORT_CATEGORIES[key],
  }));

  readonly currentCase = computed<SupportCase | null>(() => {
    const id = this.caseId();
    return this.support.cases().find((c) => c.caseId === id) ?? null;
  });

  readonly caseMessages = computed<SupportCaseMessage[]>(() => {
    const id = this.caseId();
    return this.support
      .caseMessages()
      .filter((m) => m.caseId === id)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  });

  readonly approvedTemplates = computed<ReplyTemplate[]>(() => {
    return this.support.replyTemplates().filter((t) => t.status === 'approved');
  });

  readonly caseAuditLogs = computed<SupportAuditLogEntry[]>(() => {
    const id = this.caseId();
    return this.support.auditLogs().filter((l) => l.caseId === id);
  });

  constructor() {
    this.route.params.subscribe((params) => {
      const id = typeof params['id'] === 'string' ? params['id'] : '';
      if (id) {
        this.caseId.set(id);
        this.support.selectCase(id);
      }
    });
  }

  onReplyInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.replyText.set(target.value);
  }

  onNoteInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.noteText.set(target.value);
  }

  onTemplateSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const tplId = target.value;
    if (!tplId) return;
    const tpl = this.approvedTemplates().find((t) => t.templateId === tplId);
    if (tpl) {
      this.replyText.set(tpl.body);
    }
  }

  onSendReply(event: Event): void {
    event.preventDefault();
    const text = this.replyText().trim();
    if (!text) return;
    const success = this.support.sendStaffReply(this.caseId(), text, 'Taylor Lead');
    if (success) {
      this.replyText.set('');
    }
  }

  onAddNote(): void {
    const note = this.noteText().trim();
    if (!note) return;
    const success = this.support.addInternalNote(this.caseId(), note, 'Taylor Lead');
    if (success) {
      this.noteText.set('');
    }
  }

  onStatusChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const status = target.value as SupportCaseStatus;
    this.support.changeStatus(this.caseId(), status, 'Taylor Lead');
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const cat = target.value as SupportCategory;
    this.support.cases.update((prev) =>
      prev.map((c) =>
        c.caseId === this.caseId()
          ? { ...c, category: cat, updatedAt: new Date().toISOString() }
          : c,
      ),
    );
  }

  onLowerPriority(): void {
    const note = prompt('Please enter the reason for lowering this case priority:');
    if (note) {
      this.support.lowerPriority({
        caseId: this.caseId(),
        note,
        staffName: 'Taylor Lead',
      });
    }
  }
}
