import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import type { OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { HouseholdService } from '../../../../core/household/household.service';

@Component({
  selector: 'pp-accept-invite',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './accept-invite.page.html',
  styleUrl: './accept-invite.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcceptInvitePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly householdService = inject(HouseholdService);

  public readonly token = signal<string>('');
  public readonly inviterName = signal<string>('Your co-parent');
  public readonly householdName = signal<string>('Household');
  public readonly isValidInvite = signal<boolean>(true);
  public readonly isSubmitting = signal<boolean>(false);
  public readonly errorMessage = signal<string>('');

  // Child matching states
  public readonly hasExistingChildren = signal<boolean>(true);
  public readonly childMatchChoice1 = signal<'same' | 'separate'>('same');
  public readonly childMatchChoice2 = signal<'same' | 'separate'>('separate');

  public readonly acceptForm = new FormGroup({
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    displayName: new FormControl<string>('', {
      validators: [Validators.required, Validators.maxLength(60)],
      nonNullable: true,
    }),
    password: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
  });

  public ngOnInit(): void {
    const tokenParam = this.route.snapshot.queryParamMap.get('token') ?? '';
    this.token.set(tokenParam);
    void this.checkInvite(tokenParam);
  }

  private async checkInvite(token: string): Promise<void> {
    if (!token) {
      // In demo/test mode, show valid mock invite
      this.inviterName.set('Alex Morgan');
      this.householdName.set('Morgan Family');
      this.isValidInvite.set(true);
      return;
    }

    const inviteInfo = await this.householdService.getInviteByToken(token);
    if (!inviteInfo) {
      this.isValidInvite.set(false);
      return;
    }

    this.inviterName.set(inviteInfo.inviterName);
    this.householdName.set(inviteInfo.householdName);
    if (inviteInfo.invite.target_email) {
      this.acceptForm.controls.email.setValue(inviteInfo.invite.target_email);
    }
  }

  public async onSubmit(): Promise<void> {
    if (this.acceptForm.invalid) {
      this.acceptForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    try {
      const email = this.acceptForm.controls.email.value;
      const displayName = this.acceptForm.controls.displayName.value;

      // 1. Sign up user
      const signUpResult = await this.authService.signUp(email, displayName);
      if (!signUpResult.success) {
        this.errorMessage.set(signUpResult.error ?? 'Could not create account.');
        this.isSubmitting.set(false);
        return;
      }

      // 2. Accept invite
      const token = this.token();
      if (token) {
        await this.householdService.acceptInvite(token);
      }

      // 3. Navigate to email verification or second check
      await this.router.navigate(['/accounts/verify-email']);
    } catch {
      this.errorMessage.set('Unexpected error accepting invite. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
