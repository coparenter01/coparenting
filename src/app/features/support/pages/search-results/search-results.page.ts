import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupportService } from '@core/support/support.service';
import type { SupportCategory } from '@core/support/support.types';
import { SUPPORT_CATEGORIES } from '@core/support/support.utils';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TopicOption = {
  id: SupportCategory;
  label: string;
};

@Component({
  selector: 'pp-search-results',
  imports: [RouterLink],
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsPage {
  private readonly support = inject(SupportService);
  private readonly route = inject(ActivatedRoute);

  readonly query = signal('');
  readonly selectedTopic = signal<string>('');

  readonly topics: TopicOption[] = (Object.keys(SUPPORT_CATEGORIES) as SupportCategory[]).map(
    (key) => ({
      id: key,
      label: SUPPORT_CATEGORIES[key],
    }),
  );

  readonly filteredArticles = computed(() => {
    const q = this.query().toLowerCase().trim();
    const topic = this.selectedTopic();
    return this.support.articles().filter((art) => {
      if (art.status !== 'published') return false;
      if (topic && art.topic !== topic) return false;
      if (!q) return true;
      return (
        art.title.toLowerCase().includes(q) ||
        art.body.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q)
      );
    });
  });

  constructor() {
    this.route.queryParams.subscribe((params) => {
      const q = typeof params['q'] === 'string' ? params['q'] : '';
      if (q) {
        this.query.set(q);
      }
      const topic = typeof params['topic'] === 'string' ? params['topic'] : '';
      if (topic) {
        this.selectedTopic.set(topic);
      }
    });
  }

  onQueryChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.query.set(target.value);
  }

  onTopicChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedTopic.set(target.value);
  }
}
