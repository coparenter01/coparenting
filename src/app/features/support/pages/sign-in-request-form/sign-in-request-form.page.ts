import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SupportService } from '@core/support/support.service';
import type { SupportCategory } from '@core/support/support.types';
import { SUPPORT_CATEGORIES } from '@core/support/support.utils';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CategoryOption = {
  id: SupportCategory;
  label: string;
};

@Component({
  selector: 'pp-sign-in-request-form',
  imports: [RouterLink],
  templateUrl: './sign-in-request-form.page.html',
  styleUrls: ['./sign-in-request-form.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInRequestFormPage {
  private readonly support = inject(SupportService);
  private readonly router = inject(Router);

  readonly email = signal<string>('');
  readonly category = signal<SupportCategory | ''>('account_and_sign_in');
  readonly subject = signal<string>('');
  readonly description = signal<string>('');
  readonly errorMessage = signal<string | null>(null);

  readonly categories: CategoryOption[] = (
    Object.keys(SUPPORT_CATEGORIES) as SupportCategory[]
  ).map((key) => ({
    id: key,
    label: SUPPORT_CATEGORIES[key],
  }));

  onEmailChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.email.set(target.value);
  }

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

    const emailVal = this.email().trim();
    if (!emailVal.includes('@')) {
      this.errorMessage.set('ERR-02: Valid email address is required.');
      return;
    }

    const res = this.support.submitCase({
      requesterName: 'Sign-in Requester',
      requesterEmail: emailVal,
      source: 'sign_in_page',
      category: cat,
      subject: this.subject(),
      description: this.description(),
      isCourtDate: false,
    });

    if (res.success && res.caseId) {
      void this.router.navigate(['/help/confirmation', res.caseId]);
    } else {
      this.errorMessage.set(res.error ?? 'ERR-01: Could not submit request.');
    }
  }
}
