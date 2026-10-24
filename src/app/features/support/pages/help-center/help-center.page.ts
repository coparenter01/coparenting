import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SupportService } from '@core/support/support.service';
import type { SupportCategory } from '@core/support/support.types';
import { SUPPORT_CATEGORIES } from '@core/support/support.utils';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TopicOption = {
  id: SupportCategory;
  label: string;
};

@Component({
  selector: 'pp-help-center',
  imports: [RouterLink],
  templateUrl: './help-center.page.html',
  styleUrls: ['./help-center.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpCenterPage {
  private readonly support = inject(SupportService);
  private readonly router = inject(Router);

  readonly searchQuery = signal('');
  readonly activeNotice = this.support.activeNotice;
  readonly isOpen = this.support.isSupportOpenNow;

  readonly topics: TopicOption[] = (Object.keys(SUPPORT_CATEGORIES) as SupportCategory[]).map(
    (key) => ({
      id: key,
      label: SUPPORT_CATEGORIES[key],
    }),
  );

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  onSearchSubmit(): void {
    const q = this.searchQuery().trim();
    if (q) {
      void this.router.navigate(['/help/search'], { queryParams: { q } });
    } else {
      void this.router.navigate(['/help/search']);
    }
  }
}
