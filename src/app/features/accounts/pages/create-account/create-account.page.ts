import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'pp-create-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-page-container">
      <header class="auth-header">
        <a routerLink="/auth/sign-in" class="brand-logo-link" aria-label="ParentPath">
          <img src="/assets/brand/parentpath-logo.svg" alt="ParentPath" height="36" />
        </a>
        <nav aria-label="Public" class="public-nav">
          <a routerLink="/safety/resources" class="nav-link">Safety resources</a>
          <a routerLink="/support/help" class="nav-link">Help</a>
        </nav>
      </header>

      <main class="auth-main" id="main-content">
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="auth-card" novalidate>
          <div class="header-block">
            <h1 class="card-title">Create your account</h1>
            <p class="card-subtitle">
              You can invite your co-parent or use the app on your own after this step.
            </p>
          </div>

          @if (errorMessage()) {
            <div role="alert" class="alert-box error-alert">
              {{ errorMessage() }}
            </div>
          }

          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              placeholder="name@example.com"
              required
              class="form-input"
            />
            @if (form.controls.email.touched && form.controls.email.errors) {
              <span class="field-error">ERR-04: Please enter a valid email address.</span>
            }
          </div>

          <div class="form-group">
            <label for="displayName" class="form-label">Display name</label>
            <input
              id="displayName"
              type="text"
              formControlName="displayName"
              maxlength="60"
              required
              class="form-input"
            />
            <span class="field-hint">1 to 60 characters. Your co-parent sees this name.</span>
            @if (form.controls.displayName.touched && form.controls.displayName.errors) {
              <span class="field-error"
                >ERR-03: Display name must be between 1 and 60 characters.</span
              >
            }
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              type="password"
              formControlName="password"
              minlength="8"
              required
              class="form-input"
            />
            <span class="field-hint">At least 8 characters.</span>
            @if (form.controls.password.touched && form.controls.password.errors) {
              <span class="field-error">ERR-10: Password must be at least 8 characters long.</span>
            }
          </div>

          <button type="submit" class="submit-button" [disabled]="isSubmitting() || form.invalid">
            {{ isSubmitting() ? 'Creating account...' : 'Create account' }}
          </button>

          <p class="footer-text">
            Already have an account?
            <a routerLink="/auth/sign-in" class="footer-link">Sign in</a>
          </p>
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
      line-height: 1.25;
    }
    .card-subtitle {
      margin: 0;
      font-size: 0.9375rem;
      color: var(--pp-color-text-secondary, #4e5966);
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
    .field-error {
      font-size: 0.8125rem;
      color: #a82a08;
      font-weight: 500;
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
    .footer-text {
      margin: 0;
      font-size: 0.875rem;
      text-align: center;
      color: var(--pp-color-text-secondary, #4e5966);
    }
    .footer-link {
      color: var(--pp-primary-700, #0e5a63);
      font-weight: 600;
      text-decoration: underline;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  public readonly isSubmitting = signal(false);
  public readonly errorMessage = signal<string | null>(null);

  public readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    displayName: ['', [Validators.required, Validators.maxLength(60)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  public async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const { email, displayName } = this.form.getRawValue();
    const result = await this.auth.signUp(email, displayName);

    this.isSubmitting.set(false);

    if (!result.success) {
      this.errorMessage.set(result.error ?? 'ERR-01: An error occurred creating your account.');
      return;
    }

    void this.router.navigate(['/auth/verify-email']);
  }
}
