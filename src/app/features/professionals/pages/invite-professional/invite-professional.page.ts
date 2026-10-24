import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProfessionalsService } from '@core/professionals/professionals.service';
import { proMsg01, type ProfessionalType } from '@core/professionals/professionals.types';

@Component({
  selector: 'pp-invite-professional',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './invite-professional.page.html',
  styleUrls: ['./invite-professional.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteProfessionalPage {
  private readonly professionalsService = inject(ProfessionalsService);
  private readonly router = inject(Router);

  readonly name = signal('');
  readonly email = signal('');
  readonly type = signal<ProfessionalType>('Attorney');
  readonly scopeMessages = signal(true);
  readonly scopeCalendar = signal(true);
  readonly scopeExpenses = signal(false);
  readonly scopeChildInfo = signal(true);
  readonly scopeDocuments = signal(true);
  readonly scopeContactAttempts = signal(false);
  readonly dateFrom = signal('');
  readonly dateTo = signal('');
  readonly accessEndsAt = signal('2027-12-31');

  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  onNameInput(event: Event): void {
    this.name.set((event.target as HTMLInputElement).value);
  }

  onEmailInput(event: Event): void {
    this.email.set((event.target as HTMLInputElement).value);
  }

  onDateFromInput(event: Event): void {
    this.dateFrom.set((event.target as HTMLInputElement).value);
  }

  onDateToInput(event: Event): void {
    this.dateTo.set((event.target as HTMLInputElement).value);
  }

  onAccessEndsInput(event: Event): void {
    this.accessEndsAt.set((event.target as HTMLInputElement).value);
  }

  onTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      this.type.set(target.value as ProfessionalType);
    }
  }

  onSubmit(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const result = this.professionalsService.inviteProfessional({
      name: this.name(),
      email: this.email(),
      type: this.type(),
      scope: {
        messages: this.scopeMessages(),
        calendar: this.scopeCalendar(),
        expenses: this.scopeExpenses(),
        childInfo: this.scopeChildInfo(),
        documents: this.scopeDocuments(),
        contactAttempts: this.scopeContactAttempts(),
        dateRangeStart: this.dateFrom() || null,
        dateRangeEnd: this.dateTo() || null,
      },
      accessEndsAt: this.accessEndsAt(),
    });

    if (!result.success) {
      this.errorMessage.set(result.error ?? 'Could not send invitation.');
      return;
    }

    this.successMessage.set(proMsg01(this.email()));
    setTimeout(() => {
      void this.router.navigate(['/professionals']);
    }, 1200);
  }
}
