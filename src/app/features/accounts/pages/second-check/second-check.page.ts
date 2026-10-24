import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'pp-second-check',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-page-container">
      <header class="auth-header">
        <span class="brand-title">ParentPath</span>
        <nav aria-label="Public" class="public-nav">
          <a routerLink="/safety/resources" class="nav-link">Safety resources</a>
          <a routerLink="/support/help" class="nav-link">Help</a>
        </nav>
      </header>

      <main class="auth-main" id="main-content">
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="auth-card" novalidate>
          <div class="header-block">
            <h1 class="card-title">Enter your code</h1>
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

          <fieldset class="channel-fieldset">
            <legend class="fieldset-legend">Send code by</legend>
            <label class="radio-label">
              <input type="radio" value="Email" formControlName="channel" />
              Email
            </label>
            <label class="radio-label">
              <input type="radio" value="Text" formControlName="channel" />
              Text message (only if your mobile number is verified)
            </label>
          </fieldset>

          <div class="form-group">
            <label for="otpCode" class="form-label">One-time code</label>
            <input
              id="otpCode"
              type="text"
              formControlName="code"
              maxlength="6"
              inputmode="numeric"
              autocomplete="one-time-code"
              placeholder="123456"
              class="otp-input"
            />
          </div>

          <button
            type="submit"
            class="submit-button"
            [disabled]="isSubmitting() || form.controls.code.invalid"
          >
            {{ isSubmitting() ? 'Verifying...' : 'Verify' }}
          </button>

          <div class="footer-actions">
            <button type="button" (click)="onResendCode()" class="resend-button">
              Resend code
            </button>
            <a routerLink="/auth/sign-in" class="helper-link">Back to sign in</a>
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
    .public-nav {
      display: flex;
      gap: 20px;
      font-size: 0.875rem;
    }
    .nav-link {
      color: var(--pp-primary-700, #0e5a63);
      text-decoration: none;
      font-weight: 500;
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
    .channel-fieldset {
      margin: 0;
      padding: 0;
      border: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .fieldset-legend {
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .radio-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9375rem;
      cursor: pointer;
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
export class SecondCheckPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  public readonly isSubmitting = signal(false);
  public readonly errorMessage = signal<string | null>(null);

  public readonly form = this.fb.nonNullable.group({
    channel: ['Email'],
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
      this.errorMessage.set(result.error ?? 'ERR-02: That code did not work or has expired.');
      return;
    }

    void this.router.navigate(['/household/overview']);
  }

  public onResendCode(): void {
    const { channel } = this.form.getRawValue();
    this.auth.resendOtp(channel === 'Text' ? 'Text' : 'Email');
    this.errorMessage.set(null);
  }
}
