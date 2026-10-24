import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalsService } from '@core/professionals/professionals.service';

@Component({
  selector: 'pp-accept-invite',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './accept-invite.page.html',
  styleUrls: ['./accept-invite.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcceptInvitePage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly professionalsService = inject(ProfessionalsService);

  readonly fullName = signal('Sarah Jenkins, Esq.');
  readonly email = signal('sarah.jenkins@familylaw.example.com');
  readonly password = signal('');
  readonly termsAccepted = signal(false);

  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  onFullNameInput(event: Event): void {
    this.fullName.set((event.target as HTMLInputElement).value);
  }

  onEmailInput(event: Event): void {
    this.email.set((event.target as HTMLInputElement).value);
  }

  onPasswordInput(event: Event): void {
    this.password.set((event.target as HTMLInputElement).value);
  }

  onAccept(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    if (!this.fullName().trim()) {
      this.errorMessage.set('Please enter your full name.');
      return;
    }
    if (!this.email().trim()) {
      this.errorMessage.set('Please enter your email address.');
      return;
    }
    if (!this.password().trim()) {
      this.errorMessage.set('Please create a secure password.');
      return;
    }
    if (!this.termsAccepted()) {
      this.errorMessage.set('You must accept the professional terms to proceed.');
      return;
    }

    const token = this.route.snapshot.paramMap.get('token') ?? 'inv_token_david_vance_2026';
    const result = this.professionalsService.acceptInvite(token, {
      name: this.fullName(),
      email: this.email(),
    });

    if (!result.success) {
      this.errorMessage.set(result.error ?? 'Could not accept invitation.');
      return;
    }

    this.successMessage.set('Account activated. Redirecting to your professional workspace...');
    setTimeout(() => {
      void this.router.navigate(['/professionals/portal']);
    }, 1200);
  }
}
