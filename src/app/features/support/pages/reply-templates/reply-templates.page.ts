import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SupportService } from '@core/support/support.service';
import type { ReplyTemplate, SupportCategory } from '@core/support/support.types';
import { SUPPORT_CATEGORIES } from '@core/support/support.utils';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CategoryOption = {
  id: SupportCategory;
  label: string;
};

@Component({
  selector: 'pp-reply-templates',
  imports: [RouterLink],
  templateUrl: './reply-templates.page.html',
  styleUrls: ['./reply-templates.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplyTemplatesPage {
  private readonly support = inject(SupportService);
  private readonly router = inject(Router);

  readonly templates = this.support.replyTemplates;

  readonly newTitle = signal<string>('');
  readonly newCategory = signal<SupportCategory>('account_and_sign_in');
  readonly newBody = signal<string>('');

  readonly categories: CategoryOption[] = (
    Object.keys(SUPPORT_CATEGORIES) as SupportCategory[]
  ).map((key) => ({
    id: key,
    label: SUPPORT_CATEGORIES[key],
  }));

  onTitleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.newTitle.set(target.value);
  }

  onCategorySelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.newCategory.set(target.value as SupportCategory);
  }

  onBodyInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.newBody.set(target.value);
  }

  onSelectTemplate(tpl: ReplyTemplate): void {
    if (tpl.status === 'approved') {
      const activeId = this.support.activeCaseId() ?? 'cas-002';
      void this.router.navigate(['/staff/support/case', activeId]);
    }
  }

  onSaveTemplate(event: Event): void {
    event.preventDefault();
    const title = this.newTitle().trim();
    const body = this.newBody().trim();
    if (!title || !body) return;

    this.support.saveReplyTemplate({
      title,
      category: this.newCategory(),
      body,
      status: 'pending',
    });

    this.newTitle.set('');
    this.newBody.set('');
  }

  getCategoryLabel(category: SupportCategory): string {
    return SUPPORT_CATEGORIES[category];
  }
}
