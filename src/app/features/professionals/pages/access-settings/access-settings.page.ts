import { ChangeDetectionStrategy, Component, inject, type OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfessionalsService } from '@core/professionals/professionals.service';
import {
  proMsg04,
  proMsg07,
  type ProfessionalAccess,
} from '@core/professionals/professionals.types';

@Component({
  selector: 'pp-access-settings',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './access-settings.page.html',
  styleUrls: ['./access-settings.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessSettingsPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly professionalsService = inject(ProfessionalsService);

  readonly access = signal<ProfessionalAccess | undefined>(undefined);
  readonly scopeMessages = signal(false);
  readonly scopeCalendar = signal(false);
  readonly scopeExpenses = signal(false);
  readonly scopeChildInfo = signal(false);
  readonly scopeDocuments = signal(false);
  readonly scopeContactAttempts = signal(false);
  readonly accessEndsAt = signal('');

  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? 'acc-001';
    const found =
      this.professionalsService.getAccessById(id) ?? this.professionalsService.accesses()[0];
    if (found) {
      this.access.set(found);
      this.scopeMessages.set(found.scope.messages);
      this.scopeCalendar.set(found.scope.calendar);
      this.scopeExpenses.set(found.scope.expenses);
      this.scopeChildInfo.set(found.scope.childInfo);
      this.scopeDocuments.set(found.scope.documents);
      this.scopeContactAttempts.set(found.scope.contactAttempts);
      this.accessEndsAt.set(found.accessEndsAt);
    }
  }

  onAccessEndsInput(event: Event): void {
    this.accessEndsAt.set((event.target as HTMLInputElement).value);
  }

  onSave(): void {
    const current = this.access();
    if (!current) return;

    this.errorMessage.set(null);
    this.successMessage.set(null);

    const result = this.professionalsService.updateAccessScope(
      current.id,
      {
        messages: this.scopeMessages(),
        calendar: this.scopeCalendar(),
        expenses: this.scopeExpenses(),
        childInfo: this.scopeChildInfo(),
        documents: this.scopeDocuments(),
        contactAttempts: this.scopeContactAttempts(),
      },
      this.accessEndsAt(),
    );

    if (!result.success) {
      this.errorMessage.set(result.error ?? 'Could not update access.');
      return;
    }

    this.successMessage.set(proMsg04(current.professional.name));
  }

  onEndAccess(): void {
    const current = this.access();
    if (!current) return;

    const confirmed = window.confirm(proMsg07(current.professional.name));
    if (!confirmed) return;

    this.professionalsService.endAccess(current.id);
    void this.router.navigate(['/professionals']);
  }
}
