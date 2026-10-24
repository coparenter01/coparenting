import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupportService } from '@core/support/support.service';
import type { HelpArticle } from '@core/support/support.types';

@Component({
  selector: 'pp-article-detail',
  imports: [RouterLink, SlicePipe],
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetailPage {
  private readonly support = inject(SupportService);
  private readonly route = inject(ActivatedRoute);

  readonly articleId = signal<string>('art-001');
  readonly feedbackSent = signal<boolean>(false);

  readonly article = computed<HelpArticle | null>(() => {
    const id = this.articleId();
    return this.support.articles().find((a) => a.articleId === id) ?? null;
  });

  readonly relatedArticles = computed<HelpArticle[]>(() => {
    const current = this.article();
    if (!current) return [];
    return this.support
      .articles()
      .filter(
        (a) =>
          a.articleId !== current.articleId &&
          a.topic === current.topic &&
          a.status === 'published',
      )
      .slice(0, 3);
  });

  constructor() {
    this.route.params.subscribe((params) => {
      const id = typeof params['id'] === 'string' ? params['id'] : '';
      if (id) {
        this.articleId.set(id);
        this.feedbackSent.set(false);
      }
    });
  }

  onRate(helpful: boolean): void {
    const art = this.article();
    if (art) {
      this.support.rateArticle(art.articleId, helpful);
      this.feedbackSent.set(true);
    }
  }
}
