import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupportService } from '@core/support/support.service';
import type {
  ArticleStatus,
  HelpArticleVersion,
  SupportCategory,
} from '@core/support/support.types';
import { SUPPORT_CATEGORIES } from '@core/support/support.utils';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CategoryOption = {
  id: SupportCategory;
  label: string;
};

@Component({
  selector: 'pp-help-article-editor',
  imports: [RouterLink, SlicePipe],
  templateUrl: './help-article-editor.page.html',
  styleUrls: ['./help-article-editor.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpArticleEditorPage {
  private readonly support = inject(SupportService);
  private readonly route = inject(ActivatedRoute);

  readonly articleId = signal<string>('art-001');
  readonly title = signal<string>('Exporting court-admissible records');
  readonly topic = signal<SupportCategory>('records_and_exports');
  readonly body = signal<string>(
    'Learn how to generate certified PDF and CSV exports of your communications, calendar compliance, and payments with tamper-evident digital signatures and a unique 16-character verification code.',
  );
  readonly status = signal<ArticleStatus>('draft');
  readonly errorMessage = signal<string | null>(null);

  readonly categories: CategoryOption[] = (
    Object.keys(SUPPORT_CATEGORIES) as SupportCategory[]
  ).map((key) => ({
    id: key,
    label: SUPPORT_CATEGORIES[key],
  }));

  readonly versions = computed<HelpArticleVersion[]>(() => {
    const id = this.articleId();
    return this.support
      .articleVersions()
      .filter((v) => v.articleId === id)
      .sort((a, b) => b.version - a.version);
  });

  constructor() {
    this.route.params.subscribe((params) => {
      const id = typeof params['id'] === 'string' ? params['id'] : '';
      if (id) {
        this.articleId.set(id);
        const art = this.support.articles().find((a) => a.articleId === id);
        if (art) {
          this.title.set(art.title);
          this.topic.set(art.topic);
          this.body.set(art.body);
          this.status.set(art.status);
        }
      }
    });
  }

  onTitleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.title.set(target.value);
  }

  onTopicSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.topic.set(target.value as SupportCategory);
  }

  onBodyInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.body.set(target.value);
  }

  onStatusChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.status.set(target.value as ArticleStatus);
  }

  onSave(event: Event, isDraft: boolean): void {
    event.preventDefault();
    this.errorMessage.set(null);

    const titleVal = this.title().trim();
    const bodyVal = this.body().trim();
    if (!titleVal || !bodyVal) {
      this.errorMessage.set('ERR-10: Add a title and a text before you publish.');
      return;
    }

    const res = this.support.saveHelpArticle(
      {
        articleId: this.articleId(),
        title: titleVal,
        topic: this.topic(),
        body: bodyVal,
        status: isDraft ? 'draft' : 'published',
      },
      isDraft,
    );

    if (res.success) {
      this.status.set(isDraft ? 'draft' : 'published');
    } else {
      this.errorMessage.set(res.error ?? 'ERR-10: Error saving article.');
    }
  }

  onUnpublish(): void {
    this.support.saveHelpArticle(
      {
        articleId: this.articleId(),
        title: this.title(),
        topic: this.topic(),
        body: this.body(),
        status: 'unpublished',
      },
      true,
    );
    this.status.set('unpublished');
  }
}
