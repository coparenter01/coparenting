import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'pp-sign-in',
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
          <h1 class="card-title">Sign in</h1>

          @if (auth.isLockedOut()) {
            <div role="alert" class="alert-box error-alert">
              ERR-11: Too many tries. Your account is locked for 15 minutes. Try again later.
            </div>
          } @else if (errorMessage()) {
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
          </div>

          <div class="form-group">
            <div class="label-with-link">
              <label for="password" class="form-label">Password</label>
              <a routerLink="/auth/reset-password" class="helper-link">Forgot password?</a>
            </div>
            <input
              id="password"
              type="password"
              formControlName="password"
              required
              class="form-input"
            />
          </div>

          <button
            type="submit"
            class="submit-button"
            [disabled]="isSubmitting() || form.invalid || auth.isLockedOut()"
          >
            {{ isSubmitting() ? 'Signing in...' : 'Sign in' }}
          </button>

          <div class="footer-block">
            <span
              >New to ParentPath?
              <a routerLink="/auth/create-account" class="footer-link">Create account</a></span
            >
            <span
              >Can’t get into your account?
              <a routerLink="/support/help" class="footer-link">Ask support for help</a></span
            >
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
    .card-title {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 700;
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
    .label-with-link {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .form-label {
      font-size: 0.875rem;
      font-weight: 600;
    }
    .helper-link {
      font-size: 0.875rem;
      color: var(--pp-primary-700, #0e5a63);
      text-decoration: none;
    }
    .form-input {
      padding: 12px;
      font-size: 1rem;
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
    .footer-block {
      display: flex;
      flex-direction: column;
      gap: 8px;
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
export class SignInPage {
  private readonly fb = inject(FormBuilder);
  public readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  public readonly isSubmitting = signal(false);
  public readonly errorMessage = signal<string | null>(null);

  public readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  public onSubmit(): void {
    if (this.form.invalid || this.auth.isLockedOut()) return;

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const { email, password } = this.form.getRawValue();
    const result = this.auth.signInFirstStep(email, password);

    this.isSubmitting.set(false);

    if (!result.success) {
      this.errorMessage.set(result.error ?? 'Invalid email or password.');
      return;
    }

    // Advance to 6-digit second check
    void this.router.navigate(['/auth/second-check']);
  }
}
