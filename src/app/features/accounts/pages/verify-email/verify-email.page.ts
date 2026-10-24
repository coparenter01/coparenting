import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'pp-verify-email',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-page-container">
      <header class="auth-header">
        <span class="brand-title">ParentPath</span>
        <span class="step-indicator">Step 1 of 2 · Verify email</span>
      </header>

      <main class="auth-main" id="main-content">
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="auth-card" novalidate>
          <div class="header-block">
            <h1 class="card-title">Check your email</h1>
            <p class="card-subtitle">
              We sent a 6-digit code to
              <strong class="user-highlight">{{ maskedDestination() }}</strong
              >. It works once and expires in 10 minutes.
            </p>
          </div>

          @if (errorMessage()) {
            <div role="alert" class="alert-box error-alert">
              {{ errorMessage() }}
            </div>
          }

          <div class="form-group">
            <label for="verificationCode" class="form-label">Verification code</label>
            <input
              id="verificationCode"
              type="text"
              formControlName="code"
              maxlength="6"
              inputmode="numeric"
              autocomplete="one-time-code"
              placeholder="123456"
              class="otp-input"
            />
          </div>

          <button type="submit" class="submit-button" [disabled]="isSubmitting() || form.invalid">
            {{ isSubmitting() ? 'Verifying...' : 'Verify' }}
          </button>

          <div class="footer-actions">
            <button type="button" (click)="onResend()" class="resend-button">Resend code</button>
            <a routerLink="/auth/create-account" class="helper-link">Change email</a>
          </div>
        </form>
      </main>
    </div>
  `,
  styles: `
    .auth-page-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: var(--pp-color-bg, #f5f6f3);
      color: var(--pp-color-text, #17212b);
    }
    .auth-header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 16px 32px;
      background: #ffffff;
      border-bottom: 1px solid var(--pp-color-border, #d9dde1);
    }
    .brand-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--pp-primary-700, #0e5a63);
    }
    .step-indicator {
      font-size: 0.875rem;
      color: var(--pp-color-text-secondary, #4e5966);
    }
    .auth-main {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 64px 16px;
    }
    .auth-card {
      width: 100%;
      max-width: 440px;
      box-sizing: border-box;
      padding: 32px;
      background: #ffffff;
      border: 1px solid var(--pp-color-border, #d9dde1);
      border-radius: var(--pp-radius-lg, 12px);
      display: flex;
      flex-direction: column;
      gap: 20px;
      box-shadow: var(--pp-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));
    }
    .header-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .card-title {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 700;
    }
    .card-subtitle {
      margin: 0;
      font-size: 0.9375rem;
      color: var(--pp-color-text-secondary, #4e5966);
    }
    .user-highlight {
      color: var(--pp-color-text, #17212b);
    }
    .alert-box {
      padding: 10px 12px;
      border-radius: 8px;
      font-size: 0.875rem;
    }
    .error-alert {
      background: #fbede6;
      color: #7a2e0e;
      border: 1px solid #f27a52;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .form-label {
      font-size: 0.875rem;
      font-weight: 600;
    }
    .otp-input {
      padding: 12px;
      font-size: 1.5rem;
      letter-spacing: 0.4em;
      text-align: center;
      border: 1px solid #c7cdd3;
      border-radius: 8px;
      font-family: inherit;
    }
    .submit-button {
      min-height: 44px;
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      background: var(--pp-primary-700, #0e5a63);
      color: #ffffff;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.15s ease;
    }
    .submit-button:hover:not(:disabled) {
      background: var(--pp-primary-800, #09434a);
    }
    .submit-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .footer-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      font-size: 0.875rem;
    }
    .resend-button {
      padding: 0;
      border: none;
      background: none;
      color: var(--pp-primary-700, #0e5a63);
      text-decoration: underline;
      cursor: pointer;
      min-height: 44px;
      font-family: inherit;
      font-size: inherit;
    }
    .helper-link {
      color: var(--pp-color-text-secondary, #4e5966);
      text-decoration: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  public readonly isSubmitting = signal(false);
  public readonly errorMessage = signal<string | null>(null);

  public readonly form = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
  });

  public readonly maskedDestination = signal(this.getMaskedDestination());

  private getMaskedDestination(): string {
    const email = this.auth.pendingEmail();
    if (!email) return 'your registered email';
    const [user = 'u', domain = 'example.com'] = email.split('@');
    return `${user.slice(0, 1)}•••@${domain.slice(0, 1)}••••.com`;
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const { code } = this.form.getRawValue();
    const result = this.auth.verifySecondCheck(code);

    this.isSubmitting.set(false);

    if (!result.success) {
      this.errorMessage.set(result.error ?? 'ERR-02: Code was incorrect or expired.');
      return;
    }

    void this.router.navigate(['/household/choose-mode']);
  }

  public onResend(): void {
    this.auth.resendOtp('Email');
    this.errorMessage.set(null);
  }
}
