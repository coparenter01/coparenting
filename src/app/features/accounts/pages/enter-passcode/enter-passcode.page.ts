import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'pp-enter-passcode',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="passcode-page-container">
      <main class="passcode-main" id="main-content">
        <form [formGroup]="form" (ngSubmit)="onUnlock()" class="passcode-card" novalidate>
          <div class="icon-wrap" aria-hidden="true">
            <svg height="44" viewBox="0 0 44 44" width="44">
              <rect
                fill="none"
                height="19"
                rx="4"
                stroke="currentColor"
                stroke-width="2.2"
                width="26"
                x="9"
                y="19"
              ></rect>
              <path
                d="M15 19v-5a7 7 0 0 1 14 0v5"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
              ></path>
            </svg>
          </div>

          <h1 class="card-title">Enter your passcode</h1>
          <p class="card-subtitle">
            Your app is locked. Nothing is shown until you enter your 6-digit passcode.
          </p>

          @if (errorMessage()) {
            <div role="alert" class="alert-box error-alert">
              {{ errorMessage() }}
            </div>
          }

          <div class="form-group">
            <label for="passcodeInput" class="form-label visually-hidden">Passcode</label>
            <input
              id="passcodeInput"
              type="password"
              formControlName="passcode"
              maxlength="6"
              inputmode="numeric"
              autocomplete="current-password"
              placeholder="••••••"
              class="passcode-input"
            />
          </div>

          <button type="submit" class="submit-button" [disabled]="form.invalid">Unlock</button>

          <a routerLink="/auth/sign-in" (click)="onSignOut()" class="sign-out-link">
            Sign out and sign in again
          </a>
        </form>
      </main>
    </div>
  `,
  styles: `
    .passcode-page-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 120px 16px;
      box-sizing: border-box;
      background: var(--pp-color-bg, #f5f6f3);
      color: var(--pp-color-text, #17212b);
    }
    .passcode-main {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .passcode-card {
      width: 100%;
      max-width: 380px;
      box-sizing: border-box;
      padding: 32px;
      background: #ffffff;
      border: 1px solid var(--pp-color-border, #d9dde1);
      border-radius: var(--pp-radius-lg, 12px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
      text-align: center;
      box-shadow: var(--pp-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));
    }
    .icon-wrap {
      color: var(--pp-primary-700, #0e5a63);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card-title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
    }
    .card-subtitle {
      margin: 0;
      font-size: 0.9375rem;
      color: var(--pp-color-text-secondary, #4e5966);
    }
    .alert-box {
      width: 100%;
      box-sizing: border-box;
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
      width: 100%;
    }
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    .passcode-input {
      width: 100%;
      box-sizing: border-box;
      padding: 12px;
      font-size: 1.625rem;
      letter-spacing: 0.5em;
      text-align: center;
      border: 1px solid #c7cdd3;
      border-radius: 8px;
      font-family: inherit;
    }
    .submit-button {
      width: 100%;
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
    .sign-out-link {
      font-size: 0.875rem;
      color: var(--pp-primary-700, #0e5a63);
      text-decoration: underline;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnterPasscodePage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  public readonly errorMessage = signal<string | null>(null);

  public readonly form = this.fb.nonNullable.group({
    passcode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
  });

  public onUnlock(): void {
    if (this.form.invalid) return;

    const { passcode } = this.form.getRawValue();
    const result = this.auth.unlockWithPasscode(passcode);

    if (!result.success) {
      this.errorMessage.set(result.error ?? 'Incorrect passcode.');
      if (result.error?.includes('ERR-12')) {
        void this.router.navigate(['/auth/sign-in']);
      }
      return;
    }

    void this.router.navigate(['/home']);
  }

  public onSignOut(): void {
    this.auth.signOut();
  }
}
