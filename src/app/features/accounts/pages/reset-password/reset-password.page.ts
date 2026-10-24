import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'pp-reset-password',
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
        @if (currentStep() === 1) {
          <form [formGroup]="requestForm" (ngSubmit)="onRequestLink()" class="auth-card" novalidate>
            <span class="step-badge">Step 1 · Ask for a link</span>
            <h1 class="card-title">Forgot your password?</h1>

            @if (linkSent()) {
              <div role="status" class="alert-box success-alert">
                If this email has an account, we sent a link to reset your password.
              </div>
            }

            <div class="form-group">
              <label for="resetEmail" class="form-label">Email</label>
              <input
                id="resetEmail"
                type="email"
                formControlName="email"
                placeholder="name@example.com"
                required
                class="form-input"
              />
            </div>

            <button
              type="submit"
              class="submit-button"
              [disabled]="isSubmitting() || requestForm.invalid"
            >
              {{ isSubmitting() ? 'Sending link...' : 'Send reset link' }}
            </button>

            <a routerLink="/auth/sign-in" class="helper-link">Back to sign in</a>
          </form>
        } @else {
          <form [formGroup]="resetForm" (ngSubmit)="onResetPassword()" class="auth-card" novalidate>
            <span class="step-badge">Step 2 · From the email link (valid 1 hour, one use)</span>
            <h2 class="card-title">Choose a new password</h2>

            @if (errorMessage()) {
              <div role="alert" class="alert-box error-alert">
                {{ errorMessage() }}
              </div>
            }

            <div class="form-group">
              <label for="newPassword" class="form-label">New password</label>
              <input
                id="newPassword"
                type="password"
                formControlName="newPassword"
                minlength="8"
                required
                class="form-input"
              />
              <span class="field-hint">At least 8 characters.</span>
            </div>

            <div class="form-group">
              <label for="confirmPassword" class="form-label">Confirm new password</label>
              <input
                id="confirmPassword"
                type="password"
                formControlName="confirmPassword"
                required
                class="form-input"
              />
            </div>

            <button
              type="submit"
              class="submit-button"
              [disabled]="isSubmitting() || resetForm.invalid"
            >
              {{ isSubmitting() ? 'Updating...' : 'Reset password' }}
            </button>

            <a routerLink="/auth/sign-in" class="helper-link">Back to sign in</a>
          </form>
        }
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
      padding: 56px 16px;
    }
    .auth-card {
      width: 100%;
      max-width: 420px;
      box-sizing: border-box;
      padding: 32px;
      background: #ffffff;
      border: 1px solid var(--pp-color-border, #d9dde1);
      border-radius: var(--pp-radius-lg, 12px);
      display: flex;
      flex-direction: column;
      gap: 18px;
      box-shadow: var(--pp-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));
    }
    .step-badge {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--pp-color-text-secondary, #4e5966);
    }
    .card-title {
      margin: 0;
      font-size: 1.625rem;
      font-weight: 700;
    }
    .alert-box {
      padding: 10px 12px;
      border-radius: 8px;
      font-size: 0.875rem;
    }
    .success-alert {
      background: #e3f0f0;
      color: #0a4a51;
      border: 1px solid #bfe3e3;
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
    .form-input {
      padding: 12px;
      font-size: 1rem;
      border: 1px solid #c7cdd3;
      border-radius: 8px;
      font-family: inherit;
    }
    .field-hint {
      font-size: 0.8125rem;
      color: var(--pp-color-text-secondary, #4e5966);
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
    .helper-link {
      font-size: 0.875rem;
      color: var(--pp-primary-700, #0e5a63);
      text-decoration: underline;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordPage {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  public readonly currentStep = signal<1 | 2>(1);
  public readonly isSubmitting = signal(false);
  public readonly linkSent = signal(false);
  public readonly errorMessage = signal<string | null>(null);

  public readonly requestForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  public readonly resetForm = this.fb.nonNullable.group({
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  });

  public onRequestLink(): void {
    if (this.requestForm.invalid) return;

    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.linkSent.set(true);
    }, 400);
  }

  public onResetPassword(): void {
    if (this.resetForm.invalid) return;

    const { newPassword, confirmPassword } = this.resetForm.getRawValue();
    if (newPassword !== confirmPassword) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      void this.router.navigate(['/auth/sign-in']);
    }, 400);
  }
}
