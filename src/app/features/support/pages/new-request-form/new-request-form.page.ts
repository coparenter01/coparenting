import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { SupportService } from '@core/support/support.service';
import type { HelpArticle, SupportCategory } from '@core/support/support.types';
import { SUPPORT_CATEGORIES } from '@core/support/support.utils';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CategoryOption = {
  id: SupportCategory;
  label: string;
};

@Component({
  selector: 'pp-new-request-form',
  imports: [RouterLink],
  templateUrl: './new-request-form.page.html',
  styleUrls: ['./new-request-form.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewRequestFormPage {
  private readonly support = inject(SupportService);
  private readonly auth = inject(AuthService, { optional: true });
  private readonly router = inject(Router);

  readonly category = signal<SupportCategory | ''>('');
  readonly subject = signal<string>('');
  readonly description = signal<string>('');
  readonly isCourtDate = signal<boolean>(false);
  readonly courtDate = signal<string>('');
  readonly errorMessage = signal<string | null>(null);

  readonly categories: CategoryOption[] = (
    Object.keys(SUPPORT_CATEGORIES) as SupportCategory[]
  ).map((key) => ({
    id: key,
    label: SUPPORT_CATEGORIES[key],
  }));

  readonly suggestedArticles = computed<HelpArticle[]>(() => {
    const text = this.subject().toLowerCase().trim();
    if (text.length < 3) return [];
    return this.support
      .articles()
      .filter(
        (a) =>
          a.status === 'published' &&
          (a.title.toLowerCase().includes(text) || a.body.toLowerCase().includes(text)),
      )
      .slice(0, 3);
  });

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.category.set(target.value as SupportCategory);
  }

  onSubjectChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.subject.set(target.value);
  }

  onDescriptionChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.description.set(target.value);
  }

  setIsCourtDate(value: boolean): void {
    this.isCourtDate.set(value);
  }

  onCourtDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.courtDate.set(target.value);
  }

  onFilesSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 3) {
      this.errorMessage.set('ERR-04: You can attach at most 3 files.');
    } else {
      this.errorMessage.set(null);
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.errorMessage.set(null);

    const cat = this.category();
    if (!cat) {
      this.errorMessage.set('ERR-02: Category is required.');
      return;
    }

    const email = this.auth?.user()?.email ?? 'parent@example.com';
    const res = this.support.submitCase({
      requesterName: this.auth?.profile()?.display_name ?? 'Parent',
      requesterEmail: email,
      source: 'app_form',
      category: cat,
      subject: this.subject(),
      description: this.description(),
      isCourtDate: this.isCourtDate(),
      courtDate: this.isCourtDate() ? this.courtDate() : undefined,
    });

    if (res.success && res.caseId) {
      void this.router.navigate(['/help/confirmation', res.caseId]);
    } else {
      this.errorMessage.set(res.error ?? 'ERR-01: Could not submit request.');
    }
  }
}
