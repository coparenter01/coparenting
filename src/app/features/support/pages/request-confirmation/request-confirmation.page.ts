import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupportService } from '@core/support/support.service';
import type { SupportCase } from '@core/support/support.types';

@Component({
  selector: 'pp-request-confirmation',
  imports: [RouterLink],
  templateUrl: './request-confirmation.page.html',
  styleUrls: ['./request-confirmation.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestConfirmationPage {
  private readonly support = inject(SupportService);
  private readonly route = inject(ActivatedRoute);

  readonly caseId = signal<string>('cas-001');
  readonly copied = signal<boolean>(false);

  readonly currentCase = computed<SupportCase | null>(() => {
    const id = this.caseId();
    return this.support.cases().find((c) => c.caseId === id) ?? null;
  });

  constructor() {
    this.route.params.subscribe((params) => {
      const id = typeof params['id'] === 'string' ? params['id'] : '';
      if (id) {
        this.caseId.set(id);
      }
    });
  }

  copyCaseNumber(num: string): void {
    if (typeof navigator !== 'undefined') {
      void navigator.clipboard.writeText(num);
      this.copied.set(true);
      setTimeout(() => {
        this.copied.set(false);
      }, 2000);
    }
  }
}
